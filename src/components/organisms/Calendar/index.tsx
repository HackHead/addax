import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button, Typography, FlexBox, Card, Container, Delimiter } from "../../styled";
import CalendarBody from "../CalendarBody";
import CalendarToolbar from "../CalendarToolbar";
import moment, { Moment } from "moment";
import { NAGER_API } from "../../../http";

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
    id: string;
    label?: EventLabel[];
    task: {
        title: string;
        description?: string;
    }
}

export interface CalendarEvents {
    [key: string]: CalendarEvent[]
}

const Calendar = () => {
    const temp = {
        "2023-01-04": [
            {id: uuidv4(), task: { title: 'Test 1', description: '' }}
        ],
        "2023-08-07": [
            {id: uuidv4(), task: {  title: 'Test 2',  description: ''  }},
            {id: uuidv4(), task: {  title: 'Test 3',  description: ''  }},
            {id: uuidv4(), task: {  title: 'Test 4',  description: ''  }}
        ]
    }
    const [view, setView] = useState<CalendarView>('month')
    const [currentDateTime, setCurrentDatetime] = useState<Moment>(moment());
    const [holidays, setHolidays] = useState<HolidaysObject>({});
    const [events, setEvents] = useState<CalendarEvents>(temp);
    
    const handleViewChange = (newView: CalendarView) => {
        setView(newView);
    }
    
    const increaseDateTime = () => {
        switch(view){
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
        switch(view){
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

    const fetchHolidays = async () => {
        try {
            const res = await NAGER_API.get<Holiday[]>(`/PublicHolidays/${currentDateTime.year()}/ua`);

            const datesInArray = res.data;
            
            // Converting array of object into an object, to reduce the use of resources
            // so instead of using Array.find() every time we render calendar cell we could 
            // get the object by the key
            const datesInObject: HolidaysObject = datesInArray.reduce((acc: HolidaysObject, holiday: Holiday) => {
                acc[holiday.date] = holiday;
                return acc;
            }, {});
            

            setHolidays(datesInObject)
        } catch (error) {
            console.log(error);
        }
    }

    // Call fetchHolidays only when the year is being changed, to reduce number 
    // of requests to the API
    useEffect(() => {
        // fetchHolidays()
    }, [currentDateTime.year()])
    return (
        <Container size={'xl'} my={'4rem'} mx={'auto'}>
        <Card>
            <FlexBox px={'2rem'} py={'1.3rem'}>
                <Typography>Calendar</Typography>
                <Button>
                    <Typography>Add event</Typography>
                </Button>
            </FlexBox>
            <Delimiter />
            <CalendarToolbar 
                view={view} 
                onViewUpdate={handleViewChange} 
                currentDateTime={currentDateTime}
                onIncreaseDateTime={increaseDateTime}
                onReduceDateTime={reduceDateTime}
                setDefault={setDefaultDateTime}
            />
            <CalendarBody 
                view={view} 
                currentDateTime={currentDateTime}
                holidays={holidays}
                events={events}
            />
        </Card>
    </Container>
    );
}

export default Calendar;