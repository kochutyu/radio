import { Pipe, PipeTransform } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { IPlayerRadioSearch } from '../shared.interfaces';

@Pipe({
  name: 'searchRadio'
})
export class SearchRadioPipe implements PipeTransform {

  constructor(
    private playerS: PlayerService
  ) { }

  transform(arr: Array<IPlayerRadioSearch>, search: string = this.playerS.searchRadio): any {
    if (search.trim() === '') {
      return arr
    }
    return arr.filter(radio => radio.radioName.toLocaleUpperCase().includes(search.toLocaleUpperCase()));
  }

}
