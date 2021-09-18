import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './container/countries.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoxItemComponent } from './components/box-item/box-item.component';

@NgModule({
  declarations: [
    CountriesComponent,
    ListComponent,
    ListItemComponent,
    BoxItemComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [ListComponent],
})
export class CountriesModule {}
