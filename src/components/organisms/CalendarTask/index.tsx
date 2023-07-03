import { ReactNode } from "react";
import { Card, FlexBox, Typography, Wrapper, Absolute } from "../../styled";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
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
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: 999,
    cursor: 'pointer',
  };

  const labelsLength = data?.labels?.length;

  return (
    <Wrapper mt="0.4rem"
      style={data?.isDraggable ? style : {}}
      ref={data?.isDraggable ? setNodeRef : null}
    >
      {labelsLength ? data?.labels?.map(({ color, id }, i) => {
        return (
          <Absolute key={id} top="0" left={`${i * (100 / labelsLength)}%`} style={{ zIndex: 9999 }} w={'100%'}>
            <Wrapper h="0.2rem" w={`${100 / labelsLength}%`} bg={color}></Wrapper>
          </Absolute>
        );
      }) : <></>}
      <Card
        py="0.5rem"
        px="1rem"
        bg={data?.isHoliday ? 'danger' : 'gray'}
        {...(data?.isDraggable ? attributes : {})}
        {...(data?.isDraggable ? listeners : {})}
      >
        <FlexBox justifycontent="flex-start" alignitems="center">
          <Typography size="sm" elipsis={+true}>{data?.task?.title}</Typography>
        </FlexBox>
      </Card>
      
    </Wrapper>
  );
};

export default CalendarTask;
