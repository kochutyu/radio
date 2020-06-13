import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-dark-mixer',
  templateUrl: './dark-mixer.component.html',
  styleUrls: ['./dark-mixer.component.scss']
})
export class DarkMixerComponent implements OnInit {
  @Output() onValue: EventEmitter<string> = new EventEmitter<string>();

  // SETTINGS
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() value: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

  newValue(val:string): void{
    this.onValue.emit(val);
  }
}
