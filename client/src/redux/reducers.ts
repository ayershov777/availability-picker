import { combineReducers } from "redux";

import SchedulerActions, { SetDayEventsPayload } from "../types/redux/actions/schedulerActions.types";
import { CalendarDay, MonthId, MonthIndex } from "../types/common/dateTime.types";
import { getCurrentMonth, getCurrentYear, getDays, getInitialDays } from "../utils/dateTime";
import { SchedulerReducer } from "../types/redux/state.types";

const d = getInitialDays();
d[0].events.push({ startTime: new Date("May 30, 2021 02:00:00"), endTime: new Date("May 30, 2021 03:00:00") });

export const initialState: SchedulerReducer = {
    year: getCurrentYear(),
    monthIndex: getCurrentMonth(),
    days: d,
    selectedDay: undefined,
};

export function schedulerReducer(state = initialState, { type, payload }: SchedulerActions) {
    switch(type) {
        case "ADVANCE_MONTH": {
            const { monthIndex, year } = payload as MonthId;
            const isDecember = monthIndex === 11;
            const nextMonthIndex = (isDecember ? 0 : (monthIndex + 1)) as MonthIndex;
            const nextYear = isDecember ? (year + 1) : year;
            return {
                ...state,
                monthIndex: nextMonthIndex,
                year: nextYear,
                days: getDays(nextMonthIndex, nextYear),
            };
        }
        case "REVERSE_MONTH": {
            const { monthIndex, year } = payload as MonthId;
            const isJanuary = monthIndex === 0;
            const prevMonthIndex = (isJanuary ? 11 : (monthIndex - 1)) as MonthIndex;
            const prevYear = isJanuary ? (year - 1) : year;
            return {
                ...state,
                monthIndex: prevMonthIndex,
                year: prevYear,
                days: getDays(prevMonthIndex, prevYear),
            };
        }
        case "TOGGLE_DAY": {
            const day = payload as CalendarDay;
            const selectedDay = state.selectedDay === day ? undefined : day;

            return { ...state, selectedDay };
        }
        case "SET_DAY_EVENTS": {
            const { dayIdx, events } = payload as SetDayEventsPayload;
            const day = state.days[dayIdx];
            day.events = events;
            
            return {
                ...state,
                days: [...state.days],
            };
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    schedulerReducer,
});
