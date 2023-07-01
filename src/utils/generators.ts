import moment from "moment";

export const getMonthDays = (year: number = moment().year(), month: number = moment().month()) => {
    const startDate = moment({ year, month: month }).startOf('month').startOf('week');
    const endDate = moment({ year, month: month }).endOf('month').endOf('week');

    const result = [];
    const day = startDate.clone();

    while(!day.isAfter(endDate)){
        result.push(day.clone());
        day.add(1, 'day');
    }
    
    return result;
}