import { useEffect, useMemo, useState } from "react";
import RecordsTableHelper from "../RecordsTableHelper";


export function useRecordsTableHelper(table, period, setError, onUpdate) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

    const helper = useMemo(() => {
        console.log("recreating", table,
            period,
            setLoading,
            setData,
            setError,
            onUpdate);
        return new RecordsTableHelper(
            table,
            period,
            setLoading,
            setData,
            setError,
            onUpdate
        )
    }, [table, period,setError,onUpdate ])

        useEffect(() => {
            if (helper) helper.getData()
        }, [helper]);

    return [loading, data, helper.addRecord, helper.deleteRecord];
};
