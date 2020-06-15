import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Directive({
  selector: '[dropMenu]'
})
export class DropMenuDirective implements OnInit, OnDestroy {

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

        this.r.setStyle(this.el.nativeElement, 'background-color', '#5c677d');
        // if (progress === 'stop') {
        // } else {
        //   this.r.setStyle(this.el.nativeElement, 'background-color', '#b2dbbf');
        // }

      } else {

        this.r.setStyle(this.el.nativeElement, 'background-color', '#111');
        // if (progress === 'stop') {
        // } else {
        //   this.r.setStyle(this.el.nativeElement, 'background-color', '#fff');
        // }

      }

    })
  }

}
