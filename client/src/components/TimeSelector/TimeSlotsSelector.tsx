import { useState } from "react";
import { useSelector } from "react-redux";
import styled, { CSSProperties } from "styled-components";
import { getSelectedAvailabilities } from "../../redux/selectors";
import { CalendarAvailability } from "../../types/common/dateTime.types";
import { getInitialTimes, MILLIS_PER_FIFTEEN_MINUTES, MINUTES_PER_DAY } from "../../utils/dateTime";

const slotHeight = 18; // pixels
const slotInterval = 15; // minutes
const numSlots = MINUTES_PER_DAY / slotInterval;
const containerHeight = numSlots * slotInterval;

const Container = styled.div`
    max-height: ${containerHeight}px;
    height: ${containerHeight}px;
    margin: 0 4px;
    display: grid;
    grid-template-columns: 96px auto;
`;

const Slot = styled.div`
    height: ${slotHeight}px;
`;

const Slots = styled.div`
    ${Slot}:nth-child(4n-3),
    ${Slot}:nth-child(4n-2) {
        background-color: lightblue;
    }
    border-right: 1px solid darkgray;
    border-left: 1px solid darkgray;
`;

const TimeDisplay = styled.div`
    height: ${slotHeight}px;
    text-align: center; 
`;

const TimeDisplayContainer = styled.div`
    border-left: 1px solid darkgray;
`;

const Availability = styled.div<CSSProperties>`
    position: absolute;
    top: ${({ top }) => top}px;
    left: 100px;
    width: calc(50vw - 100px);
    height: ${({ height }) => height}px;
    background-color: blue;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
    margin-left: -2px;
    margin-right: -2px;
`;

type TimeSlotsSelectorProps = {
    selectedDate: Date;
};

export default function TimeSlotsSelector({ selectedDate }: TimeSlotsSelectorProps) {
    const [slots, setSlots] = useState(getInitialTimes(selectedDate));
    const availabilities = useSelector(getSelectedAvailabilities);

    // useEffect(() => {
    //     window.addEventListener("mouseMove", onMouseMove);
    //     window.addEventListener("touchMove", onMouseUp);
    //     window.addEventListener("mouseUp", onMouseUp);
    //     window.addEventListener("touchEnd", onTouchEnd);
    //     window.addEventListener("touchCancel", onTouchCancel);
    //     return () => {
    //         window.removeEventListener("mouseMove", onMouseMove);
    //         window.removeEventListener("touchMove", onMouseUp);
    //         window.removeEventListener("mouseUp", onMouseUp);
    //         window.removeEventListener("touchEnd", onTouchEnd);
    //         window.removeEventListener("touchCancel", onTouchCancel);
    //     }
    // }, []);

    function onMouseDown() {

    }

    function onTouchStart() {

    }

    function getTimeIndex(time: Date) {
        const dayStart = slots[0].dateTime.getTime();
        const delta = time.getTime() - dayStart;
        return delta/MILLIS_PER_FIFTEEN_MINUTES;
    }

    function getTop(availability: CalendarAvailability) {
        const start = getTimeIndex(availability.startTime);
        return start * slotHeight;
    }
    
    function getHeight(availability: CalendarAvailability) {
        const start = getTimeIndex(availability.startTime);
        const end = getTimeIndex(availability.endTime);
        const length = end - start;
    
        return length * slotHeight;
    }

    return (
        <Container>
            <TimeDisplayContainer>
                {slots.map((slot, idx) => (
                    <TimeDisplay key={`slot-${idx}`}>
                        {idx%4 ? undefined : slot.timeDisplay}
                    </TimeDisplay>
                ))}
            </TimeDisplayContainer>
            
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
                <Slots>
                    {slots.map((slot, idx) => (
                        <Slot
                            key={`slot-${idx}`}
                            data-idx={idx}
                        />
                    ))}
                </Slots>
                {availabilities.map((availability, idx) => (
                    <Availability
                        key={`availability-${idx}`}
                        top={getTop(availability)}
                        height={getHeight(availability)}
                    />
                ))}
            </div>
        </Container>
    );
}