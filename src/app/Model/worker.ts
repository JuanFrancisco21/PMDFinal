import { Work } from "./work";
import { Workerwork } from "./workerwork";

export interface Worker {
    id?: Number,
    name: String,
    surname: String,
    email: String,
    active: Boolean,
    picture: String,
    chiefWorkList: Array<Work>,
    workerWork: Array<Workerwork>
}
