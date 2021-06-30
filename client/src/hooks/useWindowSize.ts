import { useEffect, useState } from "react";

export type Size = {
    width: number;
    height: number;
};

export default function useWindowSize() {
    const [windowSize, setWindowSize] = (
        useState<Size>({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    );

    useEffect(() => {
        const handler = () => (
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        );
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    });

    return windowSize;
}
