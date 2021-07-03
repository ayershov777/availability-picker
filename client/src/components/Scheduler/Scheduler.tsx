import { useSelector } from "react-redux";
import styled from "styled-components";

import { WEEKDAYS } from "../../utils/dateTime";

import SchedulerCell from "./SchedulerCell";
import MonthPicker from "./MonthPicker";
import TimeSelectorModal from "../TimeSelector/TimeSelectorModal";
import { getDates } from "../../redux/selectors";

const Container = styled.div`
    padding: 0px calc(100vw/7);
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 16px;
`;

const WeekdayLabel = styled.div`
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
`;

function Scheduler() {
    const dates = useSelector(getDates);

    return (
        <Container>
            <MonthPicker />
            
            <Grid>
                {WEEKDAYS.map((weekday, idx) => (
                    <WeekdayLabel key={`weekday-label-${idx}`}>
                        {weekday}
                    </WeekdayLabel>
                ))}
                {dates.map((date, idx) => (
                    <SchedulerCell
                        key={`scheduler-item-${idx}`}
                        date={date}
                    />
                ))}
            </Grid>

            <TimeSelectorModal />
        </Container>
    );
}

export default Scheduler;
