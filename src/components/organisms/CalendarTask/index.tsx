import { ReactNode } from "react"
import { Card, FlexBox, Typography, Wrapper,Absolute } from "../../styled"
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities'
import { UniqueIdentifier } from "@dnd-kit/core";
import { CalendarEvent } from "../Calendar";

export interface CalendarTaskProps {
    children?: ReactNode;
    id: UniqueIdentifier;
    data: CalendarEvent | null;
}   

const CalendarTask = ({ id, data }: CalendarTaskProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id})    
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'pointer',
        zIndex: 999,
        overflow: 'auto',
    }
    
    return (
        <Wrapper mt="0.4rem" 
            
            style={data?.isDraggable ? style : {}} 
            ref={data?.isDraggable ? setNodeRef : null}>
            <Card bg={data?.isDraggable ? 'gray' : 'danger'} px="1rem" py="0.5rem" {...(data?.isDraggable ? attributes : {})} 
            {...(data?.isDraggable ? listeners : {})} >
                <FlexBox justifycontent="flex-start" alignitems="center">
                    <Typography size="sm" elipsis={+true}>{data?.task?.title}</Typography>
                </FlexBox>
            </Card>
        </Wrapper>
    )
}

export default CalendarTask