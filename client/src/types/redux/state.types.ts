import { MonthIndex, CalendarDay } from "../common/dateTime.types";

type RootState = {
    schedulerReducer: {
        monthIndex: MonthIndex;
        year: number;
        days: CalendarDay[]
    }
};

export default RootState;
