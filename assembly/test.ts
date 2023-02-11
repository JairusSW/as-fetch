import { fetch } from "./src/fetch";

@external("env", "writeString")
declare function writeString(str: string): void;

export function main(): void {
        // @ts-ignore
        const res = fetch("http://api.quotable.io/random", {
            method: "GET",
            mode: "no-cors",
            headers: [],
            body: null
        });

        const text = res.text16();
        writeString("Response: " + text);
}