import { Component, OnInit, Input } from '@angular/core';
import { faStop, faPlay, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { animations } from '../player.animation';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss'],
  animations: animations
})
export class PlayerControlComponent implements OnInit {

  @Input() lightTheme: boolean;

  faPlay: IconDefinition = faPlay;
  faStop: IconDefinition = faStop;

  constructor(
    public playerS: PlayerService
  ) { }

  ngOnInit(): void {
  }

}
