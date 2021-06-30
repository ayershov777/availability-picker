import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CalendarEvent, TimeSlot } from '../../types/common/dateTime.types';
import RootState from '../../types/redux/state.types';
import { getInitialTimes, MILLIS_PER_FIFTEEN_MINUTES } from '../../utils/dateTime';

type AvailabilityProps = {
    top: number;
    height: number;
};

type TimeSlotsSelectorProps = {
    dayIdx: number;
    events: CalendarEvent[];
    x?: number;
};

type ContainerProps = {
    margin: number;
};

const Container = styled.div`
    max-height: 1728px;
    height: 1728px;
    margin: 0 4px;
    display: grid;
    grid-template-columns: 96px auto;
`;

const Slot = styled.div`
    height: 18px;
`;

const Slots = styled.div`
    ${Slot}:nth-child(4n-3),
    ${Slot}:nth-child(4n-2) {
        background-color: lightblue;
    }
    border-right: 1px solid darkgray;
    border-left: 1px solid darkgray;
`;

const Availability = styled.div`
    // position: relative;
    position: absolute;
    top: ${({ top }: AvailabilityProps) => top}px;
    left: 100px;
    width: calc(50vw - 100px);
    height: ${({ height }: AvailabilityProps) => height}px;
    background-color: blue;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
    margin-left: -2px;
    margin-right: -2px;
`;

type Resizing = {
    side?: "top" | "bottom";
    yStart?: number;
}

export default function TimeSlotsSelector({ dayIdx, events, x }: TimeSlotsSelectorProps) {
    const date = useSelector((state: RootState) => state.schedulerReducer.days[dayIdx].date);
    const [slots, setSlots] = useState(getInitialTimes(date, events));
    const [newEvents, setNewEvents] = useState([] as CalendarEvent[]);
    const [resizing, setResizing] = useState({ } as Resizing);

    const slotElRef = useRef<HTMLDivElement>(null);
    const lastEventRef = useRef<CalendarEvent | null>(null);
    const TOPDOWN=1, BOTTOMUP=2;
    const shrinkType = useRef<number>(0);

    function getHandleStartSelection(slot: TimeSlot, idx: number, slots: TimeSlot[]) {
        return getHandleSelectSlot(slot, idx, slots, true)
    }

    function getHandleSelectSlot(slot: TimeSlot, idx: number, slots: TimeSlot[], isMouseDown?: boolean) {
        if(slot.event) {
            return undefined;
        }

        const isFirstSlot = idx === 0;
        const isLastSlot = idx === slots.length - 1;

        const aboveSlot = isFirstSlot ? undefined : slots[idx-1];
        const belowSlot = isLastSlot ? undefined : slots[idx+1];

        const aboveEvent = aboveSlot && aboveSlot.event;
        const belowEvent = belowSlot && belowSlot.event;

        if(!!aboveEvent && !!belowEvent) {
            // two adjacent slots selected
            return function (e: React.MouseEvent<HTMLDivElement>) {
                console.log('test 1')

                if(e.buttons !== 1) {
                    return;
                }

                const newEvent: CalendarEvent = {
                    startTime: aboveEvent.startTime,
                    endTime: belowEvent.endTime,
                };
    
                slot.event = newEvent;
                lastEventRef.current = newEvent;
    
                const slotsWithAboveUpdated = updateEventSlots(slots, aboveEvent, newEvent);
                const slotsWithAdjacentUpdated = updateEventSlots(slotsWithAboveUpdated, belowEvent, newEvent);
                slotsWithAdjacentUpdated[idx].event = newEvent;

                const aboveEventIndex = newEvents.indexOf(aboveEvent);
                newEvents.splice(aboveEventIndex, 1);
                
                const belowEventIndex = newEvents.indexOf(belowEvent);
                newEvents.splice(belowEventIndex, 1);

                setSlots(slotsWithAdjacentUpdated);
                setNewEvents([...newEvents, newEvent]);
            };
        }
        
        if(!!aboveEvent || !!belowEvent) {
            // adjacent slot is selected
            return function (e: React.MouseEvent<HTMLDivElement>) {
                if(e.buttons !== 1) {
                    return;
                }

                const adjacentEvent = (aboveEvent || belowEvent) as CalendarEvent;
                slot.event = adjacentEvent;
                lastEventRef.current = adjacentEvent;


                const adjacentEnd = adjacentEvent.endTime.getTime();
                const slotTime = slot.dateTime.getTime();

                if(adjacentEnd <= slotTime) {
                    adjacentEvent.endTime = new Date(slotTime + MILLIS_PER_FIFTEEN_MINUTES);
                }
                else {
                    adjacentEvent.startTime = new Date(slotTime)
                }

                setSlots([...slots]);
                setNewEvents([...newEvents]);
            };
        }
        
        if(isMouseDown) {
            // no adjacent slot is selected
            return function (e: React.MouseEvent<HTMLDivElement>) {
                if(e.buttons !== 1) {
                    return;
                }
                
                const event: CalendarEvent = {
                    startTime: slot.dateTime,
                    endTime: new Date(slot.dateTime.getTime() + MILLIS_PER_FIFTEEN_MINUTES),
                };
    
                lastEventRef.current = event;
                slot.event = event;

                setSlots([...slots])
                setNewEvents([...newEvents, event]);
            };
        }

        return function(e: React.MouseEvent<HTMLDivElement>) {
            // dragging fast
            if(e.buttons !== 1) {
                return;
            }

            const lastEvent = (lastEventRef.current as CalendarEvent);
            const lastEventEnd = lastEvent.endTime.getTime();
            const slotTime = slot.dateTime.getTime();


            if(lastEventEnd <= slotTime) {
                lastEvent.endTime = new Date(slotTime + MILLIS_PER_FIFTEEN_MINUTES);
            }
            else {
                lastEvent.startTime = new Date(slotTime)
            }

            const newSlots = updateEventSlots(slots, lastEvent, lastEvent);

            setSlots([...newSlots]);
            setNewEvents([...newEvents])
        }
        
    }

        function updateEventSlots(slots: TimeSlot[], event: CalendarEvent, newEvent: CalendarEvent) {
        const start = getTimeIndex(event.startTime);
        const end = getTimeIndex(event.endTime);

        return slots.map((slot) => {
            const slotIdx = getTimeIndex(slot.dateTime);
            const isInEvent = slotIdx >= start && slotIdx <= end;
            
            if(isInEvent) {
                slot.event = newEvent;
            }

            return { ...slot };
        });
    }

    function getSlotElRef(idx: number) {
        return idx ? undefined : slotElRef;
    }

    function getTimeIndex(time: Date) {
        const dayStart = slots[0].dateTime.getTime();
        const delta = time.getTime() - dayStart;
        return delta/MILLIS_PER_FIFTEEN_MINUTES;
    }

    function getTop(event: CalendarEvent, availabilityIdx: number) {
        const slotHeight = slotElRef.current!.clientHeight;
        const start = getTimeIndex(event.startTime);

        return start * slotHeight;
    }

    function getHeight(event: CalendarEvent) {
        const slotHeight = slotElRef.current!.clientHeight;
        const start = getTimeIndex(event.startTime);
        const end = getTimeIndex(event.endTime);
        const length = end - start;

        return length * slotHeight;
    }

    function isMouseInResizeArea(element: HTMLDivElement, mouseY: number) {
        return isMouseInBottomResizeArea(element, mouseY) || isMouseInTopResizeArea(element, mouseY);
    }

    function isMouseInBottomResizeArea(element: HTMLDivElement, mouseY: number) {
        const bounds = element.getBoundingClientRect();
        const y0 = bounds.bottom;
        const y1 = y0-8;
        return mouseY >= y1 && mouseY <= y0;
    }

    function isMouseInTopResizeArea(element: HTMLDivElement, mouseY: number) {
        const bounds = element.getBoundingClientRect();
        const y0 = bounds.top;
        const y1 = y0+8;
        return mouseY >= y0 && mouseY <= y1;
    }

    function handleMouseOverAvailability(e: React.MouseEvent<HTMLDivElement>, event: CalendarEvent, idx:number) {
        const element = e.currentTarget;
        
        const inTop = isMouseInTopResizeArea(element, e.clientY);
        const inBottom = isMouseInBottomResizeArea(element, e.clientY);
        const resizeArea = inTop || inBottom;

        if (resizeArea) {
            element.style.cursor = 'ns-resize';
        }
        else {
            element.style.cursor = 'default';
        }

        if(e.buttons !== 1){ 
            return;
        }
        if (inTop) shrinkType.current = TOPDOWN;
        else if (inBottom) shrinkType.current = BOTTOMUP;
console.log('shrinkType: ', shrinkType.current, 'e.movementY: ',e.movementY);

        const newSlots = [...slots];
        let newEvent;
        if (shrinkType.current === TOPDOWN && e.movementY > 0) {
            const newStartTime = new Date(event.startTime);
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const delta = (rect.top-e.clientY) / 18 * 15;
            newStartTime.setMinutes(event.endTime.getMinutes() - delta);
            newEvent = {startTime: newStartTime, endTime: event.endTime};
            const oldIndex = getTimeIndex(event.startTime);
            const newIndex = getTimeIndex(newStartTime);
            if (oldIndex < newIndex && newSlots[oldIndex]) newSlots[oldIndex].event = undefined;
        } else if (shrinkType.current === BOTTOMUP && e.movementY < 0) {
            const newEndTime = new Date(event.endTime);
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const delta = (rect.bottom-e.clientY) / 18 * 15;
            newEndTime.setMinutes(event.startTime.getMinutes() - delta);
            newEvent = {startTime: event.startTime, endTime: newEndTime};
            const oldIndex = getTimeIndex(event.endTime);
            const newIndex = getTimeIndex(newEndTime);
            if (oldIndex > newIndex && newSlots[oldIndex]) newSlots[oldIndex].event = undefined;
        } else return;
        // else if (shrinkType.current === TOPDOWN && e.movementY < 0 || shrinkType.current === BOTTOMUP && e.movementY > 0) {
        //     getHandleSelectSlot(slot, idx, slots);
        // }

        // lastEventRef.current = event;

        setSlots([...newSlots]);

        const newNewEvents = [...newEvents];
        newNewEvents[idx] = newEvent;
        setNewEvents(newNewEvents);
    }

    function handleMouseDownAvailability(e: React.MouseEvent<HTMLDivElement>) {
        if(e.buttons !== 1) {
            return;
        }

        if(isMouseInTopResizeArea(e.currentTarget, e.clientY)) {
            setResizing({
                side: "top",
                yStart: e.clientY,
            });
        }
        else if(isMouseInBottomResizeArea(e.currentTarget, e.clientY)) {
            setResizing({
                side: "bottom",
                yStart: e.clientY, 
            });
        }
    }

    function getMouseMoveSlotHandler() {
        // console.log(resizing.side)
        if (resizing.side == "top") {
            return function(e: React.MouseEvent<HTMLDivElement>) {
                // console.log(resizing.yStart, e.clientY)
                if(resizing.yStart && e.clientY > resizing.yStart) {
                    // console.log('resizing down')
                }
            }
        }
        else {
            return function(e: React.MouseEvent<HTMLDivElement>) {
                // console.log('test2')
            }
        }
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
            <Slots>
                {slots.map((slot, idx) => (
                    <Slot
                        data-idx={idx}
                        ref={getSlotElRef(idx)}
                        onMouseDown={getHandleStartSelection(slot, idx, slots)}
                        onMouseEnter={getHandleSelectSlot(slot, idx, slots)}
                        // onMouseMove={getMouseMoveSlotHandler()}
                    />
                ))}
            </Slots>
            {slotElRef.current && newEvents.map((event, idx) => (
                <Availability
                    top={getTop(event, idx)}
                    height={getHeight(event)}
                    onMouseMove={e=>handleMouseOverAvailability(e, event, idx)}
                    onMouseUp={()=>shrinkType.current=0}
                    // onMouseDown={handleMouseDownAvailability}
                />
            ))}
        </Container>
    );
}
