import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { animations } from './player.animation';
import { PlayerService } from '../../services/player.service';
import { RadioService } from '../../services/radio.service';
import { Subscription, forkJoin } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: animations
})
export class PlayerComponent implements OnInit, OnDestroy {

  radios: any = [];

  $radios: Subscription;

  @ViewChild('audio', { static: true }) audio: ElementRef;

  constructor(
    public playerS: PlayerService,
    private radioS: RadioService,
    public loadS: LoaderService
  ) { }

  ngOnInit(): void {
    this.initRadio();
  }

  ngOnDestroy(): void {
    this.$radios.unsubscribe();
  }

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {

    if (event.key === ' ') {
      this.playerS.playOrStop();
    }

    if (event.key === 'ArrowRight') {
      this.playerS.forwardRadio();
    }

    if (event.key === 'ArrowLeft') {
      this.playerS.backwardRadio();
    }

    if (event.key === 'Escape') {
      this.playerS.dropMenu.nativeElement.click();
    }

  }

  getRadios(): void {
    this.loadS.player = true;
    this.$radios = forkJoin([
      this.radioS.getRadioSearch(this.playerS.onChangeCountry()),
      this.radioS.getCountriesList(),
      this.radioS.getMusicGenresList(),
    ]).subscribe(res => {

      this.playerS.radios = res[0].results;
      this.playerS.country = res[1].results;
      this.playerS.genre = res[2].results;
      this.playerS.radio = this.playerS.radios[0];
      this.loadS.player = false;
      this.$radios.unsubscribe();
    });
  }

  initRadio(): void {
    this.playerS.audio = this.audio;
    this.getRadios();
  }

  volume(val: string): void {
    const volume = +val / 100
    this.audio.nativeElement.volume = volume;
  }

}
