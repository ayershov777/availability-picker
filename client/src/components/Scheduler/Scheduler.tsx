import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

import { WEEKDAYS } from "../../utils/dateTime";

import SchedulerCell from "./SchedulerCell";
import MonthPicker from "./MonthPicker";
import TimeSelector from "../TimeSelector/TimeSelector";
import { getDates, getSelectedDate } from "../../redux/selectors";
import useViewport, { Viewport } from "../../hooks/useViewport";
import { useEffect, useState } from 'react';

// const MobileContainer = styled.div`
//     padding: 0px calc(100vw/7);
// `;

// const DesktopContainer = styled.div`
//     // display: grid;
//     // grid-template-columns: auto 1fr;
// `;

const DatePickerPanelDesktop = styled.div`
    position: sticky;
    top: 0px;
    display: inline-block;
    vertical-align: top;
}
`;
const DatePickerPanelMobile = styled.div`
    display: block;
    padding: 0px calc(100vw/7);
    // position: fixed;
    // top: 0px;
`;
const slidedown = keyframes`
  from {
    height: 0;
  }

  to {
    height: 3.5rem;
  }
`;
const DatePickerBar = styled.div`
    display: block;
    // padding: 0px calc(100vw/7);
    position: fixed;
    top: 0px;
    height: 3.5rem;
    width: 100%;
    border-bottom: 1px solid rgba(105, 105, 105, 0.5);
    margin-bottom: 1rem;
    z-index: 10;
    background-color: #e4e4e4;
    box-shadow: 10px 5px 5px grey;
    text-align: center;
    color: #457ba9;
    font-weight: 600;
    font-size: 1.1rem;
    font-family: monospace;
    animation: ${slidedown} 0.3s ease-out;

    & sub {
        cursor: pointer;
    }
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
    const selectedDate = useSelector(getSelectedDate);
    const viewport = useViewport();
    const DatePickerPanel = viewport >= Viewport.SM ? DatePickerPanelDesktop : DatePickerPanelMobile;
    const [showDateBar, setShowDateBar] = useState(false);

    useEffect(() => {
        const el = document.querySelector(".datepicker-dots");
        const observer = new IntersectionObserver( 
            ([e]) => {
                console.log(e.intersectionRatio);
                e.intersectionRatio < 0.001 ? setShowDateBar(true) : setShowDateBar(false); }
        );

        el && observer.observe(el);
        return () => {
            el && observer.unobserve(el);
        }
    }, [])

    return (
        <div>
            <DatePickerPanel className="datepicker-dots">
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
            </DatePickerPanel>
            {showDateBar && 
                <DatePickerBar className="datepicker-bar" onClick={()=>window.scroll({
                    top: 0, behavior: 'smooth'
                  })}>
                    <p>
                        {selectedDate?.toDateString()}
                        {" "}
                        <sub className="material-icons">expand_more</sub>
                    </p>
                </DatePickerBar> }

            <TimeSelector />
        </div>
    );
}

export default Scheduler;
