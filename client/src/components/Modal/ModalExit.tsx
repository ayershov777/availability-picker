import React from "react";

type ModalExitProps = {
    text: string;
    closeModalCallback: () => void;
}

function ModalExit({ text, closeModalCallback }: ModalExitProps) {
    function onClick (e: React.MouseEvent) {
        closeModalCallback();
    }

    return (
        <button onClick={onClick}>{text}</button>
    );
}

export default ModalExit;