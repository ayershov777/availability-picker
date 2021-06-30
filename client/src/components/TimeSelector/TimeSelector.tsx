import styled from "styled-components";
import { SCROLLBAR_WIDTH } from "../../utils/common";

import SelectedTimeSlots from "./SelectedTimeSlots";
import TimeSlotsSelector from "./TimeSlotsSelector";

const Container = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -${SCROLLBAR_WIDTH}px;
    height: 80vh;
    overflow-y: scroll;
`;

function TimeSelector() {
    return (
        <Container>
            <TimeSlotsSelector />
            <SelectedTimeSlots />
        </Container>
    );
}

export default TimeSelector;
