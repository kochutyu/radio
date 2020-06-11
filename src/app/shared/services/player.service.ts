import { Injectable, ElementRef } from '@angular/core';
import { IPlayerRadioNowPlaying, IPlayerRadioSearch } from '../interfaces';
import { RadioService } from './radio.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  animatePlayerGetListRadio: string = 'stop';
  radios: Array<IPlayerRadioSearch | IPlayerRadioNowPlaying> = [];
  radio: IPlayerRadioSearch | IPlayerRadioNowPlaying;
  play: boolean;
  audio: ElementRef;
  $radios: Subscription;

  constructor(
    private radioS: RadioService
  ) { }

  animatePlayer(): void {
    this.animatePlayerGetListRadio = this.animatePlayerGetListRadio === 'stop' ? 'animate' : 'stop';
  }

  selectRadio(radio: IPlayerRadioSearch | IPlayerRadioNowPlaying): void {
    this.radio = radio;
    this.radioS
  }

  playOrStopControl(): void{
    this.play = this.play === true ? false : true;
    if (this.radio) {
      this.play === true ? this.audio.nativeElement.play() : this.audio.nativeElement.pause();
    }
  }

  playOrStop(): void {
    if (this.radio) {
      this.playOrStopControl();
    } else {
      this.radio = this.radios[0];
      this.playOrStopControl();
    }
  }

  backwardRadio(): void {
    if (this.radio) {
      this.radio = this.getCurentRadioIndex() > 0 ? this.radios[this.getCurentRadioIndex() - 1] : this.radios[this.radios.length - 1];
    }
  }

  forwardRadio(): void {
    console.log('next');
    if (this.radio) {
      this.radio = this.getCurentRadioIndex() < this.radios.length ? this.radios[this.getCurentRadioIndex() + 1] : this.radios[0];
    }
  }

  getCurentRadioIndex(): number {
    if (this.radio) {
      return this.radios.findIndex(radio => radio.radioID === this.radio.radioID);
    }
    return -1;
  }

}
