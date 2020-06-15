import { Directive, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Directive({
  selector: '[radioName]'
})
export class RadioNameDirective implements OnInit, OnDestroy {

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
          this.r.setStyle(this.el.nativeElement, 'color', '#111');
        } else {
          this.r.setStyle(this.el.nativeElement, 'color', '#111');
        }

      } else {

        if (progress === 'stop') {
          this.r.setStyle(this.el.nativeElement, 'color', '#fff');
        } else {
          this.r.setStyle(this.el.nativeElement, 'color', '#111');
        }

      }

    })
  }

}
