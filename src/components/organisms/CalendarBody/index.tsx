import { getMonthDays } from "../../../utils/generators";
import { Container, Wrapper } from "../../styled";
import DaysCaption from "../DaysCaption";
import CalendarCell from "../CalendarCell";
import { HolidaysObject, CalendarView, Holiday, CalendarEvents } from "../Calendar";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import CalendarTask from "../CalendarTask";

interface CalendarBodyProps {
    view: CalendarView;
    currentDateTime: Moment;
    holidays: HolidaysObject;
    events: CalendarEvents;
}

const CalendarBody = ({
    view,
    currentDateTime,
    holidays,
    events,
}: CalendarBodyProps) => {
    // Getting array of days for current month
    const monthDays = getMonthDays(
        currentDateTime.year(),
        currentDateTime.month()
    );
    const [days, setDays] = useState(monthDays);

    useEffect(() => {
        setDays(monthDays);
    }, [currentDateTime]);

    return (
        <Container px="2rem" pb={'2rem'}>
            <DaysCaption />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {days.map((day) => (
                    <Wrapper key={day.format('YYYY-MM-DD')}>
                        <CalendarCell
                            day={day.get('D')}
                            isBlind={
                                day.isBefore(currentDateTime.startOf('month')) ||
                                day.isAfter(currentDateTime.endOf('month'))
                            }
                            isToday={day.isSame(moment(), 'day')}
                        >
                            {holidays[day.format('YYYY-MM-DD')] && (
                                <CalendarTask>
                                    {holidays[day.format('YYYY-MM-DD')].name}
                                </CalendarTask>
                            )}
                            {events[day.format('YYYY-MM-DD')] && (
                                <>
                                    {events[day.format('YYYY-MM-DD')].map((item, n) => (
                                        <CalendarTask key={n}>
                                            {item.task.title}
                                        </CalendarTask>
                                    ))}
                                </>
                            )}
                        </CalendarCell>
                    </Wrapper>
                ))}
            </div>
        </Container>
    );
};

export default CalendarBody;
