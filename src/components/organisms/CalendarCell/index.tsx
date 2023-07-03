import { useDroppable } from "@dnd-kit/core";
import { Absolute, Wrapper, Typography } from "../../styled"
import { ReactNode } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

export interface CalendarCellProps {
    day: number;
    isBlind?: boolean;
    isToday?: boolean;
    children?: ReactNode;
    id: number;
}

const CalendarCell = ({
    day,
    isBlind = false,
    isToday = false,
    children,
    id,
}: CalendarCellProps) => {
    const {setNodeRef} = useDroppable({
        id,
    })

    return (
        <Wrapper
            ref={setNodeRef}
            borderstyle="solid"
            borderwidth="1px"
            bordercolor="secondary"
            h="9rem"
            alpha={0.07}
            bg={isToday ? 'success' : 'transparent'}
            style={{paddingTop: '1.4rem'}}
        >
            <Absolute right="0.4rem" top="0.4rem">
                <Typography alpha={isBlind ? 0.2 : 1} size="md" weight={'regular'}>{day}</Typography>
            </Absolute>
            <Absolute left="0.4rem" top="0.4rem" style={{transition: "all .2s linear", cursor: 'pointer'}}>
                <Typography>
                    <PlusIcon style={{width: '16px', height: "16px"}}/>
                </Typography>
            </Absolute>
           {children}
        </Wrapper>
    )
}

export default CalendarCell;
