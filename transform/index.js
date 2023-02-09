import { Transform } from "assemblyscript/dist/transform.js"
export default class Transformer extends Transform {
    afterCompile(mod) {
        mod.runPasses(["asyncify"]);
    }
}