import { useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { CalendarDay, CalendarEvent } from "../../types/common/dateTime.types";
import { getInitialTimes, MILLIS_PER_FIFTEEN_MINUTES, MINUTES_PER_DAY } from "../../utils/dateTime";

const slotHeight = 18; // pixels
const slotInterval = 15; // minutes
const numSlots = MINUTES_PER_DAY / slotInterval;
const containerHeight = numSlots * slotInterval;

type TimeSlotsSelectorProps = {
  day: CalendarDay;
  events: CalendarEvent[];
};

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

export default function TimeSlotsSelector({ day }: TimeSlotsSelectorProps) {
    const [slots, setSlots] = useState(getInitialTimes(day.date));
    
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

    function getTop(event: CalendarEvent) {
        const start = getTimeIndex(event.startTime);
        return start * slotHeight;
    }
    
    function getHeight(event: CalendarEvent) {
        const start = getTimeIndex(event.startTime);
        const end = getTimeIndex(event.endTime);
        const length = end - start;
    
        return length * slotHeight;
    }

    return (
        <Container>
            <div style={{ borderLeft: '1px solid darkgray' }}>
                {slots.map((slot, idx) => (
                    <div key={`slot-${idx}`} style={{ height: '18px', textAlign: 'center' }}>
                        {idx%4 ? undefined : slot.timeDisplay}
                    </div>
                ))}
            </div>
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
                <Slots>
                    {slots.map((slot, idx) => (
                        <Slot
                            data-idx={idx}
                        />
                    ))}
                </Slots>
                {day.events.map((event) => (
                    <Availability top={getTop(event)} height={getHeight(event)} />
                ))}
            </div>
        </Container>
    );
}