import { Worker } from "./worker";
import { Workerwork } from "./workerwork";

export interface Work {
    id?:Number,
    name:String,
    description:String,
    latitud:Number,
    longitud:Number,
    chief:Worker,
    workerWork:Array<Workerwork>
}
