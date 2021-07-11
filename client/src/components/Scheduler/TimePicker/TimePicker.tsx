import { useSelector } from "react-redux";
import styled, { CSSProperties } from "styled-components";
import { getSelectedAvailabilities, getSelectedDate } from "../../../redux/selectors";
import { CalendarAvailability } from "../../../types/common/dateTime.types";
import { SCROLLBAR_WIDTH } from "../../../utils/common";
import { getInitialTimes, MILLIS_PER_FIFTEEN_MINUTES } from "../../../utils/dateTime";

const slotHeight = 18; // pixels

const ScrollHider = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const Slot = styled.div`
    height: ${slotHeight}px;
    color: steelblue;
    text-align: center;
    font-family: monospace;
    font-size: 1.1rem;
`;

const Slots = styled.div`
    ${Slot}:nth-child(4n),
    ${Slot}:nth-child(4n-1) {
        background-color: white;
    }
    ${Slot}:nth-child(4n-3),
    ${Slot}:nth-child(4n-2) {
        background-color: lightblue;
    }
    width: calc(100% + ${SCROLLBAR_WIDTH}px);
    height: 100vh;
    overflow-y: scroll;
    padding-right: ${SCROLLBAR_WIDTH}px;
    box-sizing: content-box;
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

export default function TimePicker() {
    const selectedDate = useSelector(getSelectedDate);
    const availabilities = useSelector(getSelectedAvailabilities);
    
    const slots = getInitialTimes(selectedDate);
    
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
        <div onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
            <ScrollHider>
                <Slots>
                    {slots.map((slot, idx) => (
                        <Slot key={`slot-${idx}`} data-idx={idx}>
                            {idx%4 ? undefined : slot.timeDisplay}
                        </Slot>
                    ))}
                </Slots>
            </ScrollHider>
            {availabilities.map((availability, idx) => (
                <Availability
                    key={`availability-${idx}`}
                    top={getTop(availability)}
                    height={getHeight(availability)}
                />
            ))}
        </div>
    );
}