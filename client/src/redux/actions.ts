import { CalendarDay, MonthId } from "../types/common/dateTime.types";
import {
    AdvanceMonthAction,
    ReverseMonthAction,
    SetDayEventsAction,
    SetDayEventsPayload,
    ToggleDayAction
} from "../types/redux/actions/schedulerActions.types";

export function advanceMonthAction (monthId: MonthId): AdvanceMonthAction {
    return {
        type: "ADVANCE_MONTH",
        payload: monthId,
    };
}

export function reverseMonthAction (monthId: MonthId): ReverseMonthAction {
    return {
        type: "REVERSE_MONTH",
        payload: monthId,
    };
}

export function toggleDayAction (day: CalendarDay): ToggleDayAction {
    return {
        type: "TOGGLE_DAY",
        payload: day,
    };
}

export function setDayEventsAction (payload: SetDayEventsPayload): SetDayEventsAction {
    return {
        type: "SET_DAY_EVENTS",
        payload: payload,
    };
}
