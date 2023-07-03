import { useEffect, useState, useRef } from "react";
import { Button, Typography, FlexBox, Card, Container, Delimiter, Wrapper, Spinner, type ColorVariant, TextField } from "../../styled";
import CalendarBody from "../CalendarBody";
import CalendarToolbar from "../CalendarToolbar";
import moment, { Moment } from "moment";
import { NAGER_API } from "../../../http";
import { ArrowDownTrayIcon, ArrowUpTrayIcon, CameraIcon, } from "@heroicons/react/20/solid";
import { exportSchema, importSchema } from "../../../utils/dataHandlers";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier, closestCenter } from '@dnd-kit/core';
import ModalWindow from "../Modals/CreateEvent";
import CalendarTask from "../CalendarTask";
import { arrayMove } from "@dnd-kit/sortable";
import { getMonthDays } from "../../../utils/generators";
import { v4 as uuidv4 } from 'uuid';
import isUUID from "../../../utils/validators";
import { seedEvents } from "../../../data/seed";
import { takeScreenshot } from "../../../utils/takeScreenshot";
import { theme } from "../../styled";

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
    color: ColorVariant;
    id: string;
    text: string;
}

export interface CalendarEvent {
    id: UniqueIdentifier;
    isFilterable: boolean;
    isDraggable: boolean;
    date: Moment;
    labels: EventLabel[];
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
    const exportRef = useRef<HTMLDivElement>(null);
    const [labels, setLabels] = useState<EventLabel[]>([
        { id: uuidv4(), color: 'primary', text: 'New'},
        { id: uuidv4(), color: 'danger', text: 'In Progress'},
        { id: uuidv4(), color: 'info', text: 'Fixed'},
        { id: uuidv4(), color: 'success', text: 'Closed'},
        { id: uuidv4(), color: 'warning', text: 'Archive'},
    ]);
    const [view, setView] = useState<CalendarView>('month')
    const [currentDateTime, setCurrentDatetime] = useState<Moment>(moment());
    const [events, setEvents] = useState<CalendarEvent[]>(seedEvents);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVisibleModal, setIsOpenModal] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [textFilter, setTextFilter] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

    const regex = new RegExp(textFilter, 'ig');

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
    }

    const exportEvents = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        exportSchema(e, events)
    }

    const handleDragStart = (e: DragStartEvent) => {
        const { active } = e;
        const { id } = active;

        setActiveId(id);
    }
    const handleCloseModal = () => {
        setIsOpenModal(false);
        setSelectedDate(null)
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
    const getFilteredEvents = () => {
        return events.filter(event => {
            if (event.isHoliday) {
                return true;
            } else {
                return event.task.title.match(regex);
            }
        });
    };
    const createEvent = (name: string, lbls: string[]) => {
        if (selectedDate) {
            const eventLabels = lbls.map((lbl: string) => {
                return labels.find((label) => label.id === lbl);
            }) as EventLabel[];

            setEvents([
                ...events,
                {
                    id: uuidv4(),
                    isDraggable: true,
                    isFilterable: true,
                    date: selectedDate,
                    task: { title: name, description: '' },
                    labels: eventLabels,
                },
            ]);
        }
        handleCloseModal();
    };
    const handleScreen = () => {
        exportRef.current && (exportRef.current.style.background = theme.colors.bodyBg)
        exportRef.current && takeScreenshot(exportRef.current, "screenshot")
    }
    // Call fetchHolidays only when the year is being changed, to reduce number 
    // of requests to the API
    useEffect(() => {
        fetchHolidays();
    }, [currentDateTime.year()]);
    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCenter}>
            <DragOverlay>
                {activeId ?
                    <CalendarTask
                        id={activeId}
                        data={events.find((event) => event.id === activeId) || null}
                    />
                    : <></>}
            </DragOverlay>
            <ModalWindow
                isOpen={isVisibleModal}
                onClose={handleCloseModal}
                date={selectedDate}
                onCreate={(name, lbls) => createEvent(name, lbls)}
                labels={labels}
            />
            <Container size={'xl'} my={'4rem'} mx={'auto'}>
                {/* ========== DATA MANAGMENT ========== */}
                <FlexBox justifycontent="space-between" alignitems="center">
                    <FlexBox justifycontent="flex-start">
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
                    <Wrapper mb="1rem" mx="1rem" >
                            <Button px="1rem" bg="warning" onClick={handleScreen}>
                                <FlexBox>
                                    <Wrapper mx="1rem"><Typography color="black" >Screenshot</Typography></Wrapper>
                                    <CameraIcon style={{ width: '16px', height: '16px', color: 'black' }} />
                                </FlexBox>
                            </Button>
                        </Wrapper>
                </FlexBox>
                {/* ========== DATA MANAGMENT ENDS ========== */}

                <Card>
                    {/* ========== HEADER ========== */}
                    <FlexBox px={'2rem'} py={'1.3rem'} >
                        <Typography>Calendar</Typography>
                        <Wrapper>
                            <TextField
                                placeholder="Type something..."
                                value={textFilter}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTextFilter(e.target.value) }}
                            />
                        </Wrapper>

                    </FlexBox>
                    <Delimiter />
                    {/* ========== HEADER ENDS ========== */}
                    <div ref={exportRef} >
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
                                events={getFilteredEvents()}
                                activeId={activeId}
                                days={days}
                                onShowCreationModal={(day) => { setIsOpenModal(true); setSelectedDate(day) }}
                            />
                        }
                    </div>
                    {/* ========== PRELOADER ENDS ========== */}
                </Card>
            </Container>
        </DndContext>
    );
}

export default Calendar;