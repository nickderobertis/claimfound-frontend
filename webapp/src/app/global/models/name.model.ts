import {
  NameArgs,
  NameArrayArgs,
} from "../api/interfaces/general/name.interface";

export class Name {
  firstName: string;
  lastName: string;
  middleName: string;

  constructor(args?: NameArgs) {
    if (!args) {
      return;
    }

    this.firstName = args.first_name;
    this.lastName = args.last_name;
    this.middleName = args.middle_name;
  }

  get firstAndLastName(): string {
    return this.firstName + " " + this.lastName;
  }

  get capitalizedFirstName(): string {
    if (this.firstName != null) {
      return this.capitalizeFirstLetter(this.firstName);
    } else {
      return ""
    }
  }

  get capitalizedLastName(): string {
    if (this.lastName != null) {
      return this.capitalizeFirstLetter(this.lastName);
    } else {
      return ""
    }
  }

  get capitalizedFirstAndLastName(): string {
    return this.capitalizedFirstName + " " + this.capitalizedLastName;
  }

  get anyExistingCapitalizedName(): string {
    if (this.firstName != null && this.lastName != null) {
      return this.capitalizedFirstAndLastName;
    } else if (this.firstName != null) {
      return this.capitalizedFirstName;
    } else if (this.lastName != null) {
      return this.capitalizedLastName;
    } else {
      return "";
    }
  }

  private capitalizeFirstLetter(name: string) {
    if (name.length > 1) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    } else if (name.length == 1) {
      return name.toLocaleUpperCase();
    } else {
      return name;
    }
  }

  static arrayFromArgsArrayObj(data: NameArrayArgs): Name[] {
    let nameMap: { [nameType: string]: string } = {
      first_name: "firstName",
      last_name: "lastName",
      middle_name: "middleName",
    };

    let names = new Array(data.first_name.length)
      .fill(null)
      .map(() => new Name());

    for (let nameType in data) {
      data[nameType].forEach((name, index) => {
        if (Object.keys(nameMap).includes(nameType)) {
          names[index][nameMap[nameType]] = name;
        }
      });
    }

    return names;
  }
}
