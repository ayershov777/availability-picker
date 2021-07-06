import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import useViewport, { Viewport } from '../../hooks/useViewport';
import { getSelectedDate } from "../../redux/selectors";

import SelectedTimeSlots from "./SelectedTimeSlots";
import TimeSlotsSelector from "./TimeSlotsSelector";

const slideDown = keyframes`
    from {
        top: -200px;
    }

    to {
        top: 0;
    }
`;

type ContainerProps = {
    viewport: Viewport;
};

const Container = styled.div<ContainerProps>`
    flex: 1;
    min-width: 276px;
    margin: 1rem 0 0 0;
    color: steelblue;
    text-align: center;
    font-family: monospace;
    font-size: 1.1rem;
    vertical-align: top;
    min-height: 300px;
    animation: ${slideDown} 0.4s ease-out;
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
