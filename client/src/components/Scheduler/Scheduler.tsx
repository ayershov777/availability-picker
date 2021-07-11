import styled from "styled-components";

import DatePicker from "./DatePicker/DatePicker";
import TimePicker from "./TimePicker/TimePicker";
import useViewport, { Viewport } from "../../hooks/useViewport";

const Grid = styled.div`
    display: grid;
    padding: 0 8px;
`;

const MobileContainer = styled(Grid)`
    grid-template-columns: 1fr;
`;

const DesktopContainer = styled(Grid)`
    grid-template-columns: 1fr 1fr 1fr;
`;

const LargeContainer = styled(Grid)`
    grid-template-columns: 300px auto 400px;
`;

function Scheduler() {
    const viewport = useViewport();

    const Container = getContainer(viewport);

    return (
        <Container>
            <DatePicker />
            <TimePicker />
            <div>test</div>
        </Container>
    );
}

function getContainer(viewport: Viewport) {
    switch(viewport) {
        case Viewport.XS:
        case Viewport.SM:
        case Viewport.MD:
            return MobileContainer;
        case Viewport.LG:
            return LargeContainer;
        case Viewport.XL:
            return DesktopContainer;
        default: return MobileContainer;
    }
}

export default Scheduler;
