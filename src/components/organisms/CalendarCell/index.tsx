import { useDroppable } from "@dnd-kit/core";
import { Absolute, Typography, GridItem} from "../../styled"
import { ReactNode } from "react";
import { Moment } from "moment";
import { useState } from "react";

export interface CalendarCellProps {
    day: Moment;
    isBlind?: boolean;
    isToday?: boolean;
    children?: ReactNode;
    onAddEvent: (day: Moment) => void
    id: number;
}

const CalendarCell = ({
    day,
    isBlind = false,
    isToday = false,
    children,
    id,
    onAddEvent
}: CalendarCellProps) => {
    const [isActive, setActive] = useState<boolean>(false);
    const {setNodeRef} = useDroppable({
        id,
    })

    return (
        <GridItem
            ref={setNodeRef}
            borderstyle="solid"
            borderwidth="1px"
            bordercolor="secondary"
            h="9rem"
            alpha={0.07}
            bg={isToday ? 'success' : 'transparent'}
            style={{paddingTop: '1.4rem'}}
            onClick={() => onAddEvent(day)}
        >
            <Absolute right="0.4rem" top="0.4rem">
                <Typography 
                    alpha={isBlind ? 0.2 : 1} 
                    size="md" 
                    weight={'regular'}
                >{day.get('D')}</Typography>
            </Absolute>
            <Absolute 
                left="0.4rem" 
                top="0.4rem" 
                style={{transition: "all .2s linear", cursor: 'pointer'}}
            >
            </Absolute>
           {children}
           
        </GridItem>
    )
}

export default CalendarCell;
