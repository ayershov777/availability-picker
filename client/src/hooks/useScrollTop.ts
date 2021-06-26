import { useEffect, useState } from "react";

export default function useScrollTop() {
    const [scrollTop, setScrollTop] = useState(window.scrollY);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    function handleScroll() {
        setScrollTop(window.scrollY);
    }

    return scrollTop;
}
