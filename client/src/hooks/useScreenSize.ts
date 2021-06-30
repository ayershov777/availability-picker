import { useEffect, useState } from "react";

export enum ScreenSize { XSmall, Small, Medium, Large, XLarge, XXLarge };
export enum Breakpoints { XSmall=0, Small=576, Medium=768, Large=992, XLarge=1200, XXLarge=1400 };

const queries = [
	"(max-width: 575px)",
	"(min-width: 576px) and (max-width: 767px)",
	"(min-width: 768px) and (max-width: 991px)",
	"(min-width: 992px) and (max-width: 1199px)",
	"(min-width: 1200px) and (max-width: 1399px)",
	"(min-width: 1400px)",
];

const mediaQueryLists = queries.map((q) => window.matchMedia(q));

function getSize () {
	const isMatch = (idx: ScreenSize) => mediaQueryLists[idx].matches;

	switch(true) {
		case isMatch(ScreenSize.XSmall):
			return ScreenSize.XSmall;
		case isMatch(ScreenSize.Small):
			return ScreenSize.Small;
		case isMatch(ScreenSize.Medium):
			return ScreenSize.Medium;
		case isMatch(ScreenSize.Large):
			return ScreenSize.Large;
		case isMatch(ScreenSize.XLarge):
			return ScreenSize.XLarge;
		case isMatch(ScreenSize.XXLarge):
			return ScreenSize.XXLarge;
		default:
			throw new Error("no queries match");
	}
}

export default function useScreenSize() {
	const [size, setSize] = useState(getSize);

    useEffect(() => {
		const handler = () => setSize(getSize);
		mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));

		return () => (
			mediaQueryLists.forEach((mql) => mql.removeEventListener("change", handler))
		);
	}, []);

	return size;
}