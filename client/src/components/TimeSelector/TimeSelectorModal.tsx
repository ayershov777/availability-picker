import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleDayAction } from "../../redux/actions";
import { CalendarDay } from "../../types/common/dateTime.types";
import Modal from "../Modal/Modal";
import ModalExit from "../Modal/ModalExit";
import TimeSelector from "./TimeSelector";

const Container = styled.div`
    background-color: white;
`;

const Heading = styled.div`
    font-size: 18pt;
    text-align: center;
    margin: 6px 12px 0 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid darkgray;
`;

const Body = styled.div`
    width: 50vw;
    height: 80vh;
    margin: 0 8px;
    overflow-y: scroll;
    overflow: hidden;
    position: relative;
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 12px 8px 12px;
    padding-top: 8px;
    border-top: 1px solid darkgray;
`;

type TimeSelectorModalProps = {
    day: CalendarDay;
    dayIdx: number
};

export default function TimeSelectorModal({ day, dayIdx }: TimeSelectorModalProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    function deselectDay() {
        dispatch(toggleDayAction(dayIdx))
    }

    function handleCancel() {
        deselectDay();
    }

    return (
        <Modal>
            <Container ref={containerRef}>
                <Heading>{day.date.toDateString().substring(4, 10)}</Heading>
                <Body>
                    <TimeSelector
                        dayIdx={dayIdx}
                        events={day.events}
                        x={containerRef.current?.clientHeight}
                    />
                </Body>
                <Footer>
                    <ModalExit handleClick={handleCancel} text="Cancel" />
                </Footer>
            </Container>
        </Modal>
    )
}
