import { ProfilePhone } from "../models/profilephones.model";
import { ProfileAddress } from "../models/profileaddresses.model";
import { ProfileRelative } from "../models/profilerelatives.model";
import { ProfileBirthdayGender } from "../models/profilebirthdaygender.model";
import { ProfileName } from "../models/profilenames.model";

export interface ProfileEntryRowArgs {
  boldText: string;
  text: string;
  labelText: string[];
  canDelete: boolean;
  id: number;
  primary?: boolean;
}

export class ProfileEntryRowModel implements ProfileEntryRowArgs {
  boldText: string;
  text: string;
  labelText: string[];
  canDelete: boolean;
  id: number;
  primary?: boolean = false;

  constructor(args: ProfileEntryRowArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }
}

export interface ProfileEntryArgs {
  rows: ProfileEntryRowArgs[];
}

export class ProfileEntryModel {
  rows: ProfileEntryRowModel[];

  constructor(args: ProfileEntryArgs) {
    this.rows = [];
    for (let row of args.rows) {
      this.rows.push(new ProfileEntryRowModel(row));
    }
  }

  appendIndicesToBoldText(): void {
    let index = 1;
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i].boldText = this.rows[i].boldText + index.toString();
      index++;
    }
  }

  static fromProfilePhonesArr(phones: ProfilePhone[]): ProfileEntryModel {
    let rows: ProfileEntryRowArgs[] = [];
    let nonPrimaryRows: ProfileEntryRowArgs[] = [];
    for (let i = 0; i < phones.length; i++) {
      if (phones[i].primary === true) {
        let row: ProfileEntryRowArgs = {
          boldText: "Phone #",
          text: phones[i].formattedPhoneNumber,
          labelText: ["Primary"],
          canDelete: false,
          id: phones[i].id,
          primary: true,
        };
        if (phones[i].current) {
          row.labelText.push("Current");
        }
        rows.push(row);
      } else {
        let row: ProfileEntryRowArgs = {
          boldText: "Phone #",
          text: phones[i].formattedPhoneNumber,
          labelText: [],
          canDelete: true,
          id: phones[i].id,
        };
        if (phones[i].current) {
          row.labelText.push("Current");
        }
        nonPrimaryRows.push(row);
      }
    }
    rows = rows.concat(nonPrimaryRows);
    let profileEntryModel = new ProfileEntryModel({ rows: rows });
    return profileEntryModel;
  }

  static fromProfileAddressesArr(
    addresses: ProfileAddress[]
  ): ProfileEntryModel {
    let rows: ProfileEntryRowArgs[] = [];
    let nonPrimaryRows: ProfileEntryRowArgs[] = [];
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i].primary === true) {
        let row: ProfileEntryRowArgs = {
          boldText: "Address #",
          text: addresses[i].fullAddress,
          labelText: ["Primary"],
          canDelete: false,
          id: addresses[i].id,
          primary: true,
        };
        if (addresses[i].current) {
          row.labelText.push("Current");
        }
        rows.push(row);
      } else {
        let row: ProfileEntryRowArgs = {
          boldText: "Address #",
          text: addresses[i].fullAddress,
          labelText: [],
          canDelete: true,
          id: addresses[i].id,
        };
        if (addresses[i].current) {
          row.labelText.push("Current");
        }
        nonPrimaryRows.push(row);
      }
    }
    rows = rows.concat(nonPrimaryRows);
    let profileEntryModel = new ProfileEntryModel({ rows: rows });
    return profileEntryModel;
  }

  static fromProfileRelativesArr(
    relatives: ProfileRelative[]
  ): ProfileEntryModel {
    let rows: ProfileEntryRowArgs[] = [];
    for (let i = 0; i < relatives.length; i++) {
      let lableText = [];
      if (relatives[i].deceased) {
        lableText.push("Dead");
      }
      if (relatives[i].userIsHeir === "True") {
        lableText.push("On Will");
      }
      let row: ProfileEntryRowArgs = {
        boldText: this.capitalizeFirstCharacter(relatives[i].relationship),
        text: relatives[i].fullName,
        labelText: lableText,
        canDelete: true,
        id: relatives[i].id,
      };
      rows.push(row);
    }
    let profileEntryModel = new ProfileEntryModel({ rows: rows });
    return profileEntryModel;
  }

  static fromBirthdayGenderArr(
    bdayGenders: ProfileBirthdayGender[]
  ): ProfileEntryModel {
    let birthdayParts = bdayGenders[0].birthday.split("-");
    let formattedBirthday =
      birthdayParts[1] + "-" + birthdayParts[2] + "-" + birthdayParts[0];
    let rows: ProfileEntryRowArgs[] = [
      {
        boldText: "Birthday",
        text: formattedBirthday,
        labelText: [],
        canDelete: false,
        id: bdayGenders[0].id,
      },
      {
        boldText: "Gender",
        text: this.capitalizeFirstCharacter(bdayGenders[0].gender),
        labelText: [],
        canDelete: false,
        id: bdayGenders[0].id,
      },
    ];
    let profileEntryModel = new ProfileEntryModel({ rows: rows });
    return profileEntryModel;
  }

  static fromNamesArr(names: ProfileName[]): ProfileEntryModel {
    let rows: ProfileEntryRowArgs[] = [];
    let nonPrimaryRows: ProfileEntryRowArgs[] = [];
    for (let i = 0; i < names.length; i++) {
      if (names[i].primary === true) {
        let row: ProfileEntryRowArgs = {
          boldText: "Primary Name",
          text: names[i].fullName,
          labelText: ["Primary"],
          canDelete: false,
          id: names[i].id,
          primary: true
        };
        rows.push(row);
      } else {
        let row: ProfileEntryRowArgs = {
          boldText: "Alternate Name",
          text: names[i].fullName,
          labelText: [],
          canDelete: true,
          id: names[i].id,
          primary: false
        };
        nonPrimaryRows.push(row);
      }
    }
    rows = rows.concat(nonPrimaryRows);
    let profileEntryModel = new ProfileEntryModel({ rows: rows });
    return profileEntryModel;
  }

  static capitalizeFirstCharacter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
