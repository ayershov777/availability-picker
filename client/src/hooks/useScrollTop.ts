import { useEffect, useState } from "react";

export default function useScrollTop() {
    const [scrollTop, setScrollTop] = useState(window.scrollY);

    useEffect(() => {
        const handler = () => setScrollTop(window.scrollY);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return scrollTop;
}
