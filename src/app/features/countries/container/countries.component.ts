import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../service/countries.service';
import { first } from 'rxjs/operators';
import { Country } from '../model/countries';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
})
export class CountriesComponent implements OnInit {
  countries: Country[] = new Array<Country>();
  constructor(private service: CountriesService) {}

  ngOnInit(): void {
    this.service
      .getCountries()
      .pipe(first())
      .subscribe({
        next: (resp) => {
          resp &&
            (this.countries = [
              ...resp.map(
                (x) =>
                  new Country(x.name, x.nativeName, x.capital, x.flag, x.region)
              ),
            ]);
        },
        error: (err) => console.error(err),
        complete: () => console.warn(this.countries),
      });
  }
}
