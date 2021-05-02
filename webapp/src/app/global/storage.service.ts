import { Injectable } from "@angular/core";

import { log } from "./logger.service";

/**
 * The service used to get and store values in browser LocalStorage
 */
@Injectable()
export class StorageService {
  @log()
  write(key: string, value: any) {
    if (value) {
      if (typeof value != "string") {
        value = JSON.stringify(value);
      }
    }
    localStorage.setItem(key, value);
    localStorage.setItem("_type-" + key, typeof value);
  }

  @log()
  read<T>(key: string): T {
    let value: string = localStorage.getItem(key);
    let valueType: string = localStorage.getItem("_type-" + key);

    if (value && value != "undefined" && value != "null") {
      if (valueType == "string") {
        return <T>(value as unknown);
      }
      return <T>JSON.parse(value);
    }

    return null;
  }

  @log()
  remove(key: string) {
    delete localStorage[key];
    if (localStorage.hasOwnProperty("_type-" + key)) {
      delete localStorage["_type-" + key];
    }
  }

  @log()
  getToken<T>(): T {
    return this.read("cf-jwt");
  }

  @log()
  removeToken() {
    this.remove("cf-jwt");
  }
}
