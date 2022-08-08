import { supabase } from "./supabaseClient"

export default class RecordsTableHelper {
    constructor(table, period, setLoading, setData, setError, onUpdated) {
        this.table = table
        this.period = period,
        this.setError = setError
        this.setLoading = setLoading
        this.setData = (...args) => {
            onUpdated()
            setData(...args)
        }

        this.getData = this.getData.bind(this)
        this.addRecord = this.addRecord.bind(this)
        this.deleteRecord = this.deleteRecord.bind(this)
    }
    async getData() {
        this.setError(undefined)
        this.setLoading(true)

        let { data, error, status } = await supabase
            .from(this.table)
            .select(`id,label,amount,created_at,kind`)
            .gte('created_at', this.period[0].toISOString())
            .lte('created_at', this.period[1].toISOString())

        if (error && status !== 406) this.setError(error)
        else if (data) this.setData(data)

        this.setLoading(false)
    }

    async addRecord(label, amount, kind) {
        this.setError(undefined)
        this.setLoading(true)

        let { data, error, status } = await supabase
            .from(this.table)
            .insert([{ label, amount, kind }])

        if (error && status !== 406) this.setError(error)
        else if (data) this.getData()

        this.setLoading(false)
    }

    async deleteRecord(id) {
        this.setError(undefined)
        this.setLoading(true)
        let { data, error, status } = await supabase
            .from(this.table)
            .delete()
            .eq("id", id)

        if (error && status !== 406) this.setError(error)
        else if (data) this.getData()

        this.setLoading(false)
    }


}
