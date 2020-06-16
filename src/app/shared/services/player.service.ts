import { Injectable, ElementRef } from '@angular/core';
import { IPlayerRadioSearch, IPlayerRadioCountry, IPlayerRadioGenre, ISettings } from '../shared.interfaces';
import { Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  settings: ISettings = new Settings('ALL', 'ALL');
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
  lightTheme: boolean;

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
    this.initSelectedRadio(radio);
    this.dropMenu.nativeElement.click();
  }

  playOrStopControl(): void {
    this.play = !this.play;

    this.play
      ? this.audio.nativeElement.play()
      : this.audio.nativeElement.pause();
  }

  playOrStop(): void {

    if (this.radios.length === 0) {

      if (this.radio.radioID !== '') {
        this.playOrStopControl();
      } else if (this.radio.radioID === '' && !this.play) {
        this.messageEmptyRadioList();
      }

    } else if (!this.firstPlay) {
      this.firstPlay = true;
      this.initSelectedRadio(this.radios[0], false);
      this.playOrStopControl();
    } else {
      this.playOrStopControl();
    }

  }

  initSelectedRadio(radio: IPlayerRadioSearch, play: boolean = true): void {
    this.radio = radio;
    this.radioInit(radio);

    if (play) {
      this.play = true;
    }
  }

  checkedLeftArrow(): IPlayerRadioSearch {
    return this.getCurentRadioIndex() > 0 ?
      this.radios[this.getCurentRadioIndex() - 1]
      : this.radios[this.radios.length - 1];
  }

  checkedRightArrow(): IPlayerRadioSearch {
    return this.getCurentRadioIndex() < this.radios.length - 1
      ? this.radios[this.getCurentRadioIndex() + 1]
      : this.radios[0];
  }

  backwardRadio(): void {
    this.radios.length > 0
      ? this.initSelectedRadio(this.checkedLeftArrow())
      : this.messageEmptyRadioList()
  }

  forwardRadio(): void {
    this.radios.length > 0
      ? this.initSelectedRadio(this.checkedRightArrow())
      : this.messageEmptyRadioList()
  }

  messageEmptyRadioList(): void {
    this.toastr.info('Please choose another country!', 'Radios list is empty.');
  }

  getCurentRadioIndex(): number {
    if (this.radioInitStatus) {
      return this.radios.findIndex(radio => radio.radioID === this.radio.radioID);
    }
    return -1;
  }

  radioInit(radio: IPlayerRadioSearch): void {
    this.radio = radio;

    this.fetch(radio.streamURL)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleError(error: HttpErrorResponse): void {
    const { status } = error;

    if (status !== 200) {
      this.toastr.error(`ERROR ${status}`, 'Oops 😯, something was wrong!');
    }

  }

  onChangeCountry(): string {
    return sessionStorage.getItem('selected-country')
      ? JSON.parse(sessionStorage.getItem('selected-country'))
      : this.settings.defaultCountry;
  }

  getTrueGenre(): void {
    this.genre = this.genre.filter(genre => this.radios.some(radio => genre.genreName.toLocaleLowerCase() === radio.genreName.toLocaleLowerCase()));
  }

  getTrueCountry(): void {
    this.country = this.country.filter(radio => this.radios.some(country => radio.country_2_letterCode.toLocaleLowerCase() === country.country_2_letterCode.toLocaleLowerCase()));
  }

  volume(val: string): void {
    const volume = +val / 100
    this.audio.nativeElement.volume = volume;
  }

  fetch(url): Promise<Response> {
    return fetch(url)
  }

}
