import { useEffect, useState } from "react";

export type Size = {
    width: number;
    height: number;
};

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    } as Size);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    })

    function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })    
    }

    return windowSize;
}
