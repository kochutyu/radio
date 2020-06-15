import { Injectable } from '@angular/core';
import { IPlayerRadioGenre, IPlayerRadioNowPlaying, IPlayerRadioCountry, IPlayerRadioSearch } from '../shared.interfaces';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RADIO_API } from 'src/environments/set-environments';

const headers = {
  "x-rapidapi-host": RADIO_API.host,
  "x-rapidapi-key": RADIO_API.apiKey,
};

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  API_URL: string = 'https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi';

  constructor(
    private http: HttpClient,
  ) { }

  getRadioSearch(country: string, genre: string = "ALL", keyword: string = ""): Observable<any> {
    return this.http
      .get(
        `${this.API_URL}?country=${country}&keyword=${keyword}&genre=${genre}`, {
        headers,
      }
      )
      .pipe(
        map((data: any) => {
          let newData: Array<IPlayerRadioSearch> = this.converObjectForRadio(data, this.convertToIPlayerRadioSearch);
          newData = newData.filter(radio => radio.streamURL.includes('https'));
          return {
            results: newData
          };
        })
      );
  }

  getCountriesList(): Observable<any> {
    return this.http
      .get(
        `${this.API_URL}?countries=`, {
        headers,
      }
      )
      .pipe(
        map((data: any) => {
          return {
            results: this.converObjectForRadio(data, this.convertToIPlayerRadioCountry)
          };
        })
      );
  }

  getMusicGenresList(): Observable<any> {
    return this.http.get(
      `${this.API_URL}?categories=1`, {
      headers,
    }
    )
      .pipe(
        map((data: any) => {
          return {
            results: this.converObjectForRadio(data, this.convertToIPlayerRadioGenre)
          };
        })
      );
  }

  converObjectForRadio(data: any, method: any): any {
    const allObj: any = data.results;
    const results: Array<IPlayerRadioSearch | IPlayerRadioCountry | IPlayerRadioGenre> = [];
    for (const obj of allObj)
      results.push(method(obj));
    return results;
  }

  convertToIPlayerRadioSearch(data: any): IPlayerRadioSearch {
    return {
      radioID: data.i,
      ganreID: data.d,
      radioName: data.n,
      country_2_letterCode: data.c,
      genreName: data.g,
      streamURL: data.u,
      logoImg: data.l,
    }
  }

  convertToIPlayerRadioCountry(data: any): IPlayerRadioCountry {
    return {
      country_2_letterCode: data.code,
      name: data.name,
    };
  }

  convertToIPlayerRadioGenre(data: any): IPlayerRadioGenre {
    return {
      genreID: data.i,
      genreName: data.c,
    };
  }

}