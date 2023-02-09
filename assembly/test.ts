import { fetch } from "./src/fetch";

@external("env", "writeString")
declare function writeString(str: string): void;
@external("env", "readString")
declare function readString(): string;

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