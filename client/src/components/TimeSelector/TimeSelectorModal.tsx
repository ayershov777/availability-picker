import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSelectedDateAction } from "../../redux/actions";
import { getSelectedDate } from "../../redux/selectors";
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

export default function TimeSelectorModal() {
    const selectedDate = useSelector(getSelectedDate)
    const dispatch = useDispatch();

    if (selectedDate === undefined) {
        return <></>;
    }

    function deselectDate() {
        dispatch(setSelectedDateAction(undefined))
    }

    function closeModalCallback() {
        deselectDate();
    }

    return (
        <Modal closeModalCallback={closeModalCallback}>
            <Heading>{selectedDate.toDateString().substring(4, 10)}</Heading>
            <Body>
                <TimeSelector />
            </Body>
            <Footer>
                <ModalExit closeModalCallback={closeModalCallback} text="Cancel" />
            </Footer>
        </Modal>
    );
}
