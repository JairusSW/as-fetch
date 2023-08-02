import { fetchSync } from "../sync";
import { fetch } from "./src/fetch";

// Make sure to add this line!
export { responseHandler } from "./src/fetch";

const client_id = "";
const client_secret = "";

export function main(): void {
  console.log("fetchSync: " + fetchSync("https://random-data-api.com/api/users/random_user", {
    method: "GET",
    mode: "no-cors",
    headers: [],
    body: null,
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