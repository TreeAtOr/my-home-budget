import { action, makeAutoObservable } from "mobx";
import { supabase } from "../utils/supabaseClient";

export class RecordsStore {
    period = [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date(Date.now())]
    records = new Map([["fact", []], ["plan", []]])
    total = []
    constructor() {
        makeAutoObservable(this,{},{deep: true})
        this.readRecords("fact")
        this.readRecords("plan")
        this.computeTotal()
    }

    async createRecord(dest, record) {
        let { data, error, status } = await supabase
            .from(dest)
            .insert([record])
        if (error && status !== 406) throw error
        if (!data) return;
        
        this.readRecords(dest)
        this.computeTotal()
    }
    async readRecords(dest) {
        let { data, error, status } = await supabase
            .from(dest)
            .select(`id,label,amount,date,kind`)
            .gte('date', this.period[0].toISOString())
            .lte('date', this.period[1].toISOString())
        if (error && status !== 406) throw error
        if (data) this.records.set(dest, data)
    }
    async deleteRecord(dest, id) {
        let { data, error, status } = await supabase
            .from(dest)
            .delete()
            .eq("id", id)
        if (error && status !== 406) throw error
        if (!data) return;

        this.readRecords(dest)
        this.computeTotal()
    }
    async updateRecord(dest, record) {
        let { data, error, status } = await supabase
            .from(dest)
            .update(record)
            .eq("id", record.id)
        if (error && status !== 406) throw error
        if (!data || data.length === 0) return
        
        this.readRecords(dest)
        this.computeTotal()
    }

    async computeTotal() {
        let { data, error, status } = await supabase.rpc('total_by_period', {
            _to: this.period[1].toISOString(),
            _from: this.period[0].toISOString()
        })
        if (error && status !== 406) throw error
        if (data) this.total = data
    }

    setPeriod(from, to) {
        this.period = [from, to]
    }
}

export const recordsStore = new RecordsStore()
