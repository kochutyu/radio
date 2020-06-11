import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radio-filter',
  templateUrl: './radio-filter.component.html',
  styleUrls: ['./radio-filter.component.scss']
})
export class RadioFilterComponent implements OnInit {
  @Input() radios: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
