import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { animations } from '../player.animation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations
})
export class NavbarComponent implements OnInit {

  constructor(
    public playerS: PlayerService
  ) { }

  ngOnInit(): void {
  }

}
