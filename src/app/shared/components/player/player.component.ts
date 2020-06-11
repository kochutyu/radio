import { Component, OnInit } from '@angular/core';
import { animations } from './player.animation';
import { PlayerService } from '../../services/player.service';
import { RadioService } from '../../services/radio.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations
})
export class PlayerComponent implements OnInit {
  radios: any = [];
  constructor(
    public playerS: PlayerService,
    private radioS: RadioService
  ) { }

  ngOnInit(): void {
    this.radioS.getNowPlaying().subscribe(res => {
      this.radios = res.results;
      console.log(this.radios);
      
    });
  }

}
