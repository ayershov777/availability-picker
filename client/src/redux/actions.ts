import { MonthId } from "../types/common/dateTime.types";
import { AdvanceMonthAction, ReverseMonthAction, SetSelectedDateAction } from "../types/redux/actions/schedulerActions.types";

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

export function setSelectedDateAction (date: Date | undefined): SetSelectedDateAction {
    return {
        type: "SET_SELECTED_DATE",
        payload: date,
    };
}
