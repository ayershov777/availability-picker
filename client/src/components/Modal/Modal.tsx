import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Backdrop = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.75);
    animation: 0.25s ${fadeIn} ease-out;
`;

type ModalProps = {
    children: string | JSX.Element | JSX.Element[];
};

function Modal({ children }: ModalProps) {
    document.body.style.overflow = "hidden";
    return (
        <Backdrop>
            {children}
        </Backdrop>
    )
}

export default Modal;
