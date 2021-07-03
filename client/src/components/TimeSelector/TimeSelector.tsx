import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedDate } from "../../redux/selectors";
import { SCROLLBAR_WIDTH } from "../../utils/common";

import SelectedTimeSlots from "./SelectedTimeSlots";
import TimeSlotsSelector from "./TimeSlotsSelector";

const Container = styled.div`
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: -${SCROLLBAR_WIDTH}px;
`;

function TimeSelector() {
    const selectedDate = useSelector(getSelectedDate);

    if (selectedDate === undefined) {
        return <></>;
    }

    return (
        <Container>
            <TimeSlotsSelector selectedDate={selectedDate}/>
            <SelectedTimeSlots selectedDate={selectedDate}/>
        </Container>
    );
}

export default TimeSelector;
