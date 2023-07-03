import { CalendarEvent } from "../components/organisms/Calendar";
import {v4 as uuidv4} from "uuid";
import moment from "moment";

export const seedEvents: CalendarEvent[] = [
    {
        id: uuidv4(),
        isDraggable: true,
        isFilterable: true,
        date: moment('2023-07-06'),
        task: { title: 'Wake up', description: '' },
        labels: [{ id: uuidv4(), color: 'primary', text: '' }, { id: uuidv4(), color: 'info', text: '' }],
    },
    {
        id: uuidv4(),
        isDraggable: true,
        isFilterable: true,
        date: moment('2023-07-06'),
        task: { title: 'Have breakfast', description: '' },
        labels: [],
    },
    {
        id: uuidv4(),
        isDraggable: true,
        isFilterable: true,
        date: moment('2023-07-12'),
        task: { title: 'Conquer the world', description: '' },
        labels: [],
    },
    {
        id: uuidv4(),
        isDraggable: true,
        isFilterable: true,
        date: moment('2023-07-15'),
        task: { title: 'Feed cat', description: '' },
        labels: [],
    },
    {
        id: uuidv4(),
        isDraggable: true,
        isFilterable: true,
        date: moment('2023-07-16'),
        task: { title: 'Complete a work assignment', description: '' },
        labels: [],
    },
    {
        id: uuidv4(),
        isDraggable: true,
        isFilterable: true,
        date: moment('2023-07-18'),
        task: { title: 'Try a new recipe', description: '' },
        labels: [],
    },
];
