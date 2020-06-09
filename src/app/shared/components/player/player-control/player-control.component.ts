import { Component, OnInit } from '@angular/core';
import { faStop, faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
  
export class PlayerControlComponent implements OnInit {
  faPlay = faPlay;
  faStop = faStop;
  constructor() { }

  ngOnInit(): void {
  }

}
