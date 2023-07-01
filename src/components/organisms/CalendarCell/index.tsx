import { Absolute, Card, FlexBox, Typography, Wrapper } from "../../styled"
import { ReactNode } from "react";

export interface CalendarCellProps {
    day: number;
    isBlind?: boolean;
    isToday?: boolean;
    children?: ReactNode;
}

const CalendarCell = ({
    day,
    isBlind = false,
    isToday = false,
    children,
}: CalendarCellProps) => {
    return (
        <Wrapper
            borderstyle="solid"
            borderwidth="1px"
            bordercolor="secondary"
            h="8rem"
            alpha={0.07}
            bg={isToday ? 'success' : 'transparent'}
        >
            <Absolute right="0.4rem" top="0.4rem">
                <Typography alpha={isBlind ? 0.2 : 1} size="md" weight={'regular'}>{day}</Typography>
            </Absolute>
           {children}
        </Wrapper>
    )
}

export default CalendarCell;
