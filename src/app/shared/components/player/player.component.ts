import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { animations } from './player.animation';
import { PlayerService } from '../../services/player.service';
import { RadioService } from '../../services/radio.service';
import { Subscription } from 'rxjs';

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
    this.$radios = this.radioS.getRadioSearch().subscribe(res => {
      this.playerS.radios = res.results;

      console.log(this.playerS.radios);
    }, err => console.log(err), () => console.log('unsubscribe'));
  }

  initRadio(): void{
    this.playerS.audio = this.audio;
    this.getRadios();
  }

}
