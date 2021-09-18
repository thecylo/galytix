import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() public clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }

  constructor(private elRef: ElementRef) {}
}
