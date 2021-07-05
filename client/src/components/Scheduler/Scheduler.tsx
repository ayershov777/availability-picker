import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

import { WEEKDAYS } from "../../utils/dateTime";

import SchedulerCell from "./SchedulerCell";
import MonthPicker from "./MonthPicker";
import TimeSelector from "../TimeSelector/TimeSelector";
import { getDates, getMonthIndex, getSelectedDate } from "../../redux/selectors";
import useViewport, { Viewport } from "../../hooks/useViewport";
import { useEffect, useRef, useState } from 'react';

const Container = styled.div<{viewport: Viewport}>`
    display: flex;
    flex-flow: ${({viewport})=>viewport <= Viewport.SM ? 'wrap' : 'nowrap'}
`;
const DatePickerPanelDesktop = styled.div`
    position: sticky;
    top: 0px;
    display: inline-block;
    vertical-align: top;
}
`;
const DatePickerPanelMobile = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
`;
const InnerContainer = styled.div`
    position: sticky;
    top: 0;
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
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    top: 0px;
    height: 3.5rem;
    width: 100%;
    border-bottom: 1px solid rgba(105, 105, 105, 0.5);
    margin-bottom: 1rem;
    z-index: 10;
    background-color: white;
    box-shadow: 1px 5px 5px grey;
    text-align: center;
    color: #1a73e8;
    font-weight: 600;
    font-size: 1.1rem;
    font-family: monospace;
    transition: filter 250ms;
    animation: ${slidedown} 0.3s ease-out;

    &:hover {
        filter: brightness(0.7);
    }
    & sub {
        cursor: pointer;
    }
`;

const slideFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(20%);
  }
  to {
    transform: translateX(0%);
  }
`;
const slideFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(-20%);
  }
  to {
    transform: translateX(0%);
  }
`;
const Grid = styled.div<{leftOrRight: number}>`
    display: grid;
    position: relative;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 16px;
    animation: ${({leftOrRight})=>leftOrRight>0 ? slideFromRight : leftOrRight<0 ? slideFromLeft : 'none'} 400ms ease-out;
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
        const el = document.querySelector(".sentinel");

        const observer = new IntersectionObserver( 
            ([e]) => {
                console.log(e.intersectionRatio);
                if (viewport>Viewport.SM) {
                    setShowDateBar(false);
                    return;
                }
                e.intersectionRatio < 0.001 ? setShowDateBar(true) : setShowDateBar(false);
            });

        el && observer.observe(el);
        return () => {
            el && observer.unobserve(el);
        }
    }, [viewport])
    
    const show = useRef(true);
    const monthIndex = useSelector(getMonthIndex);
    const prevMonthIndex = useRef(monthIndex);

    useEffect(() => {
        show.current = !show.current;
        prevMonthIndex.current = monthIndex;
    })
    const datePickerPanel = <>
            <Grid leftOrRight={monthIndex - prevMonthIndex.current}>
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
        </>

    return (
        <Container viewport={viewport}>
            <DatePickerPanel>
                <InnerContainer>
                    <MonthPicker />
                    {show.current && datePickerPanel}
                    {!show.current && datePickerPanel}
                    <div className="sentinel"></div>
                </InnerContainer>
            </DatePickerPanel>

            { showDateBar && 
                <DatePickerBar className="datepicker-bar" onClick={()=>window.scroll({
                    top: 0, behavior: 'smooth'
                  })}>
                    <p>
                        {selectedDate?.toDateString()}
                        {" "}
                        <sub className="material-icons">expand_more</sub>
                    </p>
                </DatePickerBar> 
            }

            <TimeSelector />
        </Container>
    );
}

export default Scheduler;
