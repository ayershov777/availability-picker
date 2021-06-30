import { combineReducers } from "redux";

import SchedulerActions, { SetDayEventsPayload } from "../types/redux/actions/schedulerActions.types";
import { MonthId, MonthIndex } from "../types/common/dateTime.types";
import { getCurrentMonth, getCurrentYear, getInitialDates, getMonthlyDates } from "../utils/dateTime";
import { SchedulerReducer } from "../types/redux/state.types";

const initialAvailabilities = {
    "2021-05-30T07:00:00.000Z": [
        { startTime: new Date("May 30, 2021 02:00:00"), endTime: new Date("May 30, 2021 03:00:00") },
    ],
};

export const initialState: SchedulerReducer = {
    year: getCurrentYear(),
    monthIndex: getCurrentMonth(),
    dates: getInitialDates(),
    availabilities: initialAvailabilities,
};

export function schedulerReducer(state = initialState, { type, payload }: SchedulerActions): SchedulerReducer {
    switch(type) {
        case "ADVANCE_MONTH": {
            const { monthIndex, year } = payload as MonthId;
            const isDecember = monthIndex === 11;
            const nextMonthIndex = (isDecember ? 0 : (monthIndex + 1)) as MonthIndex;
            const nextYear = isDecember ? (year + 1) : year;

            return {
                ...state,
                year: nextYear,
                monthIndex: nextMonthIndex,
                dates: getMonthlyDates(nextMonthIndex, nextYear),
            };
        }
        case "REVERSE_MONTH": {
            const { monthIndex, year } = payload as MonthId;
            const isJanuary = monthIndex === 0;
            const prevMonthIndex = (isJanuary ? 11 : (monthIndex - 1)) as MonthIndex;
            const prevYear = isJanuary ? (year - 1) : year;
            return {
                ...state,
                year: prevYear,
                monthIndex: prevMonthIndex,
                dates: getMonthlyDates(prevMonthIndex, prevYear),
            };
        }
        case "SET_SELECTED_DATE": {
            const selectedDate = payload as Date | undefined;
            return { ...state, selectedDate };
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    schedulerReducer,
});
