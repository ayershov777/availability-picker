type ModalExitProps = {
    text: string;
    handleClick?: (...args: any[]) => void;
}

function ModalExit({ text, handleClick: callback }: ModalExitProps) {
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        document.body.style.overflow = "auto";
        callback && callback();
    }

    return (
        <button onClick={handleClick}>{text}</button>
    );
}

export default ModalExit;