import { Component, OnInit } from '@angular/core';
import { faStop, faPlay } from '@fortawesome/free-solid-svg-icons';
import { animations } from '../player.animation';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss'],
  animations
})
  
export class PlayerControlComponent implements OnInit {
  faPlay = faPlay;
  faStop = faStop;
  constructor(
    public playerS: PlayerService
  ) { }

  ngOnInit(): void {
  }

}
