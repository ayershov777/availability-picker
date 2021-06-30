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

const WeekdayLabel = styled.div`
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
`;

function Scheduler() {
    const days = useSelector(({ schedulerReducer }: RootState) => schedulerReducer.days);
    const selectedDay = useSelector(({ schedulerReducer }: RootState) => schedulerReducer.selectedDay)

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
                    <SchedulerCell
                        key={`scheduler-item-${idx}`}
                        day={day}
                    />
                ))}
            </Grid>

            {selectedDay && <TimeSelectorModal day={selectedDay} />}
        </Container>
    );
}

export default Scheduler;
