import { Component, OnInit } from '@angular/core';
import { CoreService } from '../service/core.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
})
export class CoreComponent implements OnInit {
  constructor(private service: CoreService) {}

  ngOnInit(): void {
    this.service.getCountries().subscribe(console.warn);
  }
}
