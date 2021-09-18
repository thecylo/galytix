import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Country } from '../model/countries';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.countriesUrl);
  }

  getWeatherByCity(city: string): Observable<any> {
    return this.http.get<any>(
      `${environment.weatherUrl}${city}&APPID=${environment.APIKey}&units=metric`
    );
  }
}
