import { action, makeAutoObservable } from "mobx";

import { createClient } from '@supabase/supabase-js'
import { getCookie, hasCookie, setCookie } from "cookies-next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const DEFAULT_PERIOD = [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date(Date.now())]

export class RecordsStore {
    period
    records = new Map([["fact", []], ["plan", []]])
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    session = this.supabase.auth.session()
    total = []
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
        console.log(this.period);
        if (hasCookie('period')) {
            console.log(getCookie('period'));
            this.period = JSON.parse(getCookie('period').toString()).map(str => new Date(str))
        } else {
            this.period = DEFAULT_PERIOD
        }
        this.supabase.auth.onAuthStateChange((_event, session) => {
            this.session = session
            if (!session) return;
            console.log(this.period);
            this.readRecords("fact")
            this.readRecords("plan")
            this.computeTotal()
        })
    }

    get periodString() {
        return `${this.period[0].toDateString()}-${this.period[1].toDateString()}`
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
    async createPeriodicRecords(dest: string, record: any, { from, to, pattern }: { from: Date, to: Date, pattern: { days, months, years } }) {
        const { days, months } = pattern
        const records = []
        let date = from
        while (date < to) {
            records.push({ ...record, date })
            date = new Date(date.setDate(date.getDate() + days))
            date = new Date(date.setMonth(date.getMonth() + months))
        }

        let { data, error, status } = await this.supabase
            .from(dest)
            .insert(records)
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
        setCookie('period', JSON.stringify([from.toISOString(), to.toISOString()]))
        this.readRecords("fact")
        this.readRecords("plan")
        this.computeTotal()
    }

    async reportBug(description, _error) {
        const report = {
            description,
            error: _error,
            device_info: window?.navigator.userAgent
        }
        let { data, error, status } = await this.supabase
            .from("reports")
            .insert([report], { returning: "minimal" })
        if (error && status !== 406) alert("Error was happened during bug report process. Please, contact developer ")
    }
}

export const recordsStore = new RecordsStore()
