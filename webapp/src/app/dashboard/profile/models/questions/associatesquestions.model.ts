import { AssociatesFollowUpQuestionsGETAPIArgs } from "src/app/global/api/interfaces/endpoints/questions/follow-questions.interface";

export interface AssociateQuestionArgs {
  name: string;
  whitePageId: string;
  deceased?: boolean;
  isHeirCheckbox?: boolean;
  isHeirAnswered?: boolean;
  category?: string;
  disabled?: boolean;
}

export class AssociateQuestionRowModel implements AssociateQuestionArgs {
  name: string;
  whitePageId: string;
  deceased: boolean = false;
  deceasedConfirmed: boolean = false;
  isHeirCheckbox: boolean = false;
  isHeirAnswered: boolean = false;
  category: string = "";
  disabled: boolean = false;

  constructor(args: AssociateQuestionArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }
  get isHeir() {
    if (this.isHeirAnswered == false) {
      return "notanswered";
    } else if (this.isHeirCheckbox == true) {
      return "True";
    } else {
      return "False";
    }
  }

  toggleIsHeirAnswered() {
    this.isHeirAnswered = true;
  }

  toggleDeceasedConfirmed() {
    this.deceasedConfirmed = true;
  }
}

export class AssociatesQuestionsModel {
  categories: string[];
  whitePageIds: string[];
  associates: AssociateQuestionRowModel[];

  constructor(args: AssociatesFollowUpQuestionsGETAPIArgs) {
    this.categories = args.categories;
    this.whitePageIds = args.unique_list_of_WP_id;
    let people: AssociateQuestionRowModel[] = [];
    for (let i = 0; i < args.items.length; i++) {
      let entry: AssociateQuestionRowModel = new AssociateQuestionRowModel({
        name: args.items[i].value,
        whitePageId: args.items[i].id,
      });
      people.push(entry);
    }
    this.associates = people;
  }
}
