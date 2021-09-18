import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-weather',
  templateUrl: './weather.component.html',
})
export class WeatherComponent {
  weather!: any;
  constructor(private ref: ChangeDetectorRef) {}
  @Input() set data(weather: any) {
    (this.weather = { ...weather }), this.ref.detectChanges();
  }
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
}
