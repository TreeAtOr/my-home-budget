import { action, makeAutoObservable } from "mobx";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY



export class RecordsStore {
    period = [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date(Date.now())]
    records = new Map([["fact", []], ["plan", []]])
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    session = this.supabase.auth.session()
    total = []
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
        this.supabase.auth.onAuthStateChange((_event, session) => {
            this.session = session
            if (!session) return;

            this.readRecords("fact")
            this.readRecords("plan")
            this.computeTotal()
        })
    }

    async createRecord(dest, record) {
        let { data, error, status } = await this.supabase
            .from(dest)
            .insert([record])
        if (error && status !== 406) throw error
        if (!data) return;

        this.readRecords(dest)
        this.computeTotal()
    }
    async readRecords(dest) {
        let { data, error, status } = await this.supabase
            .from(dest)
            .select(`id,label,amount,date,kind`)
            .gte('date', this.period[0].toISOString())
            .lte('date', this.period[1].toISOString())
        if (error && status !== 406) throw error
        if (data) this.records.set(dest, data)
    }
    async deleteRecord(dest, id) {
        let { data, error, status } = await this.supabase
            .from(dest)
            .delete()
            .eq("id", id)
        if (error && status !== 406) throw error
        if (!data) return;

        this.readRecords(dest)
        this.computeTotal()
    }
    async updateRecord(dest, record) {
        let { data, error, status } = await this.supabase
            .from(dest)
            .update(record)
            .eq("id", record.id)
        if (error && status !== 406) throw error
        if (!data || data.length === 0) return

        this.readRecords(dest)
        this.computeTotal()
    }

    async computeTotal() {
        let { data, error, status } = await this.supabase.rpc('total_by_period', {
            _to: this.period[1].toISOString(),
            _from: this.period[0].toISOString()
        })
        if (error && status !== 406) throw error
        if (data) this.total = data
    }

    setPeriod(from, to) {
        this.period = [from, to]
        this.readRecords("fact")
        this.readRecords("plan")
        this.computeTotal()
    }

    async reportBug(description, error) {
        const report = {
            description,
            error,
            device_info: window?.navigator.userAgent
        }
        let { data, _error, _status } = await this.supabase
            .from("reports")
            .insert([report], { returning: "minimal" })
        if (_error && _status !== 406) alert("Error was happened during bug report process. Please, contact developer ")
    }
}

export const recordsStore = new RecordsStore()
