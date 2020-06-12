import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlayerService } from 'src/app/shared/services/player.service';
import { RadioService } from 'src/app/shared/services/radio.service';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-radio-filter',
  templateUrl: './radio-filter.component.html',
  styleUrls: ['./radio-filter.component.scss']
})
export class RadioFilterComponent implements OnInit {
  @Input() radios: any = [];
  @ViewChild('genreOptionAll') genreOptionAll: ElementRef;

  form: FormGroup;

  $country: Subscription

  constructor(
    public playerS: PlayerService,
    private radioS: RadioService,
    public loadS: LoaderService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      country: new FormControl(this.playerS.settings.defaultCountry),
      genre: new FormControl(this.playerS.settings.defaultGenre)
    });
    console.log(this.form.value);
    this.playerS.filterPlayerForm = this.form;
  }

  onChange(): void {
    this.loadS.dropMenu = true;
    this.playerS.radios = [];
    this.$country = this.radioS.getRadioSearch(this.form.value.country, this.form.value.genre, '').subscribe(res => {
      this.playerS.radios = res.results;
      this.loadS.dropMenu = false;
      this.$country.unsubscribe();
    }, err => console.log(err));
  }

  onGenre(): void {
    this.playerS.filterPlayerForm = this.form;
  }
}
