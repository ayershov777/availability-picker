import styled from "styled-components";

import DatePicker from "./DatePicker/DatePicker";
import TimePicker from "./TimePicker/TimePicker";
import useViewport, { Viewport } from "../../hooks/useViewport";

const Container = styled.div<{viewport: Viewport}>`
    display: flex;
    flex-flow: ${({viewport}) => viewport <= Viewport.SM ? 'wrap' : 'nowrap'};
`;

function Scheduler() {
    const viewport = useViewport();

    return (
        <Container viewport={viewport}>
            <DatePicker />
            <TimePicker />
        </Container>
    );
}

export default Scheduler;
