import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Country } from '../../model/countries';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-box-item',
  templateUrl: './box-item.component.html',
})
export class BoxItemComponent implements OnInit {
  @Input() country: Country = {} as Country;

  constructor() {}

  ngOnInit(): void {}
}
