import { Worker } from "./worker";
import { Workerwork } from "./workerwork";

export interface Work {
    id?: Number,
    name: String,
    description: String,
    active: Boolean,
    location: {
        x: Number,
        y: Number,
    },
    chief?: Worker,
    workerWork?: Workerwork[]

}
