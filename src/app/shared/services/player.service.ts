import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  animatePlayerGetListRadio: string = 'stop';

  constructor() { }

  animatePlayer(): void {
    this.animatePlayerGetListRadio = this.animatePlayerGetListRadio === 'stop' ? 'animate' : 'stop';
    console.log(this.animatePlayerGetListRadio);
    
  }
}
