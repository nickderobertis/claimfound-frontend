import { LoggerService } from "../../../logger.service";

export class EventTracker {
  name: string;
  eventHandlers: {
    [name: string]: (data: any) => void;
  } = {};

  constructor(name: string, public logger: LoggerService) {
    this.name = name;

    this.setupEventHandlers();
  }

  setupEventHandlers() {}

  triggerEvent(name: string, data: any) {
    let cb = this.eventHandlers[name];
    if (!cb) {
      return;
    }

    cb(data);
  }
}
