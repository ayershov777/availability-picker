import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useWindowSize from './hooks/useWindowSize';
import useScrollTop from './hooks/useScrollTop';

type Position = {
    top: number;
    left: number;
};

type SelectionData = {
    startIdx: number,
    endIdx: number,
};

type ActiveSelectionData = {
    initialIndex: number;
    data?: SelectionData;
};

type SelectionProps = {
    height: number;
    position: Position;
    cursor: string;
};

const SLOT_HEIGHT = 22;

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 16px;
`;

const Slot = styled.div`
    height: ${SLOT_HEIGHT}px;
    // z-index: 0;
`;

const Slots = styled.div`
    width: 50vw;
    border: 1px solid black;
    ${Slot}:nth-of-type(2n) {
        background-color: gray;
    }
`;

const Selection = styled.div`
    position: absolute;
    top: ${({ position }: SelectionProps) => position.top}px;
    left: ${({ position }: SelectionProps) => position.left}px;
    height: ${({ height }: SelectionProps) => height}px;
    width: 50vw;
    background-color: blue;
    cursor: ${({ cursor }: SelectionProps) => cursor}
    // z-index: 10;
`;

const CloseSelection = styled.button`
    height: ${SLOT_HEIGHT}px;
    vertical-align: top;
    border: 0;
    background-color: transparent;
    color: white;
    font-size: 18pt;
    line-height: 20px;
    user-select: none;
    cursor: pointer;
    &:hover {
        box-shadow: 1px 1px 3px black;
    }
`;

const initialSelections: SelectionData[] = [];

function getSelectionHeight({ startIdx, endIdx }: SelectionData) {
    return (endIdx - startIdx + 1) * SLOT_HEIGHT;
}

function getSelectionPosition({ startIdx }: SelectionData, firstSlot: HTMLElement, scrollTop: number) {
    const offset = getElementPosition(firstSlot);
    const relativeTop = startIdx * SLOT_HEIGHT;
    const  absoluteTop = offset.top + relativeTop + scrollTop;
    return { top: absoluteTop, left: offset.left };
}

function getElementPosition(element: HTMLElement): Position {
    const {left, top} = element.getBoundingClientRect();
    return { left, top };
}

export default function Test() {
    const [selections, setSelections] = useState(initialSelections);
    const [activeSelection, setActiveSelection] = useState<ActiveSelectionData>();
    const [movement, setMovement] = useState<string>();
    const [moveOffset, setMoveOffset] = useState<number>();
    const [selectionCursor, setSelectionCursor] = useState("default");
    
    const resizeRequestRef = useRef<number | null>(null);
    const moveRequestRef = useRef<number | null>(null);
    const mouseMoveRequestRef = useRef<number | null>(null);
    const slotRef = useRef<HTMLDivElement | null>(null);
    
    useWindowSize();
    const scrollTop = useScrollTop();

    // useEffect(() => {

    // }, []);

    function setActiveSelectionData(data: SelectionData | undefined) {
        if(activeSelection) {
            setActiveSelection({ ...activeSelection, data });
        }
    }

    function getSelectionFromIndex(idx: number) {
        return selections.filter(selection => idx >= selection.startIdx && idx <= selection.endIdx)[0];
    }

    function getMouseIndex <T extends HTMLElement> (e: React.MouseEvent<T>) {
        const mouseY = e.clientY;
        const offset = getElementPosition(slotRef.current!).top;
        return Math.floor((mouseY - offset) / SLOT_HEIGHT);
    }

    // handlers

    function getSlotMouseDownHandler(idx: number) {
        return function () {
            const selection: ActiveSelectionData = {
                initialIndex: idx,
                data: { startIdx: idx, endIdx: idx }
            };
            setActiveSelection(selection);
            setMovement("resize");
        };
    }
    
    function handleCloseSelection(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        const mouseIdx = getMouseIndex(e);
        const selection = getSelectionFromIndex(mouseIdx);
        console.log(selection);
        setSelections(selections.filter(s => s !== selection));
    }

    function handleResizeSelection(e: React.MouseEvent<HTMLDivElement>) {
        resizeRequestRef.current = requestAnimationFrame(() => {
            if(resizeRequestRef.current === null)
                return;

            const mouseIdx = getMouseIndex(e);
            
            const initialIndex = activeSelection!.initialIndex;
            if(mouseIdx < initialIndex)
                setActiveSelectionData({ startIdx: mouseIdx, endIdx: initialIndex });
            else if(mouseIdx >= initialIndex)
                setActiveSelectionData({ startIdx: initialIndex, endIdx: mouseIdx });
        });
    }

    function handleMoveSelection(e: React.MouseEvent<HTMLDivElement>) {
        moveRequestRef.current = requestAnimationFrame(() => {
            if(moveRequestRef.current === null)
                return;

            const mouseIdx = getMouseIndex(e);
            const height = activeSelection!.data!.endIdx - activeSelection!.data!.startIdx;

            if(moveOffset && mouseIdx - moveOffset >= 0 && mouseIdx + height - moveOffset < 96)
                setActiveSelectionData({ startIdx: mouseIdx - moveOffset!, endIdx: mouseIdx + height - moveOffset! });
        });
    }

    function handleMouseMoveSelection(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.currentTarget;
        mouseMoveRequestRef.current = requestAnimationFrame(() => {
            if(mouseMoveRequestRef.current === null)
                return;

            const mouseY = e.clientY;
            const bounds = target.getBoundingClientRect();
            const nearBottom = mouseY <= bounds.bottom && mouseY >= bounds.bottom-8;
            setSelectionCursor(nearBottom ? "ns-resize" : "pointer");
        });
    }

    function handleMouseDownSelection(e: React.MouseEvent<HTMLDivElement>) {
        console.log('mousedown')
        const mouseY = e.clientY;
        const bounds = e.currentTarget.getBoundingClientRect();
        const nearBottom = mouseY <= bounds.bottom && mouseY >= bounds.bottom-8;
        const offset = getElementPosition(slotRef.current!).top;
        const mouseIdx = Math.floor((mouseY - offset) / SLOT_HEIGHT);
        const selection = getSelectionFromIndex(mouseIdx);

        mouseMoveRequestRef.current = null;

        setSelectionCursor(nearBottom ? "ns-resize" : "move");
        setMovement(nearBottom ? "resize" : "move");
        setSelections(selections.filter(iSelection => iSelection != selection));
        setActiveSelection({
            initialIndex: selection.startIdx,
            data: selection,
        });
        setMoveOffset(mouseIdx - selection.startIdx);
    }

    function handleMouseUp() {
        if(activeSelection!.data) {
            setSelections([ ...selections, activeSelection!.data ]);
        }
        setActiveSelection(undefined);
        setMovement(undefined);
        setMoveOffset(undefined);

        if(resizeRequestRef.current) {
            resizeRequestRef.current = null;
        }

        if(moveRequestRef.current) { 
            moveRequestRef.current = null;
        }
    }

    function getMouseMoveHandler() {
        if(!activeSelection || !movement)
            return undefined;
        else if(movement === "resize")
            return handleResizeSelection;
        else if(movement === "move")
            return handleMoveSelection;
    }

    function getHandleMouseUp() {
        return activeSelection && handleMouseUp;
    }

    return (
        <Container
            onMouseMove={getMouseMoveHandler()}
            onMouseUp={getHandleMouseUp()}
        >
            <Slots>
                {[...Array(96)].map((_val, idx) => (
                    <Slot
                        key={`slot-${idx}`}
                        ref={idx === 0 ? slotRef : undefined}
                        onMouseDown={getSlotMouseDownHandler(idx)}
                    />
                ))}
            </Slots>
            {slotRef.current && selections.map((selection, idx) => (
                <Selection
                    key={`selection-${idx}`}
                    height={getSelectionHeight(selection)}
                    position={getSelectionPosition(selection, slotRef.current!, scrollTop)}
                    cursor={selectionCursor}
                    onMouseMove={handleMouseMoveSelection}
                    onMouseDown={handleMouseDownSelection}
                >
                    <CloseSelection onClick={handleCloseSelection}>✖</CloseSelection>
                </Selection>
            ))}
            {slotRef.current && activeSelection?.data && (
                <Selection
                    height={getSelectionHeight(activeSelection.data)}
                    position={getSelectionPosition(activeSelection.data, slotRef.current, scrollTop)}
                    cursor={selectionCursor}
                >
                    <CloseSelection>✖</CloseSelection>
                </Selection>
            )}
        </Container>
    );
}
