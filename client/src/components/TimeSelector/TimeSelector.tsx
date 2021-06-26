import React, { useState } from "react";
import styled from "styled-components";
import { CalendarEvent } from "../../types/common/dateTime.types";

import SelectedTimeSlots from "./SelectedTimeSlots";
import TimeSlotsSelector from "./TimeSlotsSelector";

const Container = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
    height: 80vh;
    overflow-y: scroll;
`;

type TimeSelectorProps = {
    dayIdx: number;
    events: CalendarEvent[],
    x?: number;
};

function TimeSelector({ dayIdx, events, x }: TimeSelectorProps) {
    return (
        <Container>
            <TimeSlotsSelector dayIdx={dayIdx} events={events} x={x} />
            <SelectedTimeSlots dayIdx={dayIdx} events={events} />
        </Container>
    );
}

export default TimeSelector;
