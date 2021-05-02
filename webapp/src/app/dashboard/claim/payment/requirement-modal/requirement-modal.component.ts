import { Component, Renderer2, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-requirement-modal",
  templateUrl: "./requirement-modal.component.html",
  styleUrls: ["./requirement-modal.component.scss"],
})
export class RequirementModalComponent {
  showModal: boolean = true;
  @ViewChild("modaloutside", { static: false }) modal: ElementRef;
  constructor(private route: Router) {}

  ngOnInit() {}

  clickedOk() {
    this.showModal = false;
  }
  clickedExit() {
    this.showModal = false;
  }
  clickedOutside(event: Event) {
    if (event.target === this.modal.nativeElement) {
      this.showModal = false;
    }
  }
  hideModal() {
    this.showModal = false;
  }
}
