import { useEffect, useState } from "react";
import useAdaptivity from "./useAdaptivity";


export function useAdaptiveMode (defaultMode) {
    const [mode, setMode] = useState(defaultMode) 
    const size = useAdaptivity()

    useEffect(() => {
        if (size == 'xs' && mode == 'desktop') setMode('mdiagrams')
        else if (size != 'xs' && mode != 'desktop') setMode('desktop')
    }, [size])

    return [mode, setMode];
  };
