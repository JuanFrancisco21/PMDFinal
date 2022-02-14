import { Workerwork } from "./workerwork";

export interface Dailylog {
    id?:Number,
    date:Date,
    hours:Number,
    workerWork:Workerwork
}
