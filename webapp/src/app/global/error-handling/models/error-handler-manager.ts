import { ErrorHandler } from "./error-handler";

import { ERROR_HANDLERS } from "./error-handlers/index";

export class ErrorHandlerManager {
  private static _instance: ErrorHandlerManagerModel;

  static get instance() {
    if (!this._instance) {
      ErrorHandlerManager._instance = new ErrorHandlerManagerModel();
    }

    return this._instance;
  }
}

class ErrorHandlerManagerModel {
  private _handlers: ErrorHandler[] = [];
  private _handlersByName: any = {};

  constructor() {
    for (var i = 0; i < ERROR_HANDLERS.length; i++) {
      let handler = ERROR_HANDLERS[i];

      this.addHandler(new handler());
    }
  }

  addHandler(handler: ErrorHandler): ErrorHandlerManager {
    if (this.getHandler(handler.name)) {
      throw `Already error handler with name: ${handler.name}`;
    }

    if (!(handler instanceof ErrorHandler)) {
      throw "handler must be instance of ErrorHandler";
    }

    this._handlers.push(handler);
    this._handlersByName[handler.name] = handler;

    return this;
  }

  getHandler(name: string): ErrorHandler {
    return this._handlersByName[name];
  }

  removeHandler(name: string): ErrorHandlerManager {
    let handler = this.getHandler(name);

    if (!handler) {
      return this;
    }

    let index = this._handlers.indexOf(handler);
    if (index > -1) {
      this._handlers.splice(index, 1);
    }

    delete this._handlersByName[name];

    return this;
  }
}
