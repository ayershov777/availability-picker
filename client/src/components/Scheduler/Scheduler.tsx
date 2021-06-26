import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { WEEKDAYS } from "../../utils/dateTime";

import SchedulerCell from "./SchedulerCell";
import MonthPicker from "./MonthPicker";
import RootState from "../../types/redux/state.types";
import TimeSelectorModal from '../TimeSelector/TimeSelectorModal';

const Container = styled.div`
    padding: 0px calc(100vw/7);
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const Cell = styled.div`
    border: 1px solid black;
    margin: 2px;
    padding: 4px;
    height: calc(100vw/10);
`;

const WeekdayLabel = styled.div`
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
`;

function Scheduler() {
    const days = useSelector(({ schedulerReducer }: RootState) => schedulerReducer.days);

    return (
        <Container>
            <MonthPicker />
            <Grid>
                {WEEKDAYS.map((weekday, idx) => (
                    <WeekdayLabel key={`weekday-label-${idx}`}>
                        {weekday}
                    </WeekdayLabel>
                ))}
                {days.map((day, idx) => (
                    <div>
                        <SchedulerCell
                            key={`scheduler-item-${idx}`}
                            day={day}
                            idx={idx}
                        />
                        {day.selected && <TimeSelectorModal day={day} dayIdx={idx} />}
                    </div>
                ))}
            </Grid>
        </Container>
    );
}

export default Scheduler;
