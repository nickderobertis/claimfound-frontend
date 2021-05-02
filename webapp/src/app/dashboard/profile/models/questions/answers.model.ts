import { ProfileQuestionsModel } from "./questions.model";
import {
  WhitePagesAddressData,
  WhitePagesAddress,
  AddressFollowUpQuestionsPOSTAPIArgs,
  WhitePagesPersonData,
  WhitePagesPhoneData,
  PhoneFollowUpQuestionsPOSTAPIArgs,
  AssociateFollowUpQuestionsPOSTAPIArgs,
  WhitePagesPhone,
  WhitePagesPerson,
} from "src/app/global/api/interfaces/endpoints/questions/follow-questions.interface";
import { AssociatesQuestionsModel } from "./associatesquestions.model";

export type WhitePagesArgs =
  | WhitePagesAddressData
  | WhitePagesPersonData
  | WhitePagesPhoneData;
export type WhitePagesPOSTAPIArgs =
  | AddressFollowUpQuestionsPOSTAPIArgs
  | PhoneFollowUpQuestionsPOSTAPIArgs
  | AssociateFollowUpQuestionsPOSTAPIArgs;

export interface AnswersArgs {
  noAnswer: boolean;
  uniqueListOfWPId: string[];
  ids: WhitePagesArgs;
}

export class AnswersModel implements AnswersArgs {
  dataType: string;
  noAnswer: boolean;
  uniqueListOfWPId: string[];
  ids: WhitePagesArgs;

  constructor(args: AnswersArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }

  // TODO: could not figure out how to properly type this. Should be returning WhitePagesPOSTAPIArgs
  toFollowUpQuestionsPOSTAPIArgs() {
    return {
      data_type: this.dataType,
      noAnswer: this.noAnswer,
      unique_list_of_WP_id: this.uniqueListOfWPId,
      ids: this.ids,
    };
  }
}

export interface AddressAnswersArgs extends AnswersArgs {
  ids: WhitePagesAddressData;
}

export class AddressAnswersModel extends AnswersModel
  implements AddressAnswersArgs {
  dataType: string = "address";
  noAnswer: boolean;
  uniqueListOfWPId: string[];
  ids: WhitePagesAddressData;

  // TODO: added solely for type casting purposes because could not figure out proper typing structure
  toFollowUpQuestionsPOSTAPIArgs(): AddressFollowUpQuestionsPOSTAPIArgs {
    let data = super.toFollowUpQuestionsPOSTAPIArgs() as AddressFollowUpQuestionsPOSTAPIArgs;
    return data;
  }

  static fromProfileQuestionsModel(
    model: ProfileQuestionsModel,
    noAnswer: boolean
  ): AddressAnswersModel {
    let addresses: WhitePagesAddressData = {};

    for (let question of model.questions) {
      let address: WhitePagesAddress = {
        address: question.question,
        response: question.answer,
        isCurrentAddress: question.isCurrent,
      };
      addresses[question.whitePageId] = address;
    }

    let data: AddressAnswersArgs = {
      noAnswer: noAnswer,
      uniqueListOfWPId: model.whitePageIds,
      ids: addresses,
    };

    let mod: AddressAnswersModel = new AddressAnswersModel(data);
    return mod;
  }
}

export interface PhoneAnswersArgs extends AnswersArgs {
  ids: WhitePagesPhoneData;
}

export class PhoneAnswersModel extends AnswersModel
  implements PhoneAnswersArgs {
  dataType: string = "phone";
  noAnswer: boolean;
  uniqueListOfWPId: string[];
  ids: WhitePagesPhoneData;

  // TODO: added solely for type casting purposes because could not figure out proper typing structure
  toFollowUpQuestionsPOSTAPIArgs(): PhoneFollowUpQuestionsPOSTAPIArgs {
    let data = super.toFollowUpQuestionsPOSTAPIArgs() as PhoneFollowUpQuestionsPOSTAPIArgs;
    return data;
  }

  static fromProfileQuestionsModel(
    model: ProfileQuestionsModel,
    noAnswer: boolean
  ): PhoneAnswersModel {
    let phones: WhitePagesPhoneData = {};

    for (let question of model.questions) {
      let dict: WhitePagesPhone = {
        phone: question.question,
        response: question.answer,
        isCurrent: question.isCurrent,
      };
      phones[question.whitePageId] = dict;
    }

    let data: PhoneAnswersArgs = {
      noAnswer: noAnswer,
      uniqueListOfWPId: model.whitePageIds,
      ids: phones,
    };

    let mod: PhoneAnswersModel = new PhoneAnswersModel(data);
    return mod;
  }
}

export interface AssociateAnswersArgs extends AnswersArgs {
  ids: WhitePagesPersonData;
}

export class AssociateAnswersModel extends AnswersModel
  implements AssociateAnswersArgs {
  dataType: string = "associate";
  noAnswer: boolean;
  uniqueListOfWPId: string[];
  ids: WhitePagesPersonData;

  // TODO: added solely for type casting purposes because could not figure out proper typing structure
  toFollowUpQuestionsPOSTAPIArgs(): AssociateFollowUpQuestionsPOSTAPIArgs {
    let data = super.toFollowUpQuestionsPOSTAPIArgs() as AssociateFollowUpQuestionsPOSTAPIArgs;
    return data;
  }

  static fromAssociatesQuestionsModel(
    model: AssociatesQuestionsModel,
    noAnswer: boolean
  ): AssociateAnswersModel {
    let people: WhitePagesPersonData = {};

    for (let associate of model.associates) {
      let response: boolean = false;

      if (associate.category !== "" && associate.category !== "none") {
        response = true;
      }

      let person: WhitePagesPerson = {
        associate: associate.name,
        category: associate.category,
        deceasedConfirmed: associate.deceasedConfirmed,
        isDeceased: associate.deceased,
        response: response,
        userIsHeir: associate.isHeir,
      };
      people[associate.whitePageId] = person;
    }

    let data: AssociateAnswersArgs = {
      noAnswer: noAnswer,
      uniqueListOfWPId: model.whitePageIds,
      ids: people,
    };

    let mod: AssociateAnswersModel = new AssociateAnswersModel(data);
    return mod;
  }
}
