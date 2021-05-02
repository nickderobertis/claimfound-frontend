import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormsPageService } from "../formspage.service";
import { LoggerService } from "src/app/global/logger.service";
import {
  FormsPageModel,
  FillForm,
  FormsPostModel,
} from "../models/formspage.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Point } from "angular2-signaturepad/signature-pad";
import { Subject } from "rxjs";
import { CFError } from "src/app/global/error.service";
import { FormGroupHelper } from "src/app/global/utils/formGroupHelper";

/**
 * The component on the e-sign forms page which holds all the components
 * for the user to provide information and sign the form.
 *
 * Handles validation of the information.
 */
@Component({
  selector: "cf-fill-and-sign",
  templateUrl: "./fillandsign.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./fillandsign.component.scss",
  ],
})
export class FillAndSignComponent {
  @Input() stepOneDone: boolean;
  @Input() model: FormsPageModel;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  fillAndSignForm: FormGroup;

  submitSubject: Subject<void> = new Subject<void>();
  submitSubjectTwo: Subject<void> = new Subject<void>();
  datePoints: Point[][];

  startTask = false;
  taskComplete: boolean = false;
  submitting: boolean = false;
  allowSubmit: boolean = true;
  showErrors: boolean = false;

  dateTitleText: string = "📅 Claim Form Date";
  dateInstructionsText: string =
    "Florida requires a manually created date to validate your claim form. Please enter the current date below using either your mouse or finger.";
  dateErrorText: string = "Please provide a date.";

  formConstants: { [key: string]: string } = {
    streetAddress: "streetAddress",
    city: "city",
    state: "state",
    zipCode: "zipCode",
    phone: "phone",
    ssn: "ssn",
  };

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    street_address: this.formConstants.streetAddress,
    city: this.formConstants.city,
    state: this.formConstants.state,
    zip_code: this.formConstants.zipCode,
    phone: this.formConstants.phone,
    ssn: this.formConstants.ssn,
  };

  constructor(
    protected formsPageService: FormsPageService,
    protected logger: LoggerService
  ) {
    this.fillAndSignForm = new FormGroup({
      streetAddress: new FormControl(null, [Validators.required]),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      zipCode: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
      ]),
      ssn: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9-]*$"),
        Validators.minLength(11),
      ]),
    });
  }

  ngOnInit() {
    if (this.model.incompleteForms.length <= 0) {
      this.taskComplete = true;
    }
  }

  onStart() {
    this.startTask = true;
  }

  /*
    This method just sends an event to get the points data from signature pad component.
    Actual saving is handled in the callback from that event.
  */
  onSubmit() {
    if (this.allowSubmit) {
      this.submitSubject.next();
    }
  }

  onDateSave(points: Point[][]) {
    if (this.allowSubmit) {
      this.datePoints = points;
      this.submitSubjectTwo.next();
    }
  }

  onSignatureSave(points: Point[][]) {
    if (!this.fillAndSignForm.valid) {
      this.showErrors = true;
      return alert(
        "Some items did not pass validation. Please review your entries."
      );
    }
    this.submitting = true;

    let fillForm: FillForm = {
      city: this.fillAndSignForm.controls.city.value,
      phone: "+" + this.fillAndSignForm.controls.phone.value,
      ssn: this.fillAndSignForm.controls.ssn.value,
      state: this.fillAndSignForm.controls.state.value,
      streetAddress: this.fillAndSignForm.controls.streetAddress.value,
      zipCode: this.fillAndSignForm.controls.zipCode.value,
      points: points,
      datePoints: this.datePoints,
    };

    let data = new FormsPostModel(fillForm);

    this.formsPageService.sendFormFill(data).subscribe(
      (result: FormsPageModel) => {
        this.onSubmitSuccess(result);
      },
      (error: CFError) => this.onSubmitError(error)
    );
  }

  onSubmitSuccess(result: FormsPageModel) {
    this.startTask = false;
    this.taskComplete = true;
    this.submitEvent.emit();
    this.submitting = false;
  }

  onSubmitError(error: CFError) {
    this.logger.error("Error submitting form on signature page:", error);
    if (error.name === "userInfoForm") {
      FormGroupHelper.setFormErrors(
        this.backendErrorKeysToFrontendFormMap,
        error.data.fields_errors,
        this.fillAndSignForm
      );
    }
    this.showErrors = true;
    this.submitting = false;
  }

  onDontProvideSSNFlagChange(value: boolean) {
    this.allowSubmit = !value;
  }

  get textColorClass(): string {
    if (this.model.incompleteForms.length <= 0) {
      return "completed";
    } else {
      return "";
    }
  }

  get submitBtnClass(): string {
    if (this.allowSubmit) {
      return "btn-global";
    } else {
      return "disabled";
    }
  }
}
