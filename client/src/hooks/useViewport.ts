import { useEffect, useMemo, useState } from "react";

export enum Viewport { 
	XS , SM , MD , LG , XL
}

export const viewports: Record<Viewport, MediaQueryList> = {
	[Viewport.XS]: window.matchMedia("(max-width: 575px)"),
	[Viewport.SM]: window.matchMedia("(min-width: 576px) and (max-width: 767px)"),
	[Viewport.MD]: window.matchMedia("(min-width: 768px) and (max-width: 991px)"),
	[Viewport.LG]: window.matchMedia("(min-width: 992px) and (max-width: 1199px)"),
	[Viewport.XL]: window.matchMedia("(min-width: 1200px)"),
};

function getViewport() {
	for(let val in Viewport) {
		const viewportName = Number(val) as Viewport;
		const viewport = viewports[viewportName];
		
		if(viewport.matches) {
			return viewportName;
		}
	}

	return Viewport.XS;
}

export default function useViewport() {
	const [viewport, setViewport] = useState(getViewport);

    useEffect(() => {
		const handler = () => setViewport(getViewport);

		const mediaQueryLists = Object.values(viewports);

		mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));

		return () => (
			mediaQueryLists.forEach((mql) => mql.removeEventListener("change", handler))
		);
	}, []);

	return viewport;
}