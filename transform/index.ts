import { Transform } from "assemblyscript/dist/transform.js"
import { Module } from "assemblyscript/dist/assemblyscript";
export default class Asyncify extends Transform {
    afterCompile(mod: Module) {
        mod.runPasses(["asyncify"]);
    }
}