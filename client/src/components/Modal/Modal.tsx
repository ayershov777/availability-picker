import React, { useEffect } from "react";
import CSS from "csstype";
import useScrollTop from "../../hooks/useScrollTop";
import { SCROLLBAR_WIDTH } from "../../utils/common";
import { default as Layout } from "./ModalLayout";
import { default as Backdrop } from "./ModalBackdrop";
import { default as ContentContainer } from "./ModalContentContainer";

type ModalProps = {
    children: string | JSX.Element | JSX.Element[];
    backdropColor?: CSS.Property.BackgroundColor;
    backgroundColor?: CSS.Property.BackgroundColor;
    closeModalCallback: () => void;
};

function Modal({ children, backdropColor, backgroundColor, closeModalCallback }: ModalProps) {
    const scrollTop = useScrollTop();

    function onKeyDown (e: KeyboardEvent) {
        if(e.code === "Escape") {
            closeModalCallback();
        }
    }

    function onClickBackdrop(e: React.MouseEvent) {
        closeModalCallback();
    }

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${SCROLLBAR_WIDTH}px`;
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "auto";
            document.body.style.marginRight = "0";
        };
    });
    
    return (
        <Layout top={`${scrollTop}px`}>
            <Backdrop onClick={onClickBackdrop} backgroundColor={backdropColor} />
            <ContentContainer backgroundColor={backgroundColor}>{children}</ContentContainer>
        </Layout>
    );
}

export default Modal;
