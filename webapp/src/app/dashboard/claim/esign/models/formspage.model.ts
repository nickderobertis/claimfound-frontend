import {
  FormsAPIGETArgs,
  IncompleteForm,
  CompleteForm,
} from "src/app/global/api/interfaces/endpoints/forms/forms.interface";
import { Point } from "angular2-signaturepad/signature-pad";
import { StorageService } from "src/app/global/storage.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CLIENT_API_KEY } from "src/app/global/org-settings";

export interface FillForm {
  city: string;
  phone: string;
  ssn: string;
  state: string;
  streetAddress: string;
  zipCode: string;
  points: Point[][];
  datePoints: Point[][];
}

export class FillItemModel {
  item_type: string;
  table: string | null;
}

export class FillAddressModel extends FillItemModel {
  data: {
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
  };
}

export class FillPhoneModel extends FillItemModel {
  data: {
    phone: string;
  };
}

export class FillSSNModel extends FillItemModel {
  data: {
    ssn: string;
  };
}

export class FillSignatureModel extends FillItemModel {
  data: {
    points: Point[][];
  };
}

export class FillDateModel extends FillItemModel {
  data: {
    date: Point[][];
  };
}

export class FormModel implements IncompleteForm {
  url: string;
  id: number;

  constructor(args?: IncompleteForm) {
    if (!args) {
      return;
    }

    this.url = args.url;
    this.id = args.id;
  }

  authenticatedUrl(storage: StorageService, urlHasArgs: boolean): string;
  authenticatedUrl(
    storage: StorageService,
    urlHasArgs: boolean,
    sanitizer: DomSanitizer
  ): SafeResourceUrl;
  authenticatedUrl(
    storage: StorageService,
    urlHasArgs: boolean,
    sanitizer?: DomSanitizer
  ): string | SafeResourceUrl {
    if (urlHasArgs) {
      var sep = "&";
    } else {
      var sep = "?";
    }

    const token = storage.getToken();
    const urlString = `${this.url}${sep}token=${token}&api_key=${CLIENT_API_KEY}`;
    if (sanitizer) {
      return sanitizer.bypassSecurityTrustResourceUrl(urlString);
    }

    return urlString;
  }
}

export class IncompleteFormModel extends FormModel {}

export class CompleteFormModel extends FormModel implements CompleteForm {
  name: string;
  constructor(args?: CompleteForm) {
    super(args);
    this.name = args.name;
  }
}

export class FormsPostModel {
  filled_items: FillItemModel[];

  constructor(args: FillForm) {
    this.filled_items = [];
    let addressFill: FillAddressModel = {
      item_type: "address",
      table: "Addresses",
      data: {
        street_address: args.streetAddress,
        city: args.city,
        state: args.state,
        zip_code: args.zipCode,
      },
    };
    this.filled_items.push(addressFill);

    let phoneFill: FillPhoneModel = {
      item_type: "phone",
      table: "Phones",
      data: {
        phone: args.phone,
      },
    };
    this.filled_items.push(phoneFill);

    let ssnFill: FillSSNModel = {
      item_type: "ssn",
      table: null,
      data: {
        ssn: args.ssn,
      },
    };
    this.filled_items.push(ssnFill);

    let signatureFill: FillSignatureModel = {
      item_type: "signature",
      table: "Signatures",
      data: {
        points: args.points,
      },
    };
    this.filled_items.push(signatureFill);

    let dateFill: FillDateModel = {
      item_type: "date",
      table: null,
      data: {
        date: args.datePoints,
      },
    };
    this.filled_items.push(dateFill);
  }
}

export class FormsPageModel {
  incompleteForms: IncompleteFormModel[];
  completeForms: CompleteFormModel[];
  addressItems: FillAddressModel;
  phoneItems: FillPhoneModel;
  ssnItems: FillItemModel;
  signatureItems: FillItemModel;

  static fillItemTypes = {
    address: "address",
    phone: "phone",
    ssn: "ssn",
    signature: "signature",
  };

  constructor(args: FormsAPIGETArgs) {
    let incompleteForms: IncompleteFormModel[] = [];
    // The link to view incomplete forms was changed to a api method.
    // As a result olny the first entry now has a url and it is the only one
    // a user needs to view. Therefore only adding first entry to array.
    /*for (let incForm of args.incomplete_forms) {
      let entry: IncompleteFormModel = new IncompleteFormModel(incForm);
      incompleteForms.push(entry);
    }*/
    if (args.incomplete_forms[0]) {
      incompleteForms.push(new IncompleteFormModel(args.incomplete_forms[0]));
    }
    this.incompleteForms = incompleteForms;

    let completeForms: CompleteFormModel[] = [];
    for (let compForm of args.complete_forms) {
      let entry: CompleteFormModel = new CompleteFormModel(compForm);
      completeForms.push(entry);
    }
    this.completeForms = completeForms;

    for (let fillItem of args.fill_items) {
      if (fillItem.item_type === FormsPageModel.fillItemTypes.address) {
        let entry: FillAddressModel = {
          data: {
            street_address: fillItem.data.street_address,
            city: fillItem.data.city,
            state: fillItem.data.state,
            zip_code: fillItem.data.zip_code,
          },
          item_type: fillItem.item_type,
          table: fillItem.table,
        };
        this.addressItems = entry;
      } else if (fillItem.item_type === FormsPageModel.fillItemTypes.phone) {
        let entry: FillPhoneModel = {
          data: {
            phone: fillItem.data.phone,
          },
          item_type: fillItem.item_type,
          table: fillItem.table,
        };
        this.phoneItems = entry;
      } else if (fillItem.item_type === FormsPageModel.fillItemTypes.ssn) {
        let entry: FillItemModel = {
          item_type: fillItem.item_type,
          table: fillItem.table,
        };
        this.ssnItems = entry;
      } else if (
        fillItem.item_type === FormsPageModel.fillItemTypes.signature
      ) {
        let entry: FillItemModel = {
          item_type: fillItem.item_type,
          table: fillItem.table,
        };
        this.signatureItems = entry;
      }
    }
  }
}
