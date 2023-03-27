import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: "[yimcipeDropdownMenuController]",
    exportAs: "yimcipeDropdownMenuController",
    standalone: true
})

export class DropdownDirective {
  private wasInside = false;
  @HostBinding("class.show") isOpen = false;
  @HostListener('click')
  onClick(){
    this.isOpen = !this.isOpen;
    this.wasInside = true;
  }

  @HostListener("document:click") clickout() {
    if (!this.wasInside) {
      this.isOpen = false;
    }
    this.wasInside = false;
  }
}
