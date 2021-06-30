import { useCallback, useEffect, useMemo, useState } from "react";

export enum ScreenSize { XSmall, Small, Medium, Large, XLarge, XXLarge };

function getMediaQueryLists() {
	const queries = [
		"(max-width: 575px)",
		"(min-width: 576px) and (max-width: 767px)",
		"(min-width: 768px) and (max-width: 991px)",
		"(min-width: 992px) and (max-width: 1199px)",
		"(min-width: 1200px) and (max-width: 1399px)",
		"(min-width: 1400px)",
	];
	
	return queries.map((q) => window.matchMedia(q));
}

export default function useScreenSize() {
	const mediaQueryLists = useMemo(getMediaQueryLists, []);

    const getSize = useCallback(() => {
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
				return ScreenSize.XSmall;
		}
	}, [mediaQueryLists]);

	const [size, setSize] = useState(getSize);

    useEffect(() => {
		const handler = () => setSize(getSize);
		mediaQueryLists.forEach((mql) =>
			mql.addEventListener("change", handler)
		);

		return () =>
			mediaQueryLists.forEach((mql) =>
				mql.removeEventListener("change", handler)
			);
	}, [getSize, mediaQueryLists]);

	return size;
}
