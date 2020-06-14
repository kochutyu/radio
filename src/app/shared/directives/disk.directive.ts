import { Directive, Renderer2, ElementRef } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Directive({
  selector: '[onRoutadeDisk]'
})
export class DiskDirective {

  private deg: number = 0;
  private $interval: Observable<number>;

  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private playerS: PlayerService
  ) {
    this.animationRotateDelay(2000);
  }

  rotate(): void {
    this.deg === 360 ? this.deg = 0 : this.deg += 1;
    this.r.setStyle(this.el.nativeElement, 'transform', `rotate(${this.deg}deg)`);
  }

  animationRotateDelay(delay: number): void {
    const setInterval = +(delay / 360).toFixed(2);

    this.$interval = interval(setInterval);

    this.$interval.subscribe(res => {
      if (this.playerS.play) {
        this.rotate();
      }
    })
  }

}
