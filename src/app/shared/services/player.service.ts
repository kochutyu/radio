import { Injectable, ElementRef } from '@angular/core';
import { IPlayerRadioSearch, IPlayerRadioCountry, IPlayerRadioGenre, ISettings } from '../shared.interfaces';
import { Subscription, Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PlayerRadioSearch, Settings } from '../shares.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  settings:ISettings = new Settings('UA', 'ALL');

  animatePlayerGetListRadio: string = 'stop';

  radios: Array<IPlayerRadioSearch> = [];
  country: Array<IPlayerRadioCountry> = [];
  genre: Array<IPlayerRadioGenre> = [];

  play: boolean;
  error: boolean;
  radioInitStatus: boolean;
  lightTheme: boolean;

  radio: IPlayerRadioSearch = new PlayerRadioSearch();
  
  audio: ElementRef;
  dropMenu: ElementRef;
  
  $radios: Subscription;
  $radioInit: Subscription;
  $error: string;

  filterPlayerForm: FormGroup;

  constructor(
    private http: HttpClient
  ) { }

  animatePlayer(): void {
    this.animatePlayerGetListRadio = this.animatePlayerGetListRadio === 'stop' ? 'animate' : 'stop';
  }

  selectRadio(radio: IPlayerRadioSearch): void {
    this.radio = radio;
    this.radioInit(radio);
    this.play = true;
    this.error = false;
    this.dropMenu.nativeElement.click();
  }

  playOrStopControl(play: boolean): void {
    this.play = this.play === true ? false : true;

    if (this.play) {
      this.audio.nativeElement.play();
      this.radioInit(this.radio);
    } else {
      this.$radioInit.unsubscribe()
      this.audio.nativeElement.pause();
    }
  }

  playOrStop(play: boolean = false): void {
    if (this.radio) {
      this.playOrStopControl(play);
    } else {
      this.radio = this.radios[0];
      this.playOrStopControl(play);
    }
  }

  backwardRadio(): void {
    this.radio = this.getCurentRadioIndex() > 0 ? this.radios[this.getCurentRadioIndex() - 1] : this.radios[this.radios.length - 1];
    this.radioInit(this.radio);
    this.play = true;
    this.error = false;
  }

  forwardRadio(): void {
    this.radio = this.getCurentRadioIndex() < this.radios.length - 1 ? this.radios[this.getCurentRadioIndex() + 1] : this.radios[0];
    this.radioInit(this.radio);
    this.play = true;
    this.error = false;
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
    this.$error = 'Oops, something was wrong.';
    this.error = true;
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

}
