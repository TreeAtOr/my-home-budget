import { IRepeatPattern } from "./IRepeatPattern";

export interface IRepeatConditions {
    from: Date;
    to: Date;
    pattern: IRepeatPattern
}