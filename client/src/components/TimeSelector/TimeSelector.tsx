import styled from "styled-components";
import { CalendarDay, CalendarEvent } from "../../types/common/dateTime.types";
import { SCROLLBAR_WIDTH } from "../../utils/common";

import SelectedTimeSlots from "./SelectedTimeSlots";
import TimeSlotsSelector from "./TimeSlotsSelector";

const Container = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -${SCROLLBAR_WIDTH}px; /* Increase/Decrease this value for cross-browser compatibility */
    height: 80vh;
    overflow-y: scroll;
`;

type TimeSelectorProps = {
    day: CalendarDay;
    events: CalendarEvent[],
};

function TimeSelector({ day, events }: TimeSelectorProps) {
    return (
        <Container>
            <TimeSlotsSelector day={day} events={events} />
            <SelectedTimeSlots day={day} events={events} />
        </Container>
    );
}

export default TimeSelector;
