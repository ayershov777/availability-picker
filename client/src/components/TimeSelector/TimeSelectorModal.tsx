import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleDayAction } from "../../redux/actions";
import { CalendarDay } from "../../types/common/dateTime.types";
import Modal from "../Modal/Modal";
import ModalExit from "../Modal/ModalExit";
import TimeSelector from "./TimeSelector";

const Heading = styled.div`
    font-size: 18pt;
    text-align: center;
    margin: 0 12px;
    padding: 6px 0;
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
    margin: 0 12px;
    padding: 8px 0;
    border-top: 1px solid darkgray;
`;

type TimeSelectorModalProps = {
    day: CalendarDay;
};

export default function TimeSelectorModal({ day }: TimeSelectorModalProps) {
    const dispatch = useDispatch();

    function deselectDay() {
        dispatch(toggleDayAction(day))
    }

    function closeModalCallback() {
        deselectDay();
    }

    return (
        <Modal closeModalCallback={closeModalCallback}>
            <>
                <Heading>{day.date.toDateString().substring(4, 10)}</Heading>
                <Body>
                    <TimeSelector
                        day={day}
                        events={day.events}
                    />
                </Body>
                <Footer>
                    <ModalExit closeModalCallback={closeModalCallback} text="Cancel" />
                </Footer>
            </>
        </Modal>
    );
}
