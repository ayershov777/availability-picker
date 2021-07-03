import { useSelector } from "react-redux";
import styled from "styled-components";

import { WEEKDAYS } from "../../utils/dateTime";

import SchedulerCell from "./SchedulerCell";
import MonthPicker from "./MonthPicker";
import TimeSelector from "../TimeSelector/TimeSelector";
import { getDates, getSelectedDate } from "../../redux/selectors";
import useViewport, { Viewport } from "../../hooks/useViewport";

const MobileContainer = styled.div`
    padding: 0px calc(100vw/7);
`;

const DesktopContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
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
    const viewport = useViewport();

    const Container = viewport >= Viewport.SM ? DesktopContainer : MobileContainer;

    return (
        <Container>
            <div>
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
            </div>

            <TimeSelector />
        </Container>
    );
}

export default Scheduler;
