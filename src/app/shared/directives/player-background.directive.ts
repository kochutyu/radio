import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Directive({
  selector: '[playerBackground]'
})
export class PlayerBackgroundDirective implements OnInit, OnDestroy {

  private deg: number = 0;
  private $interval: Observable<number>;
  private $intervalSub: Subscription;

  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private playerS: PlayerService
  ) { }

  ngOnInit(): void {
    this.animateBackgroundColor();
  }

  ngOnDestroy(): void {
    this.$intervalSub.unsubscribe();
  }

  animateBackgroundColor(): void {
    this.r.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease-in')
    this.$interval = interval(500);
    this.$interval.subscribe(res => {

      const progress: string = this.playerS.animatePlayerGetListRadio;
      const lightTheme: boolean = this.playerS.lightTheme;

      if (lightTheme) {

        if (progress === 'stop') {
          this.r.setStyle(this.el.nativeElement, 'background-color', '#faf9f9');
        } else {
          this.r.setStyle(this.el.nativeElement, 'background-color', '#b2dbbf');
        }

      } else {

        if (progress === 'stop') {
          this.r.setStyle(this.el.nativeElement, 'background-color', '#111');
        } else {
          this.r.setStyle(this.el.nativeElement, 'background-color', '#fff');
        }

      }

    })
  }

}
