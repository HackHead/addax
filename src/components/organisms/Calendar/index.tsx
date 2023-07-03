import { useEffect, useState } from "react";
import { Button, Typography, FlexBox, Card, Container, Delimiter, Wrapper, Spinner } from "../../styled";
import CalendarBody from "../CalendarBody";
import CalendarToolbar from "../CalendarToolbar";
import moment, { Moment } from "moment";
import { NAGER_API } from "../../../http";
import { AdjustmentsVerticalIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, PlusIcon, } from "@heroicons/react/20/solid";
import { exportSchema, importSchema } from "../../../utils/dataHandlers";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier, closestCenter, closestCorners, pointerWithin } from '@dnd-kit/core';
import ModalWindow from "../Modals/CreateEvent";
import CalendarTask from "../CalendarTask";
import { arrayMove } from "@dnd-kit/sortable";
import { getMonthDays } from "../../../utils/generators";
import { v4 as uuidv4 } from 'uuid';
import isUUID from "../../../utils/validators";

export type CalendarView = 'day' | 'week' | 'month';
export interface Holiday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: null | string[];
    launchDate: null | string;
    types: string[];
}
export interface HolidaysObject {
    [key: string]: Holiday;
}

export interface EventLabel {
    color: string;
    text: string;
}

export interface CalendarEvent {
    id: UniqueIdentifier;
    isFilterable: boolean;
    isDraggable: boolean;
    date: Moment;
    labels?: EventLabel[];
    task: {
        title: string;
        description?: string;
    },
    isHoliday?: boolean;
}

export interface CalendarEvents {
    [key: string]: CalendarEvent[]
}

const Calendar = () => {
    const temp2 = [
        { id: uuidv4(), isDraggable: true, isFilterable: true, date: moment('2023-07-06'), task: { title: 'Wake up', description: '' }, labels: [] },
        { id: uuidv4(), isDraggable: true, isFilterable: true, date: moment('2023-07-06'), task: { title: 'Have breakfast', description: '' }, labels: [] },
        { id: uuidv4(), isDraggable: true, isFilterable: true, date: moment('2023-07-06'), task: { title: 'Conquer the world', description: '' }, labels: [] },
        { id: uuidv4(), isDraggable: true, isFilterable: true, date: moment('2023-07-07'), task: { title: 'Learn react2', description: '' }, labels: [] },
        { id: uuidv4(), isDraggable: true, isFilterable: true, date: moment('2023-07-28'), task: { title: 'Learn react5', description: '' }, labels: [] },
        { id: uuidv4(), isDraggable: true, isFilterable: true, date: moment('2023-07-28'), task: { title: 'Learn react6', description: '' }, labels: [] },
    ];

    const [view, setView] = useState<CalendarView>('month')
    const [currentDateTime, setCurrentDatetime] = useState<Moment>(moment());
    const [events, setEvents] = useState<CalendarEvent[]>(temp2);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVisibleModal, setIsOpenModal] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    
    const monthDays = getMonthDays(
        currentDateTime.year(),
        currentDateTime.month()
    );
    const [days, setDays] = useState<Moment[]>(monthDays);

    useEffect(() => {
        setDays(monthDays);
    }, [currentDateTime]);
    
    const handleViewChange = (newView: CalendarView) => {
        setView(newView);
    }

    const increaseDateTime = () => {
        switch (view) {
            case 'day':
                setCurrentDatetime(currentDateTime.clone().add(1, 'day'));
                return;
            case 'week':
                setCurrentDatetime(currentDateTime.clone().add(1, 'week'));
                return;
            case 'month':
                setCurrentDatetime(currentDateTime.clone().add(1, 'month'));
        }
    }

    const reduceDateTime = () => {
        switch (view) {
            case 'day':
                setCurrentDatetime(currentDateTime.clone().subtract(1, 'day'));
                return;
            case 'week':
                setCurrentDatetime(currentDateTime.clone().subtract(1, 'week'));
                return;
            case 'month':
                setCurrentDatetime(currentDateTime.clone().subtract(1, 'month'));
                return;
        }
    }

    const setDefaultDateTime = () => {
        setCurrentDatetime(moment())
    }


    const importEvents = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            const importedEvents: Array<CalendarEvent> = await importSchema(e) || [];
            const update = importedEvents.map((e) => {
                e.date = moment(e.date);
                return e
            })
            if (update) {
                setEvents(update);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const exportEvents = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        exportSchema(e, events)
    }
    const handleDragStart = (e: DragStartEvent) => {
        const { active } = e;
        const { id } = active;

        setActiveId(id);
    }
    const handleOpenModal = () => {
        setIsOpenModal(true)
    }
    const handleCloseModal = () => {
        setIsOpenModal(false)
    }
    const fetchHolidays = async () => {
        try {
            setIsLoading(true)
            const res = await NAGER_API.get<Holiday[]>(`/PublicHolidays/${currentDateTime.year()}/ua`);

            const datesInArray = res.data;

            // Converting array of holidays into array of CalendarEvent and unshift them
            // into events state array

            const holidaysToEvents: CalendarEvent[] = datesInArray.reduce((acc: CalendarEvent[], { name, date }: Holiday) => {
                acc.push({
                    id: uuidv4(),
                    isDraggable: false,
                    isFilterable: false,
                    isHoliday: true,
                    date: moment(date),
                    task: {
                        title: name,
                        description: '',
                    },
                    labels: [],
                })
                return acc;
            }, []);

            // Prevent holidays from duplicating
            const eventsCopy = [...holidaysToEvents, ...events.filter((e) => !e.isHoliday)];
            setEvents(eventsCopy)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over?.id || !active?.id) {
          return;
        }
      
        
        if (typeof over.id === 'string' && isUUID(over.id)) {
            const oldIndex = events.findIndex((e) => e.id === active.id);
          const newIndex = events.findIndex((e) => e.id === over.id);
          if (oldIndex !== newIndex) {
            setEvents(arrayMove(events, oldIndex, newIndex));
          }

        } else if (typeof over.id === 'number') {
            const oldIndex = events.findIndex((e) => e.id === active.id);
            const newDate = days[over.id];
            const eventsCopy = [...events];
            
            eventsCopy[oldIndex] = { ...eventsCopy[oldIndex], date: newDate };
            setEvents(eventsCopy);
        }
      
        setActiveId(null);
      };

    // Call fetchHolidays only when the year is being changed, to reduce number 
    // of requests to the API
    useEffect(() => {
        if (false) { fetchHolidays(); }
    }, [currentDateTime.year()]);

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCenter}>
            <DragOverlay>{activeId ? <CalendarTask id={activeId} data={events.find((event) => event.id === activeId) || null} /> : null}</DragOverlay>
            <ModalWindow isOpen={isVisibleModal} onClose={handleCloseModal} />
            <Container size={'xl'} my={'4rem'} mx={'auto'}>
                {/* ========== DATA MANAGMENT ========== */}
                <FlexBox justifycontent="flex-start" alignitems="center">
                    <Wrapper mb="1rem">
                        <Button bg="info" px="1rem" onClick={exportEvents} >
                            <FlexBox>
                                <Wrapper mx="1rem">
                                    <Typography >Export</Typography>
                                </Wrapper>
                                <ArrowDownTrayIcon style={{ width: '16px', height: '16px' }} />
                            </FlexBox>
                        </Button>
                    </Wrapper>
                    <Wrapper mb="1rem" mx="1rem" >
                        <Button px="1rem" bg="danger" onClick={importEvents}>
                            <FlexBox>
                                <Wrapper mx="1rem"><Typography >Import</Typography></Wrapper>
                                <ArrowUpTrayIcon style={{ width: '16px', height: '16px' }} />
                            </FlexBox>
                        </Button>
                    </Wrapper>
                </FlexBox>
                {/* ========== DATA MANAGMENT ENDS ========== */}

                <Card>
                    {/* ========== HEADER ========== */}
                    <FlexBox px={'2rem'} py={'1.3rem'}>
                        <Typography>Calendar</Typography>
                        <Button bg="primary" px="1rem" onClick={handleOpenModal}>
                            <FlexBox justifycontent="space-between">
                                <AdjustmentsVerticalIcon style={{ width: '16px', height: '16px', paddingRight: '1rem' }} />
                                <Wrapper >
                                    <Typography >Filters</Typography>
                                </Wrapper>
                            </FlexBox>
                        </Button>
                    </FlexBox>
                    <Delimiter />
                    {/* ========== HEADER ENDS ========== */}

                    {/* ========== TOOLBAR ========== */}
                    <CalendarToolbar
                        view={view}
                        onViewUpdate={handleViewChange}
                        currentDateTime={currentDateTime}
                        onIncreaseDateTime={increaseDateTime}
                        onReduceDateTime={reduceDateTime}
                        setDefault={setDefaultDateTime}
                    />
                    {/* ========== TOOLBAR ENDS ========== */}

                    {/* ========== PRELOADER ========== */}
                    {isLoading ?
                        <Wrapper w="100%" h="25rem">
                            <FlexBox justifycontent="center" alignitems="center" h="100%">
                                <Spinner />
                            </FlexBox>
                        </Wrapper>
                        :
                        <CalendarBody
                            view={view}
                            currentDateTime={currentDateTime}
                            events={events}
                            activeId={activeId}
                            days={days}
                        />
                    }
                    {/* ========== PRELOADER ENDS ========== */}
                </Card>
            </Container>
        </DndContext>
    );
}

export default Calendar;