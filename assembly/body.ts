// Copyright 2020 Fastly, Inc.
// Edited by Jairus Tanaka and Contributors

import { Blob } from './Blob'

/**
 * Body for [Fetch HTTP Requests and Responses](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Body).
 */
export class Body {
  /**
   * @hidden
   */
  protected _buffer: ArrayBuffer | null;
  /**
   * @hidden
   */
  protected _disturbed: boolean;

  /**
   * The constructor for the `Body` class.
   *
   * @param body An optional array buffer to initialize the body.
   */
  constructor(body: ArrayBuffer | null) {
    this._buffer = body;

    this._disturbed = false;
  }

  // TODO: body
  // Returns a readable stream

  /**
   * @returns A boolean representing whether the Body has been consumed already or not.
   */
  get bodyUsed(): boolean {
    return this._disturbed;
  }

  /**
   * @returns an `ArrayBuffer` for the Body content.
   */
  arrayBuffer(): ArrayBuffer {
    this._consumeBody();

    if (this._buffer == null) {
      return new Uint8Array(0).buffer;
    }
    return Uint8Array.wrap(this._buffer);
  }

  /**
   * @returns an `Blob` for the Body content.
   */
  blob(): Blob {
    this._consumeBody();
  
    if (this._buffer == null) {
      return new Blob(new Uint8Array(0), {
        type: 'text/plain'
      });
    }
    return new Blob(Uint8Array.wrap(changetype<ArrayBuffer>(this._buffer)), {
      type: 'text/plain'
    });
  }

  // TODO: JSON

  /**
   * @returns a string representation of the Body `ArrayBuffer` content.
   */
  text(): string {
    this._consumeBody();

    if (this._buffer == null) {
      return "";
    }
    return String.UTF8.decode(changetype<ArrayBuffer>(this._buffer));
  }

  // TODO: Buffer (Probably going to be a Uint8Array)
  // See: https://www.quora.com/What-is-the-relationship-between-a-Buffer-and-an-Uint8Array-in-Node-js

  /**
   * @hidden
   */
  protected _consumeBody(): void {
    if (this._disturbed) {
      throw new Error("Body already used");
    }

    this._disturbed = true;
    // TODO: Handle streams
  }
}
