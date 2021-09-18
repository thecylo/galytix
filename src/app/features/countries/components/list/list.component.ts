import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { DialogComponent } from '@sharedComponents';
import { Country } from '../../model/countries';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  @ViewChild('multipleDelete') weatherDialog!: DialogComponent;

  listData: Country[] = new Array<Country>();

  countriesData: Country[] = new Array<Country>();

  checkboxValue: boolean = false;

  weatherData!: any;

  @Input() set countries(data: Country[]) {
    this.countriesData = [...data];
  }

  @Input() set weather(weather: any) {
    this.weatherData = { ...weather };
  }

  @Output() selectedCountry: EventEmitter<string> = new EventEmitter<string>();

  constructor(private ref: ChangeDetectorRef) {}

  newData(data: any[]): void {
    this.listData = [...data];
    this.ref.detectChanges();
  }

  typeChange(evnt: any): void {
    const checked = evnt.target.checked;
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
