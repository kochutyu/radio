import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlayerService } from 'src/app/shared/services/player.service';
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

  onChange(): void {
    this.playerS.filterPlayerForm = this.form;
    console.log(this.form.value.country);

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
