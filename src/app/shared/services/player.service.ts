import { Injectable, ElementRef } from '@angular/core';
import { IPlayerRadioSearch, IPlayerRadioCountry, IPlayerRadioGenre, ISettings } from '../shared.interfaces';
import { Subscription, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PlayerRadioSearch, Settings } from '../shares.model';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export let THEME = {
  bgColor: '#111'
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  settings: ISettings = new Settings('UA', 'ALL');
  radio: IPlayerRadioSearch = new PlayerRadioSearch();

  animatePlayerGetListRadio: string = 'stop';
  bgColor: string = 'dark';
  searchRadio: string = '';

  radios: Array<IPlayerRadioSearch> = [];
  country: Array<IPlayerRadioCountry> = [];
  genre: Array<IPlayerRadioGenre> = [];

  play: boolean;
  firstPlay: boolean;
  radioInitStatus: boolean;
  lightTheme: boolean = false;

  audio: ElementRef;
  dropMenu: ElementRef;

  $radios: Subscription;
  $radioInit: Subscription;

  filterPlayerForm: FormGroup;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  changeTheme(lightTheme: boolean): void {
    this.lightTheme = lightTheme;
  }

  animatePlayer(): void {
    this.animatePlayerGetListRadio = this.animatePlayerGetListRadio === 'stop' ? 'animate' : 'stop';
  }

  selectRadio(radio: IPlayerRadioSearch): void {
    this.radio = radio;
    this.radioInit(radio);
    this.play = true;
    this.dropMenu.nativeElement.click();
  }

  playOrStopControl(play: boolean): void {
    this.play = this.play === true ? false : true;

    if (this.play) {
      this.audio.nativeElement.play();
    } else {
      this.audio.nativeElement.pause();
    }
  }

  playOrStop(play: boolean = false): void {
    if (!this.firstPlay) {
      this.radio = this.radios[0];
      this.radioInit(this.radio);
      this.firstPlay = true;
    }
    this.playOrStopControl(play);
  }

  backwardRadio(): void {
    this.radio = this.getCurentRadioIndex() > 0 ? this.radios[this.getCurentRadioIndex() - 1] : this.radios[this.radios.length - 1];
    this.radioInit(this.radio);
    this.play = true;
  }

  forwardRadio(): void {
    this.radio = this.getCurentRadioIndex() < this.radios.length - 1 ? this.radios[this.getCurentRadioIndex() + 1] : this.radios[0];
    this.radioInit(this.radio);
    this.play = true;
  }

  getCurentRadioIndex(): number {
    if (this.radioInitStatus) {
      return this.radios.findIndex(radio => radio.radioID === this.radio.radioID);
    }
    return -1;
  }

  radioInit(radio: IPlayerRadioSearch): void {
    this.radioInitStatus ? this.$radioInit.unsubscribe() : this.radioInitStatus = true;
    this.radio = radio;

    const req = this.http.get(radio.streamURL).pipe(
      catchError(this.handleError.bind(this))
    )

    this.$radioInit = req.subscribe(res => {
    }, err => {
      this.$radioInit.unsubscribe();
    });
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    this.toastr.error('There was a problem requesting the server where the radio is located.', 'Oops, something was wrong!');
    return throwError(error)
  }

  saveRadioWichNoExist(url: string): void {
    if (localStorage.getItem('radio-no-exist')) {
      const radiosNoExist: Array<string> = JSON.parse(localStorage.getItem('radio-no-exist'));
      radiosNoExist.push(url)
      localStorage.setItem('radio-no-exist', JSON.stringify(radiosNoExist));
    } else {
      const radiosNoExist = [];
      radiosNoExist.push(url);
      localStorage.setItem('radio-no-exist', JSON.stringify(radiosNoExist));
    }
  }

  filterRadioFromRadioWichNoExist(): void {
    if (localStorage.getItem('radio-no-exist')) {
      const radiosNoExist = JSON.parse(localStorage.getItem('radio-no-exist'));
      for (const radioURL of radiosNoExist) {
        this.radios = this.radios.filter(radio => radio.streamURL !== radioURL);
      }
    }
  }

  onChangeCountry(): string {
    return sessionStorage.getItem('selected-country') !== null ? JSON.parse(sessionStorage.getItem('selected-country')) : this.settings.defaultCountry;
  }

}
