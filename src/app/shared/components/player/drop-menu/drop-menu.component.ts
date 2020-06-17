import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { animations } from '../player.animation';
import { PlayerService } from 'src/app/shared/services/player.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { IPlayerRadioSearch } from 'src/app/shared/shared.interfaces';

@Component({
  selector: 'app-drop-menu',
  templateUrl: './drop-menu.component.html',
  styleUrls: ['./drop-menu.component.scss'],
  animations: animations,
})
export class DropMenuComponent implements OnInit {

  @Input() radios: Array<IPlayerRadioSearch> = [];

  constructor(
    public playerS: PlayerService,
    public loadS: LoaderService
  ) { }

  ngOnInit(): void {
  }

}
