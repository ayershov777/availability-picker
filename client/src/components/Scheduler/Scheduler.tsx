import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

import SchedulerGrid, { GridAnimationVariant } from "./SchedulerGrid";
import MonthPicker from "./MonthPicker";
import TimeSelector from "../TimeSelector/TimeSelector";
import { getSelectedDate } from "../../redux/selectors";
import useViewport, { Viewport } from "../../hooks/useViewport";
import { useState } from 'react';

const Container = styled.div<{viewport: Viewport}>`
    display: flex;
    flex-flow: ${({viewport})=>viewport <= Viewport.SM ? 'wrap' : 'nowrap'};
`;

const DatePickerPanelDesktop = styled.div`
    position: sticky;
    top: 0px;
    display: inline-block;
    vertical-align: top;
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

const slideDown = keyframes`
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
    animation: ${slideDown} 0.3s ease-out;

    &:hover {
        filter: brightness(0.7);
    }
    
    & sub {
        cursor: pointer;
    }
`;

function Scheduler() {
    const viewport = useViewport();
    const DatePickerPanel = viewport >= Viewport.SM ? DatePickerPanelDesktop : DatePickerPanelMobile;
    const [gridAnimation, setGridAnimation] = useState<GridAnimationVariant>("idle");
    
    // const selectedDate = useSelector(getSelectedDate);
    // const [showDateBar, setShowDateBar] = useState(false);

    return (
        <Container viewport={viewport}>
            <DatePickerPanel>
                <MonthPicker setGridAnimation={setGridAnimation} />
                <SchedulerGrid gridAnimation={gridAnimation} setGridAnimation={setGridAnimation} />
            </DatePickerPanel>

            {/* {showDateBar && 
                <DatePickerBar>
                    <p>
                        {selectedDate?.toDateString()}
                        {" "}
                        <sub className="material-icons">expand_more</sub>
                    </p>
                </DatePickerBar> 
            } */}

            <TimeSelector />
        </Container>
    );
}

export default Scheduler;
