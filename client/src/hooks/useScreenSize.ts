import { useCallback, useEffect, useMemo, useState } from "react";

export const SCREENSIZE = {
	XSMALL: 0,
	SMALL: 1,
	MEDIUM: 2,
	LARGE: 3,
	XLARGE: 4,
	XXLARGE: 5,
};
export default function useScreenSize() {

	const mediaQueryLists = useMemo(() => {
    	const queries = [
            "(max-width: 575px)",
            "(min-width: 576px) and (max-width: 767px)",
            "(min-width: 768px) and (max-width: 991px)",
            "(min-width: 992px) and (max-width: 1199px)",
            "(min-width: 1200px) and (max-width: 1399px)",
            "(min-width: 1400px)",
        ];
        return queries.map((q) =>typeof window !== "undefined" ? window.matchMedia(q) : null);
    }, []);

    const getSize = useCallback(() => {
        const sizes = [
            SCREENSIZE.XSMALL,
            SCREENSIZE.SMALL,
            SCREENSIZE.MEDIUM,
            SCREENSIZE.LARGE,
            SCREENSIZE.XLARGE,
            SCREENSIZE.XXLARGE,
        ],
        defaultSize = SCREENSIZE.LARGE;
        const index = mediaQueryLists.findIndex((mql) => mql && mql.matches);
		return index > -1 && typeof sizes[index] !== "undefined"
			? sizes[index]
			: defaultSize;
	}, [mediaQueryLists]);

	const [size, setSize] = useState(getSize);

    useEffect(() => {
		const handler = () => setSize(getSize);
		mediaQueryLists.forEach((mql) =>
			mql!.addEventListener<"change">("change", handler)
		);

		return () =>
			mediaQueryLists.forEach((mql) =>
				mql!.removeEventListener("change", handler)
			);
	}, [getSize, mediaQueryLists]);

	return size;
}
