import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import useViewport, { Viewport } from '../../hooks/useViewport';
import { getSelectedDate } from "../../redux/selectors";
import { SCROLLBAR_WIDTH } from "../../utils/common";

import SelectedTimeSlots from "./SelectedTimeSlots";
import TimeSlotsSelector from "./TimeSlotsSelector";

const slidedown = keyframes`
    from {
      top: -200px;
    }
  
    to {
      top: 0;
    }
  `;
const Container = styled.div<{viewport: Viewport}>`
    position: relative;
    margin: 2rem 0 0 0;
    right: -${SCROLLBAR_WIDTH}px;
    color: steelblue;
    text-align: center;
    font-family: monospace;
    font-size: 1.1rem;
    display: inline-block;
    width: ${ ({viewport}) => viewport > Viewport.SM ? 'calc(100vw - ((100vw / 30 + 10px) * 7 ) )': viewport === Viewport.SM ? '50vw' : '100%'} };;
    vertical-align: top;
    min-height: 300px;
    animation: ${slidedown} 0.4s ease-out;
    `;

function TimeSelector() {
    const selectedDate = useSelector(getSelectedDate);
    const viewport = useViewport();
    // const margin = viewport > Viewport.SM ? "0 0 0 1rem" : "2rem 0 0 0";

    if (selectedDate === undefined) {
        return <></>;
    }

    return (
        <Container viewport={viewport}>
            <TimeSlotsSelector selectedDate={selectedDate}/>
            <SelectedTimeSlots selectedDate={selectedDate}/>
        </Container>
    );
}

export default TimeSelector;
