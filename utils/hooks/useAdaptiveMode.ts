import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAdaptivity from "./useAdaptivity";

export type LayoutMode = 'desktop' | 'mdiagrams' | 'mplan' | 'mfact'
export function useAdaptiveMode (defaultMode: LayoutMode): [LayoutMode, Dispatch<SetStateAction<LayoutMode>>] {
    const [mode, setMode] = useState(defaultMode) 
    const size = useAdaptivity()

    useEffect(() => {
        if (size == 'xs' && mode == 'desktop') setMode('mdiagrams')
        else if (size != 'xs' && mode != 'desktop') setMode('desktop')
    }, [size])

    return [mode, setMode];
  };
