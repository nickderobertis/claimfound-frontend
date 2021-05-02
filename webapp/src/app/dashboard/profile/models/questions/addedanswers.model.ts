import { FollowUpQuestionsPOSTResponseArgs } from "src/app/global/api/interfaces/endpoints/questions/follow-questions.interface";

export class QuestionAnswerResponseModel {
  questionType: string;
  answers: string[];
  questionsRemaining: number;

  constructor(args: FollowUpQuestionsPOSTResponseArgs) {
    this.questionType = args.add_type;
    this.answers = args.added;
    this.questionsRemaining = args.remaining_questions;
  }
}
