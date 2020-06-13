import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-light-mixer',
  templateUrl: './light-mixer.component.html',
  styleUrls: ['./light-mixer.component.scss']
})
export class LightMixerComponent implements OnInit {
  @Output() onValue: EventEmitter<string> = new EventEmitter<string>();

  // SETTINGS
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() value: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

  newValue(val: string): void {
    this.onValue.emit(val);
  }
}
