import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener, ViewChildren, QueryList, AfterViewInit, Renderer2 } from '@angular/core';
import { animations } from './player.animation';
import { PlayerService } from '../../services/player.service';
import { RadioService } from '../../services/radio.service';
import { Subscription, forkJoin } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { faVolumeUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';
import { IPlayerRadioSearch } from '../../shared.interfaces';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: animations
})
export class PlayerComponent implements OnInit, OnDestroy, AfterViewInit {

  faVolumeUp: IconDefinition = faVolumeUp;

  radios: Array<IPlayerRadioSearch> = [];

  $radios: Subscription;

  @ViewChild('audio', { static: true }) audio: ElementRef;
  @ViewChildren("player", { read: ElementRef }) player: QueryList<ElementRef>

  constructor(
    public playerS: PlayerService,
    private radioS: RadioService,
    public loadS: LoaderService,
    public themeS: ThemeService
  ) { }

  ngOnInit(): void {
    this.initRadio();
  }

  ngAfterViewInit(): void {
    this.themeS.player = this.player;
    this.themeS.initTheme();
  }

  ngOnDestroy(): void {
    this.$radios.unsubscribe();
  }

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {

    if (event.key === ' ') {
      this.playerS.playOrStop();
    }

    if (event.key === 'ArrowRight') {
      this.playerS.forwardRadio();
    }

    if (event.key === 'ArrowLeft') {
      this.playerS.backwardRadio();
    }

    if (event.key === 'Escape') {
      this.playerS.dropMenu.nativeElement.click();
    }

    if (event.key === '2') {
      this.themeS.initTheme();
    }

  }

  getRadios(): void {
    this.loadS.player = true;
    this.$radios = forkJoin([
      this.radioS.getRadioSearch(this.playerS.onChangeCountry()),
      this.radioS.getCountriesList(),
      this.radioS.getMusicGenresList(),
    ]).subscribe(res => {

      this.playerS.radios = res[0].results;
      this.playerS.country = res[1].results;
      this.playerS.genre = res[2].results;

      this.playerS.getTrueCountry();
      this.playerS.getTrueGenre();

      this.loadS.player = false;
    });
  }

  initRadio(): void {
    this.playerS.audio = this.audio;
    this.getRadios();
  }

}
