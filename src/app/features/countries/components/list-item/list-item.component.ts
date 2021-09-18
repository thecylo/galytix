import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Country } from '../../model/countries';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
})
export class ListItemComponent implements OnInit {
  @Input() country: Country = {} as Country;
  constructor() {}

  ngOnInit(): void {}
}
