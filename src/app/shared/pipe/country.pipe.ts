import { Pipe, PipeTransform } from '@angular/core';
import { IPlayerRadioSearch } from '../shared.interfaces';
import { PlayerService } from '../services/player.service';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  constructor(
    private playerS: PlayerService
  ) { }

  transform(arr: Array<IPlayerRadioSearch>, country: string): Array<IPlayerRadioSearch> {
    if (country === this.playerS.settings.defaultCountry) {
      return arr
    }
    return arr.filter(radio => radio.country_2_letterCode.toLocaleUpperCase() === country.toLocaleUpperCase());
  }

}
