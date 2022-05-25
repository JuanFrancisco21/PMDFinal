import { Workerwork } from "./workerwork";

export interface Dailylog {
    id?: Number,
    date: string,
    hours: Number,
    workerWork: Workerwork;
}
