import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy } from '@angular/core';
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
export class RadioFilterComponent implements OnInit, OnDestroy {

  @Input() radios: any = [];
  @Input() lightTheme: boolean;

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

  ngOnDestroy(): void {
    this.$country.unsubscribe();
  }

  onCountry(): void {
    this.loadS.dropMenu = true;
    this.playerS.radios = [];
    this.$country = this.radioS.getRadioSearch(this.form.value.country, this.playerS.settings.defaultGenre, '').subscribe(res => {

      this.playerS.radios = res.results;
      this.playerS.firstPlay = true;
      this.loadS.dropMenu = false;
    }, err => console.log(err));
  }

  onGenre(): void {
    this.playerS.filterPlayerForm = this.form;
  }

  onDarkTheme(): void {
    this.playerS.changeTheme(false);
  }

  onLightTheme(): void {
    this.playerS.changeTheme(true);
  }

  searchRadio(value: string): void {
    this.playerS.searchRadio = value;
  }

}
