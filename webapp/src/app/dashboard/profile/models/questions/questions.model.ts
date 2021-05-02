import { FollowUpQuestionsGETAPIArgs } from "src/app/global/api/interfaces/endpoints/questions/follow-questions.interface";

export interface QuestionRowArgs {
  question: string;
  whitePageId: string;
  answer?: boolean;
  isCurrent?: boolean;
  disabled?: boolean;
}

export class QuestionRowModel implements QuestionRowArgs {
  question: string;
  whitePageId: string;
  answer: boolean = false;
  isCurrent: boolean = false;
  disabled: boolean = false;

  constructor(args: QuestionRowArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }
}

export class ProfileQuestionsModel {
  whitePageIds: string[];
  questions: QuestionRowModel[];

  constructor(args: FollowUpQuestionsGETAPIArgs) {
    this.whitePageIds = args.unique_list_of_WP_id;
    let people = [];
    for (let i = 0; i < args.items.length; i++) {
      let entry: QuestionRowModel = new QuestionRowModel({
        question: args.items[i].value,
        whitePageId: args.items[i].id,
      });
      people.push(entry);
    }
    this.questions = people;
  }
}
