// Copyright 2020 Fastly, Inc.
// Edited by Jairus Tanaka and Contributors

import { Headers } from "./headers";
import { Body } from "./body";
import { Status } from "./status";

import { isNull } from "./util";

/**
 * A configuration object to apply to the HTTP response being created.
 */
export class ResponseInit {
  status: number = 200;
  headers: Headers | null = null;
  url: string | null = null;
  redirected: boolean = false
}

/**
 * A [Fetch `Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) Object.
 */
export class Response extends Body {
  /**
   * @hidden
   */
  protected _status: Status;
  /**
   * @hidden
   */
  protected _headers: Headers;
  /**
   * @hidden
   */
  protected _body: Body | null;
  /**
   * @hidden
   */
  protected _url: string | null;
  /**
   * @hidden
   */
  protected _redirected: boolean;


  /**
   * Constructor for an HTTP response.
   *
   * @param body The initial content of the response Body.
   * @param init The Request configuration object.
   */
  constructor(body: ArrayBuffer | null, init: ResponseInit) {
    super(body);

    this._status = new Status(init.status);

    if (isNull(init.headers)) {
      this._headers = new Headers();
    } else {
      this._headers = changetype<Headers>(init.headers);
    }

    this._url = init.url;

    this._redirected = init.redirected

  }

  /**
   * Get the URL of where the response came from.
   *
   * @returns a string of the URL.
   */
  get url(): string {
    if (this._url == null) {
      return "";
    }

    return changetype<string>(this._url);
  }

  /**
   * Get the HTTP status of the response.
   *
   * @returns an unsigned 16 bit integer of the status code.
   */
  get status(): number {
    return this._status.code;
  }

  /**
   * Get if the response was ok/successful.
   *
   * @returns a boolean that is true if the response was successful, false if not.
   */
  get ok(): boolean {
    return this._status.code >= 200 && this._status.code < 300;
  }
  /**
   * Get if the response was redirected.
   *
   * @returns a boolean that is true if the response was redirected, false if not.
   */
  get redirected(): boolean {
    return this._redirected
  }

  /**
   * Get the text assosciated with the status code of the response.
   *
   * @returns a string associated with the status text for the response status code.
   */
  get statusText(): string {
    return this._status.toString();
  }

  /**
   * Get the `Response` headers.
   *
   * @returns A `Headers` object of the HTTP response headers, for the `Request`.
   */
  get headers(): Headers {
    return this._headers;
  }

  // TODO torch2424 (6/9/20): Clone
}
