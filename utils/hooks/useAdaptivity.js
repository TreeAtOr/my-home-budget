import { useEffect, useState } from "react";

function widthToBreakpoints(width) {
    if (width < 650) return 'xs';
    if (width > 650 && width <= 960) return 'sm';
    if (width > 960 && width <= 1280) return 'md';
    if (width > 1280 && width <= 1400) return 'lg';
    return 'xl';
}

export default function useAdaptivity() {
    const [status, setStatus] = useState(widthToBreakpoints(window.innerWidth));
    useEffect(() => {
        const handleResizeWindow = () => setStatus(widthToBreakpoints(window.innerWidth));
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, [])
    return status
}