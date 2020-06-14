import { Directive, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Directive({
  selector: '[onRoutadeDisk]'
})
export class DiskDirective implements OnInit, OnDestroy {

  private deg: number = 0;
  private $interval: Observable<number>;
  private $intervalSub: Subscription;

  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private playerS: PlayerService
  ) { }

  ngOnInit(): void {
    this.animationRotateDelay(2000);
  }

  ngOnDestroy(): void {
    this.$intervalSub.unsubscribe();
  }

  rotate(): void {
    this.deg === 360 ? this.deg = 0 : this.deg += 1;
    this.r.setStyle(this.el.nativeElement, 'transform', `rotate(${this.deg}deg)`);
  }

  animationRotateDelay(delay: number): void {
    const setInterval = +(delay / 360).toFixed(2);

    this.$interval = interval(setInterval);

    this.$intervalSub = this.$interval.subscribe(res => {
      if (this.playerS.play) {
        this.rotate();
      }
    })
  }

}
