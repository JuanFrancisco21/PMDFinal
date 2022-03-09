import { Dailylog } from "./dailylog";
import { Work } from "./work";
import { Worker } from "./worker";

export interface Workerwork {
    id?:Number,
    current:Boolean,
    worker:Worker,
    work:Work,
    dailyLogList:Array<Dailylog>,
    dailylogcheck:boolean
}
