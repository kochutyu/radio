import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { animations } from '../player.animation';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: animations
})
export class NavbarComponent implements OnInit {

  @ViewChild('dropMenu', { static: true }) dropMenu: ElementRef;

  constructor(
    public playerS: PlayerService,
    private themeS: ThemeService
  ) { }

  ngOnInit(): void {
    this.playerS.dropMenu = this.dropMenu;
  }

  animatePlayer(): void {
    this.playerS.animatePlayer();
    this.themeS.initTheme();
  }

}
