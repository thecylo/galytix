import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Country } from '../../model/countries';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  listData: Country[] = new Array<Country>();

  countriesData: Country[] = new Array<Country>();

  checkBoxTxt: 'boxes' | 'list' = 'boxes';

  checkboxValue: boolean = false;

  @Input() set countries(data: Country[]) {
    this.countriesData = [...data];
  }
  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  test(evnt: MouseEvent) {
    console.warn('test');
  }

  newData(data: any[]): void {
    console.warn(data);
    this.listData = [...data];
    this.ref.detectChanges();
  }

  typeChange(evnt: any): void {
    const checked = evnt.target.checked;
    checked ? (this.checkBoxTxt = 'boxes') : (this.checkBoxTxt = 'list');
    this.checkboxValue = checked;
  }

  sort(asc: boolean) {
    switch (asc) {
      case true: {
        this.listData.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        });
        break;
      }
      case false: {
        this.listData.sort((a, b) => {
          return a.name > b.name ? -1 : 1;
        });
        break;
      }
      default: {
        break;
      }
    }
  }
}
