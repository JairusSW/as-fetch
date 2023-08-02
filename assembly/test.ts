import { fetchSync } from "../sync";

const client_id = "e16ba747847f4705b3f162645e6d6f14";
const client_secret = "648b8f2568924b86b5ad18925413951b";
export function main(): void {
  console.log("fetchSync: " + fetchSync("https://accounts.spotify.com/api/token", {
    method: "POST",
    mode: "no-cors",
    headers: [
      ["Content-Type", "application/x-www-form-urlencoded"]
    ],
    body: String.UTF8.encode(
      `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    )
  }).text());
  /*
  fetch("http://api.quotable.io/random", {
    method: "GET",
    mode: "no-cors",
    headers: [],
    body: null,
  }).then((response) => {
    let text = response.text();
    console.log("Ok: " + response.ok.toString());
    console.log(
      "Status: " + response.status.toString() + " (" + response.statusText + ")"
    );
    console.log("Redirected: " + response.redirected.toString());
    console.log("Response: " + text);
  });

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    mode: "no-cors",
    headers: [
      ["Content-Type", "application/x-www-form-urlencoded"]
    ],
    body: String.UTF8.encode(
      `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    ),
  }).then((response) => {
    let text = response.text();
    console.log("Ok: " + response.ok.toString());
    console.log(
      "Status: " + response.status.toString() + " (" + response.statusText + ")"
    );
    console.log("Redirected: " + response.redirected.toString());
    console.log("Response: " + text);
  });*/
}