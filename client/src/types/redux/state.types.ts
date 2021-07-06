import { CalendarAvailability, MonthIndex } from "../common/dateTime.types";

export type SchedulerReducer = {
    monthIndex: MonthIndex;
    year: number;
    dates: Date[];
    selectedDate: Date;
    availabilities: Record<string, CalendarAvailability[]>;
};

type RootState = {
    schedulerReducer: SchedulerReducer;
};

export default RootState;
