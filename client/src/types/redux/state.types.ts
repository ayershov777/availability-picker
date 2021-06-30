import { MonthIndex, CalendarDay } from "../common/dateTime.types";

export type SchedulerReducer = {
    monthIndex: MonthIndex;
    year: number;
    days: CalendarDay[];
    selectedDay?: CalendarDay;
};

type RootState = {
    schedulerReducer: SchedulerReducer;
};

export default RootState;
