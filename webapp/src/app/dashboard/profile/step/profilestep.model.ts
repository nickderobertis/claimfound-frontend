export interface ProfileStepArgs {
  nextURL?: string;
  prevURL?: string;
  showNext?: boolean;
  nextActive?: boolean;
  showPrev?: boolean;
  prevActive?: boolean;
}

export class ProfileStepModel {
  showNext: boolean = true;
  nextActive: boolean = false;
  nextURL: string;
  showPrev: boolean = true;
  prevActive: boolean = true;
  prevURL: string;

  constructor(args: ProfileStepArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }
}
