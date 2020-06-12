import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlayerService } from 'src/app/shared/services/player.service';
import { RadioService } from 'src/app/shared/services/radio.service';

@Component({
  selector: 'app-radio-filter',
  templateUrl: './radio-filter.component.html',
  styleUrls: ['./radio-filter.component.scss']
})
export class RadioFilterComponent implements OnInit {
  @Input() radios: any = [];
  @ViewChild('genreOptionAll') genreOptionAll: ElementRef;

  form: FormGroup;

  constructor(
    public playerS: PlayerService,
    private radioS: RadioService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      country: new FormControl('UA'),
      genre: new FormControl('ALL')
    });
    console.log(this.form.value);
    // this.playerS.playerFilter = this.form;

  }

  onChange(): void {
    console.log(this.form.value.country);
    console.log(this.form.value.genre);
    // this.playerS.genre = this.form.value.genre;

    this.radioS.getRadioSearch(this.form.value.country, this.form.value.genre, '').subscribe(res => {
      // console.log(res.results);
      this.playerS.radios = res.results;

    }, err => console.log(err));
  }
}
