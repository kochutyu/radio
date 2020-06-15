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
  @Input() lightTheme: boolean;

  @ViewChild('genreOptionAll') genreOptionAll: ElementRef;

  $country: Subscription

  form: FormGroup;

  constructor(
    public playerS: PlayerService,
    private radioS: RadioService,
    public loadS: LoaderService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      country: new FormControl(this.playerS.onChangeCountry()),
      genre: new FormControl(this.playerS.settings.defaultGenre)
    });

    this.playerS.filterPlayerForm = this.form;
  }

  onCountry(): void {
    this.loadS.dropMenu = true;
    this.playerS.radios = [];
    this.$country = this.radioS.getRadioSearch(this.form.value.country, this.playerS.settings.defaultGenre, '').subscribe(res => {

      this.playerS.radios = res.results;
      this.playerS.radio = this.playerS.radios[0];
      this.onChangeSaveData();
      this.loadS.dropMenu = false;
      this.$country.unsubscribe();
    }, err => console.log(err));
  }

  onGenre(): void {
    this.onChangeSaveData();
    this.playerS.filterPlayerForm = this.form;
  }

  onDarkTheme(): void {
    this.playerS.changeTheme(false);
  }

  onLightTheme(): void {
    this.playerS.changeTheme(true);
  }

  onChangeSaveData(): void {
    sessionStorage.setItem('selected-country', JSON.stringify(this.form.value.country));
  }

}
