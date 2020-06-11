import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { animations } from '../player.animation';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-drop-menu',
  templateUrl: './drop-menu.component.html',
  styleUrls: ['./drop-menu.component.scss'],
  animations: animations,
})
export class DropMenuComponent implements OnInit {
  @Input() radios: any = [];
  
  constructor(
    public playerS: PlayerService
  ) {}

  ngOnInit(): void {    
  }
}
