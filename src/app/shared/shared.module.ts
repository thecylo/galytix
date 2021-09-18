import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from '@sharedComponents';
import { DialogComponent } from './components/dialog/dialog.component';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';

@NgModule({
  declarations: [PagerComponent, DialogComponent, ClickOutsideDirective],
  imports: [CommonModule],
  exports: [PagerComponent, DialogComponent, ClickOutsideDirective],
})
export class SharedModule {}
