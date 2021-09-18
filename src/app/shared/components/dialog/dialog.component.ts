import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-dialog',
  template: `
    <div
      class="dialog fixed bottom-0 p-4 pb-4 inset-0 flex items-center justify-center"
      role="dialog"
      *ngIf="visible"
      (click)="close(true)"
      @fade
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      </div>
      <div
        class="bg-white rounded overflow-hidden shadow-xl transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="dialog-body" (click)="$event.stopPropagation()">
          <ng-container *ngTemplateOutlet="body"></ng-container>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(150, style({ opacity: 1 })),
      ]),
      transition('* => void', [animate(150, style({ opacity: 0 }))]),
    ]),
  ],
})
export class DialogComponent implements OnDestroy {
  /**
   * Reference to body
   */
  @ContentChild('dialogBody') body!: TemplateRef<any>;

  /**
   * Click outside setter
   */
  @Input() clickOutside: boolean = true;

  /**
   * Close event emiter
   */
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Visibility
   */
  visible: boolean = false;

  /**
   * Element reference & change detector
   * @param elementRef reference to DOM
   * @param changeDetectorRef change detector
   */
  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * Close on destroy
   */
  ngOnDestroy() {
    this.close();
  }

  /**
   * Open dialog
   */
  open(): void {
    this.visible = true;
  }

  /**
   * Close dialog
   * @param fromOutside Close on click outside
   */
  close(fromOutside = false): void {
    if (fromOutside && !this.clickOutside) {
      return;
    }
    this.visible = false;
    this.changeDetectorRef.markForCheck();
    setTimeout(() => this.closeEvent.emit(), 150);
  }

  /**
   * Close on escape
   * @param event key pressed
   */
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isTop()) {
      this.close();
    }
  }

  /**
   * Check if dialog is on top layer of elements
   * @returns true or false
   */
  isTop(): boolean {
    return !this.elementRef.nativeElement.querySelector(
      ':scope dialog > .dialog'
    );
  }
}
