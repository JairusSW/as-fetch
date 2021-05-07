// Copyright 2020 Fastly, Inc.
// Edited by Jairus Tanaka and Contributors

import { Headers } from "./headers";
import { Body } from "./body";

import { isNull } from "./util";

/**
 * A configuration object to apply to the `Request` being created.
 */
export class RequestInit {
  method: string | null = null;
  headers: Array<Array<string>> | null = null;
  body: ArrayBuffer | null = null;
  mode: string | null = null;
  // TODO torch2424 (6/9/20): Credentials
  // TODO torch2424 (6/9/20): Cache
  // TODO torch2424 (6/9/20): Redirect
  // TODO torch2424 (6/9/20): Referrer
  // TODO torch2424 (6/9/20): Integrity
}

/**
 * A [Fetch HTTP Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) Object.
 */
export class Request extends Body {
  /**
   * @hidden
   */
  protected _url: string;
  /**
   * @hidden
   */
  protected _method: string;
  /**
   * @hidden
   */
  protected _headers: Headers;
  /**
   * @hidden
   */
  protected _body: Body | null;

  /**
   * The constructor for an HTTP Request.
   *
   * @param url The url for where the Request should be sent.
   * @param init The Request configuration object.
   */
  constructor(url: string, init: RequestInit) {
    if (isNull(init.body)) {
      super(null);
    } else {
      super(init.body);
    }

    this._url = url;

    if (isNull(init.method)) {
      this._method = "GET";
    } else {
      this._method = changetype<string>(init.method);
    }

    if (isNull(init.headers)) {
      this._headers = new Headers();
    } else {
      this._headers = changetype<Headers>(init.headers);
    }
  }

  /**
   * Get the Request method.
   *
   * @returns A string representation of the HTTP request method.
   */
  get method(): string {
    return this._method;
  }

  /**
   * Get the Request URL.
   *
   * @returns A string representation of the HTTP Request URL.
   */
  get url(): string {
    return this._url;
  }

  /**
   * Get the Request headers.
   *
   * @returns A `Headers` object of the HTTP Request headers, for the `Request`.
   */
  get headers(): Headers {
    return this._headers;
  }

  // TODO torch2424 (6/9/20): Redirect
  // TODO torch2424 (6/9/20): Signal
}
