import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-dark-mixer',
  templateUrl: './dark-mixer.component.html',
  styleUrls: ['./dark-mixer.component.scss']
})
export class DarkMixerComponent implements OnInit {

  // *SETTINGS
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() value: number = 100;
  
  @Output() onValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  newValue(val:string): void{
    this.onValue.emit(val);
  }
}
