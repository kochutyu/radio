import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.scss']
})
export class RadioListComponent implements OnInit {
  @Input() radios: any = [];

  constructor(
    public playerS: PlayerService
  ) { }
  
  ngOnInit(): void {
  }
}
