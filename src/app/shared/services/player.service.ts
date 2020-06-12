import { Injectable, ElementRef } from '@angular/core';
import { IPlayerRadioSearch } from '../shared.interfaces';
import { Subscription, Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PlayerRadioSearch } from '../shares.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  animatePlayerGetListRadio: string = 'stop';

  radios: Array<IPlayerRadioSearch> = [];
  allRadios: Array<IPlayerRadioSearch> = [];

  play: boolean;
  error: boolean = false;
  radioInitStatus: boolean;

  radio: IPlayerRadioSearch = new PlayerRadioSearch();
  
  audio: ElementRef;
  dropMenu: ElementRef;
  
  $radios: Subscription;
  $radioInit: Subscription;
  $error: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  animatePlayer(): void {
    this.animatePlayerGetListRadio = this.animatePlayerGetListRadio === 'stop' ? 'animate' : 'stop';
  }

  selectRadio(radio: IPlayerRadioSearch): void {
    this.radio = radio;
    this.radioInit(radio);
    this.playOrStop(true);
    this.error = false;
    this.dropMenu.nativeElement.click();
  }

  playOrStopControl(play: boolean): void {
    this.play = this.play === true ? false : true;
    console.log(play);

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
    console.log('lol');
    const { streamURL } = this.radio;
    const { status, url } = error;
    
    this.$error.next('Oops, something was wrong.');

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
    console.log(JSON.parse(localStorage.getItem('radio-no-exist')));
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
