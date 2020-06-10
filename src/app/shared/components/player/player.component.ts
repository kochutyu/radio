import { Component, OnInit } from '@angular/core';
import { animations } from './player.animation';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations
})
export class PlayerComponent implements OnInit {
  
  constructor(
    public playerS: PlayerService
  ) { }

  ngOnInit(): void {
  }

}
