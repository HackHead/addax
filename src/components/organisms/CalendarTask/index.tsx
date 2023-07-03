import { 
  Card, 
  FlexBox, 
  Typography, 
  Wrapper, 
  Absolute, 
  TextField
} from "../../styled";
import { ReactNode } from "react";
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
  const { labels, isDraggable, isHoliday, task } = data || {};
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

  const labelsLength = labels?.length ?? 0;

  return (
    <Wrapper mt="0.4rem"
      style={isDraggable ? style : {}}
      ref={isDraggable ? setNodeRef : null}
    >
      {Array.isArray(labels) && labelsLength > 0 && labels?.map(({ color, id }, i) => {
        return (
          <Absolute key={id} top="0" left={`${i * (100 / labelsLength)}%`} style={{ zIndex: 9999 }} w={'100%'}>
            <Wrapper h="0.2rem" w={`${100 / labelsLength}%`} bg={color}></Wrapper>
          </Absolute>
        );
      })}
      {/* <Card
        py="0.5rem"
        px="1rem"
        bg={isHoliday ? 'danger' : 'gray'}
        {...(isDraggable ? attributes : {})}
        {...(isDraggable ? listeners : {})}
      >
        <FlexBox justifycontent="flex-start" alignitems="center">
          <Typography size="sm" elipsis={+true}>{task?.title}</Typography>
        </FlexBox>
      </Card> */}
      <Card>
        <TextField value="23409802934" onChange={() => {}}/>
      </Card>
    </Wrapper>
  );
};

export default CalendarTask;
