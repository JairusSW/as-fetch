// Copyright 2020 Fastly, Inc.

/**
 * Define our charcodes that will be used to validate headers
 * These charcodes can be found in the man pages for ascii(7)
 */
class CHARCODE {
  static TAB: i32 = 9;
  static UNIT_SEPERATOR: i32 = 31;
  static EXCLAMATION_POINT: i32 = 33;
  static HASHTAG: i32 = 35;
  static SINGLE_QUOTE: i32 = 39;
  static ASTERISK: i32 = 42;
  static PERIOD: i32 = 46;
  static ZERO: i32 = 48;
  static NINE: i32 = 58;
  static UPPERCASE_A: i32 = 65;
  static UPPERCASE_Z: i32 = 90;
  static CIRCUMFLEX_ACCENT: i32 = 94;
  static BACKTICK: i32 = 96;
  static LOWERCASE_A: i32 = 97;
  static LOWERCASE_Z: i32 = 122;
  static VERTICAL_LINE: i32 = 124;
  static TILDE: i32 = 126;
  static DELETE: i32 = 127;
}

/**
 * Headers for a [Fetch HTTP Request/Response](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Headers).
 */
export class Headers {
  /**
   * @hidden
   */
  protected _map: Map<string, Array<string>>;

  constructor(/*TODO: Init Object*/) {
    this._map = new Map<string, Array<string>>();

    // TODO: Handle Init Object
  }

  /**
   * Get the value of a header by it's name.
   *
   * @param name string of the name of the header value you would want.
   * @returns the value associated with the header name if it exists.
   */
  get(name: string): string | null {
    this._validateHeaderName(name);
    name = this._headerNameToLowercase(name);

    if (this._map.has(name)) {
      let combinedHeader: Array<string> = this._map.get(name);

      return combinedHeader.join(", ");
    }

    return null;
  }

  // TODO: forEach: Iterate over headers closures

  /**
   * Set or Override a header of a given name.
   *
   * @param name The name of the HTTP header to set.
   * @param value The value of the HTTP header to set.
   */
  set(name: string, value: string): Headers {
    this._validateHeaderName(name);
    name = this._headerNameToLowercase(name);
    this._validateHeaderValue(value);

    let arrayValue = new Array<string>();
    arrayValue.push(value);

    this._map.set(name, arrayValue);

    return this
    
  }

  /**
   * Append a header value to a given name.
   *
   * @param name The name of the HTTP header to set.
   * @param value The value of the HTTP header to set.
   */
  append(name: string, value: string): void {
    this._validateHeaderName(name);
    name = this._headerNameToLowercase(name);
    this._validateHeaderValue(value);

    if (this._map.has(name)) {
      let arrayValue = this._map.get(name);
      arrayValue.push(value);
      this._map.set(name, arrayValue);
    } else {
      this.set(name, value);
    }
  }

  /**
   * Checks for header name existance.
   *
   * @param name The name of the HTTP header you want to know if exists on the headers instance.
   * @returns a boolean of whether or not the header exists.
   */
  has(name: string): boolean {
    name = this._headerNameToLowercase(name);
    return this._map.has(name) as boolean;
  }

  /**
   * Remove a header from from the `Header` instance.
   *
   * @param name The name of the HTTP header you want to remove from the `Header` instance.
   */
  delete(name: string): void {
    name = this._headerNameToLowercase(name);
    this._map.delete(name);
  }

  /**
   * Get all of the `Header` instance's names/keys.
   *
   * @returns an `Array` of `string`s containing all of the names/keys on the `Header` instance.
   */
  keys(): Array<string> {
    return this._map.keys();
  }

  /**
   * Get all of the `Header` instance's values.
   *
   * @returns an `Array` of `Array` of `string`s containing all of the values for each name on a `Header` instance.
   */
  values(): Array<Array<string>> {
    return this._map.values();
  }

  // AssemblyScript currently does not have a "string".toLowerCase()
  // So creating our own for the header name
  private _headerNameToLowercase(name: string): string {
    let response = "";
    for (let i = 0; i < name.length; i++) {
      let charCode = name.charCodeAt(i);

      // Check if charcode is between characters: A-Z
      if (
        charCode >= CHARCODE.UPPERCASE_A &&
        charCode <= CHARCODE.UPPERCASE_Z
      ) {
        // Convert to a-z
        charCode += 32;
      }

      response += String.fromCharCode(charCode);
    }

    return response;
  }

  // TODO: Iterators stuff, once AS supports Iterators

  // As of AS 0.9.x, Assemblyscript does not support regex.
  // Therefore, will be validating based on charcode, similar to:
  // https://github.com/SVasilev/http-headers-validation/blob/master/index.js
  // Which refers to node's internal header validation:
  // https://github.com/nodejs/node/blob/master/lib/_http_common.js#L206
  // Which references the actual HTTP header spec:
  // https://tools.ietf.org/html/rfc7230#section-3.2.6
  /**
   * @hidden
   */
  private _validateHeaderName(name: string): void {
    if (name.length == 0) {
      throw new Error(name + " is not a legal HTTP header name");
    }

    for (let i = 0; i < name.length; i++) {
      let charCode = name.charCodeAt(i);

      // Check if charcode is between characters: 0-9
      if (charCode >= CHARCODE.ZERO && charCode <= CHARCODE.NINE) {
        continue;
      }

      // Check if charcode is between characters: A-Z
      if (
        charCode >= CHARCODE.UPPERCASE_A &&
        charCode <= CHARCODE.UPPERCASE_Z
      ) {
        continue;
      }

      // Check if charcode is between characters: a-z
      if (
        charCode >= CHARCODE.LOWERCASE_A &&
        charCode <= CHARCODE.LOWERCASE_Z
      ) {
        continue;
      }

      // Check if charcode is between characters: ^, _, `, |, ~
      if (
        (charCode >= CHARCODE.CIRCUMFLEX_ACCENT &&
          charCode <= CHARCODE.BACKTICK) ||
        charCode == CHARCODE.VERTICAL_LINE ||
        charCode == CHARCODE.TILDE
      ) {
        continue;
      }

      // Check if charcode is between characters: !, #, $, %, &, ', *, +, -, .,
      if (
        charCode == CHARCODE.EXCLAMATION_POINT ||
        (charCode >= CHARCODE.HASHTAG && charCode <= CHARCODE.SINGLE_QUOTE) ||
        (charCode >= CHARCODE.ASTERISK && charCode <= CHARCODE.PERIOD)
      ) {
        continue;
      }

      // It was not a valid char code
      throw new Error(name + " is not a legal HTTP header name");
    }
  }

  /**
   * @hidden
   */
  private _validateHeaderValue(value: string): void {
    if (value.length == 0) {
      throw new Error(value + " is not a legal HTTP header value");
    }

    for (let i = 0; i < value.length; i++) {
      let charCode = value.charCodeAt(i);

      if (
        // If it is a chracter normally accessible by a keboard (0-9, special characters, alphabet, etc...),
        // and is less than the maxium character for a byte,
        // and is not the Delete ascii character
        (charCode > CHARCODE.UNIT_SEPERATOR &&
          charCode <= 255 &&
          charCode !== 127) ||
        // Or the character is a tab
        charCode === CHARCODE.TAB
      ) {
        continue;
      }

      // It was not a valid char code
      throw new Error(value + " is not a legal HTTP header value");
    }
  }
}
