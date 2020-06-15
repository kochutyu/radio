import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-light-mixer',
  templateUrl: './light-mixer.component.html',
  styleUrls: ['./light-mixer.component.scss']
})
export class LightMixerComponent implements OnInit {

  // SETTINGS
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() value: number = 100;

  @Output() onValue: EventEmitter<string> = new EventEmitter<string>();

  faVolumeUp: IconDefinition = faVolumeUp;

  constructor() { }

  ngOnInit(): void {
  }

  newValue(val: string): void {
    this.onValue.emit(val);
  }
}
