interface NamedObject {
  name: string;
}

export class NamedCollection<T extends NamedObject> {
  elements: T[];
  elementsByName: { [name: string]: T };
  indexMap: { [name: string]: number };

  constructor() {
    this.elements = [];
    this.elementsByName = {};
    this.indexMap = {};
  }

  addElements(...elements: T[]): NamedCollection<T> {
    for (let i = 0; i < elements.length; ++i) {
      let element = elements[i];

      this.addElement(element);
    }

    return this;
  }

  addElement(element: T): NamedCollection<T> {
    if (!element.name) {
      throw "Name not set on element";
    }

    if (this.getElement(element.name)) {
      throw `Already element with name: ${element.name}`;
    }

    this.elements.push(element);
    this.elementsByName[element.name] = element;
    this.indexMap[element.name] = this.elements.length - 1;

    return this;
  }

  getElement(name: string): T {
    return this.elementsByName[name];
  }

  removeElement(name: string): NamedCollection<T> {
    let element = this.getElement(name);

    if (!element) {
      return this;
    }

    let index = this.indexMap[name];
    this.elements.splice(index, 1);

    this.elementsByName[name] = null;
    delete this.elementsByName[name];

    this.indexMap[name] = null;
    delete this.indexMap[name];

    this.reflowIndexMap();

    return this;
  }

  reflowIndexMap() {
    for (let i = 0; i < this.elements.length; ++i) {
      let element = this.elements[i];

      this.indexMap[element.name] = i;
    }
  }
}
