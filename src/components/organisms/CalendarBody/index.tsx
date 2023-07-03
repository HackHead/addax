import { Container } from "../../styled";
import { CalendarView, CalendarEvent } from "../Calendar";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

import DaysCaption from "../DaysCaption";
import CalendarCell from "../CalendarCell";
import moment, { Moment } from "moment";
import CalendarTask from "../CalendarTask";

interface CalendarBodyProps {
    view: CalendarView;
    currentDateTime: Moment;
    events: CalendarEvent[];
    activeId: UniqueIdentifier | null;
    days: Moment[];
    onShowCreationModal: (day: Moment) => void
}

const CalendarBody = ({
    currentDateTime,
    events,
    activeId,
    days,
    onShowCreationModal,
}: CalendarBodyProps) => {
    return (
        <Container px="2rem" pb={'2rem'} >
            <DaysCaption />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                    {days.map((day, i) => (
                        <SortableContext 
                            items={events.filter((e) => e.date.isSame(day, 'day'))} 
                            id={`${i}`} 
                            strategy={verticalListSortingStrategy}
                        >
                        <CalendarCell
                            key={day.format('YYYY-MM-DD')}
                            id={i}
                            day={day}
                            isBlind={day.isBefore(currentDateTime.startOf('month')) ||
                                day.isAfter(currentDateTime.endOf('month'))}
                            isToday={day.isSame(moment(), 'day')}
                            onAddEvent={(day: Moment) => {onShowCreationModal(day)}}
                        >
                            {
                                events.length ? events.filter((event) => day.isSame(event.date, 'day') ).map((item) => (
                                    activeId !== item.id ? <CalendarTask 
                                                                key={item.id} 
                                                                id={item.id} 
                                                                data={events.find(event => event.id === item.id) || null} 
                                                            /> : <></>
                                )) : <></>
                            }
                        </CalendarCell>
                    </SortableContext>
                    ))}
                </div>
        </Container>
    );
};

export default CalendarBody;
