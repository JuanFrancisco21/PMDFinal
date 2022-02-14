import { Work } from "./work";
import { Workerwork } from "./workerwork";

export interface Worker {
    id?:Number,
    name:String,
    surname:String,
    active:Boolean,
    piture:String,
    chiefWorkList:Array<Work>,
    workerWork:Array<Workerwork>
}
