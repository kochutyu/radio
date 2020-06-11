import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.scss']
})
export class RadioListComponent implements OnInit {
  @Input() radios: any = [];

  constructor() { }
  
  ngOnInit(): void {
  }
}
