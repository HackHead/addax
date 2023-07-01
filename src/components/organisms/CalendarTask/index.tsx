import { ReactNode } from "react"
import { Absolute, Card, FlexBox, Typography } from "../../styled"

export interface CalendarTaskProps {
    children?: ReactNode;
}

const CalendarTask = ({children}: CalendarTaskProps) => {
    return (
        <Absolute right="0" top="2rem" w="100%" px={'0.1rem'}>
            <Card bg="gray" px="1rem" py="0.5rem">
                <FlexBox justifycontent="flex-start" alignitems="center">
                    <Typography size="sm" elipsis={+true}>{children}</Typography>
                </FlexBox>
            </Card>
        </Absolute>
    )
}

export default CalendarTask