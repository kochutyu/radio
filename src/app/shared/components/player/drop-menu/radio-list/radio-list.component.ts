import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.scss']
})
export class RadioListComponent implements OnInit {
  
  @Input() radios: any = [];
  @Input() lightTheme: boolean;

  constructor(
    public playerS: PlayerService,
    public loadS: LoaderService
  ) { }
  
  ngOnInit(): void {
  }

}
