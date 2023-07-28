import { main, responseHandler } from "./build/test.js"
fetch.setResponseHandler = responseHandler;
main();