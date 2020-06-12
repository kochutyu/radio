import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { animations } from './player.animation';
import { PlayerService } from '../../services/player.service';
import { RadioService } from '../../services/radio.service';
import { Subscription, forkJoin } from 'rxjs';

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
    private radioS: RadioService
  ) { }

  ngOnInit(): void {
    this.initRadio();
  }

  ngOnDestroy(): void {
    this.$radios.unsubscribe();
  }

  getRadios(): void {
    this.$radios = forkJoin([
      this.radioS.getRadioSearch('UA'),
      this.radioS.getCountriesList(),
      this.radioS.getMusicGenresList(),
    ]).subscribe(res => {
      this.playerS.radios = res[0].results;
      this.playerS.country = res[1].results;
      this.playerS.genre = res[2].results;
      this.$radios.unsubscribe();
    });
  }

  initRadio(): void{
    this.playerS.audio = this.audio;
    this.getRadios();
  }

}
