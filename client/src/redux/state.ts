import { getCurrentMonth, getCurrentYear, getInitialDays } from "../utils/dateTime";

export const initialState = {
    year: getCurrentYear(),
    monthIndex: getCurrentMonth(),
    days: getInitialDays(),
};
