import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Subscription, interval } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { IPlayerRadioSearch } from 'src/app/shared/shared.interfaces';

@Component({
  selector: 'app-radio-filter',
  templateUrl: './radio-filter.component.html',
  styleUrls: ['./radio-filter.component.scss']
})
export class RadioFilterComponent implements OnInit, OnDestroy {

  @Input() radios: Array<IPlayerRadioSearch> = [];

  $country: Subscription
  $theme: Subscription;

  form: FormGroup;

  constructor(
    public playerS: PlayerService,
    public loadS: LoaderService,
    public themeS: ThemeService
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
    this.setStyleForRadioList();
  }

  onDarkTheme(): void {
    this.playerS.changeTheme(false);
    this.themeS.initTheme('dark');
  }

  onLightTheme(): void {
    this.playerS.changeTheme(true);
    this.themeS.initTheme('light');
  }

  searchRadio(value: string): void {
    this.playerS.searchRadio = value;
    this.setStyleForRadioList();
  }

  setStyleForRadioList(): void {
    this.$theme = interval(1).subscribe(res => {
      this.themeS.initTheme();
      this.$theme.unsubscribe();
    })
  }

}
