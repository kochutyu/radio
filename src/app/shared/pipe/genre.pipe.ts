import { Pipe, PipeTransform } from '@angular/core';
import { IPlayerRadioSearch } from '../shared.interfaces';
import { PlayerService } from '../services/player.service';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  constructor(
    private playerS: PlayerService
  ) {
    
  }

  transform(arr: Array<IPlayerRadioSearch>, genre: string = this.playerS.filterPlayerForm.value.genre): Array<IPlayerRadioSearch> {
    if (genre === this.playerS.settings.defaultGenre) {
      return  arr
    }
    return arr.filter(radio => radio.genreName.toLocaleUpperCase() === genre.toLocaleUpperCase());
  }

}
