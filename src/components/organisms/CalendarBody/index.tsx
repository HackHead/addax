import { Container } from "../../styled";
import DaysCaption from "../DaysCaption";
import CalendarCell from "../CalendarCell";
import { CalendarView, CalendarEvent } from "../Calendar";
import moment, { Moment } from "moment";
import CalendarTask from "../CalendarTask";
import { SortableContext, verticalListSortingStrategy, rectSortingStrategy, rectSwappingStrategy } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

interface CalendarBodyProps {
    view: CalendarView;
    currentDateTime: Moment;
    events: CalendarEvent[];
    activeId: UniqueIdentifier | null;
    days: Moment[]
}

const CalendarBody = ({
    currentDateTime,
    events,
    activeId,
    days
}: CalendarBodyProps) => {
    return (
        <Container px="2rem" pb={'2rem'}>
            <DaysCaption />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                    {days.map((day, i) => (
                        <SortableContext items={events.filter((e) => e.date.isSame(day, 'day'))} id={`${i}`} strategy={rectSwappingStrategy}>
                        <CalendarCell
                            key={day.format('YYYY-MM-DD')}
                            id={i}
                            day={day.get('D')}
                            isBlind={day.isBefore(currentDateTime.startOf('month')) ||
                                day.isAfter(currentDateTime.endOf('month'))}
                            isToday={day.isSame(moment(), 'day')}
                        >
                            {
                                events.length && events.filter((event) => {
                                    return day.isSame(event.date, 'day')
                                }).map((item) => (
                                    activeId !== item.id && <CalendarTask key={item.id} id={item.id} data={events.find(event => event.id === item.id) || null} />
                                ))
                            }
                        </CalendarCell>
                    </SortableContext>
                    ))}
                </div>
        </Container>
    );
};

export default CalendarBody;
