import { Injectable, ViewChildren, ElementRef, QueryList, Renderer2, RendererFactory2, HostListener } from '@angular/core';
import { PlayerService } from './player.service';

const colorsForLightTheme = {

}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  registerTheme: { [key: string]: boolean } = {
    light: false,
    dark: false
  }

  selectedTheme: Array<boolean> = []

  player: QueryList<ElementRef>;

  private _renderer: Renderer2;
  ChangeBgColor: any;

  // *COMPONENT
  private _screen: ElementRef;
  private _info: ElementRef;
  private _background: ElementRef;
  private _playerControl: ElementRef;

  // *COMPONENT
  private _dropMenu: ElementRef;
  //* TABLE
  private _radioFilterTable: ElementRef;
  private _radioFilterTableTr: Array<any>;
  private _radioFilterTableTd: Array<any>;

  //* TABLE
  private _radioListTable: ElementRef;
  private _radioListTableTr: Array<any>;
  private _radioListTableTd: Array<any>;

  private _allElementsRef: Array<any | Array<any>> = [];

  constructor(
    private playerS: PlayerService,
    rendererFactory: RendererFactory2
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  getElementRefForItemTag(): void {
    this.player.forEach((item: ElementRef) => {

      this._screen = item.nativeElement.children[1];
      this._dropMenu = item.nativeElement.children[1].children[2];
      this._info = item.nativeElement.children[1].children[3].children[0];
      this._playerControl = item.nativeElement.children[1].children[7];

      this._radioFilterTable = item.nativeElement.children[1].children[2].children[0].children[0].children[0].children[0];
      this._radioFilterTableTr = this.getListOfElementRef(item.nativeElement.children[1].children[2].children[0].children[0].children[0].children[0].children, [0]);
      this._radioFilterTableTd = this.getListOfElementRef(item.nativeElement.children[1].children[2].children[0].children[0].children[0].children[0].children, [], [0]);

      this._radioListTable = item.nativeElement.children[1].children[2].children[0].children[1].children[0];
      this._radioListTableTr = this.getListOfElementRef(item.nativeElement.children[1].children[2].children[0].children[1].children[0].children, [0]);
      this._radioListTableTd = this.getListOfElementRef(item.nativeElement.children[1].children[2].children[0].children[1].children[0].children, [], [0]);

      this._background = item.nativeElement.children[1].children[8];
    })
  }

  groupAllElementsRef(): void {
    this._allElementsRef = [
      this._screen,
      this._dropMenu,
      this._info,
      this._playerControl,
      this._radioFilterTable,
      this._radioFilterTableTr,
      this._radioFilterTableTd,
      this._radioListTable,
      this._radioListTableTr,
      this._radioListTableTd,
      this._background
    ]
    this._allElementsRef = this.flattenDeep(this._allElementsRef);
  }

  setTransitionForAllElementsRef(delay: number = 0.5, cubicBezierFunction: string = 'ease-in'): void {
    this._allElementsRef.forEach(item => {
      this._renderer.setStyle(this._background, 'transition', `${delay}s all ${cubicBezierFunction}`);
    })
  }

  initTheme(theme?: string): void {

    theme = this.parameterProcessing(theme, 'theme', 'dark');

    this.resetTheme();
    this.getElementRefForItemTag();
    this.groupAllElementsRef();
    this.setTransitionForAllElementsRef();
    console.log(theme);

    this.setTheme(theme);

    // TODO: THEME

    if (this.playerS.animatePlayerGetListRadio === 'stop') {
      this.initLightTheme();
      this.initDarkTheme();

    } else {
      this.initLightTheme(true);
      this.initDarkTheme(true);

    }
    localStorage.setItem('theme', JSON.stringify(theme));

  }

  flattenDeep(arr): Array<any> {
    return arr.reduce((acc, val, arr) => Array.isArray(val) ? acc.concat(val) : acc.concat(val), []);
  }

  getListOfElementRef(arr: Array<ElementRef>, exception?: Array<number>, include?: Array<number>): Array<ElementRef> {
    let newArr: Array<ElementRef> = [];

    if (typeof include !== 'undefined' && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {

        if (include.some(index => index === i)) {
          newArr.push(arr[i]);
        }

      }
      return newArr;
    }

    if (typeof exception !== 'undefined' && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {

        if (exception.some(index => index !== i)) {
          newArr.push(arr[i]);
        }

      }
      return newArr;
    }

    return arr;
  }

  setTheme(theme: string): boolean {
    this.resetTheme();

    if (this.registerTheme.hasOwnProperty(theme)) {
      this.registerTheme[theme] = true;
      return true;
    }



    return false;
  }

  resetTheme(): void {
    for (const key in this.registerTheme) {

      this.registerTheme.hasOwnProperty(key)
        ? this.registerTheme[key] = false
        : null;

    }
  }

  parameterProcessing(parameter: any | Array<any>, localStorageKey: string, defaultValue: any | Array<any>): any | Array<any> {

    if (typeof parameter !== 'undefined') {
      return parameter;
    }

    if (localStorage.getItem(localStorageKey) !== null) {
      return JSON.parse(localStorage.getItem(localStorageKey));
    }

    if (localStorage.getItem(localStorageKey) === null) {
      localStorage.setItem(localStorageKey, JSON.stringify(defaultValue));
      return defaultValue;
    }

  }

  initLightTheme(animate: boolean = false): void {

    if (this.registerTheme.light) {

      if (animate) {
        this.setStyleForElementRef('#fff', '#111', '15px solid #5c677d', '#FFE7E6', '#4D0028');
      }

      if (!animate) {
        this.setStyleForElementRef('#FFE6F3', '#fff', '15px solid #5c677d', '#FFE7E6', '#4D0028');
      }

    }

  }

  initDarkTheme(animate: boolean = false): void {

    console.log(this.registerTheme);

    if (this.registerTheme.dark) {

      if (animate) {
        this.setStyleForElementRef('#fff', '#111', '15px solid #111', '#1d1d1d', '#111');
      }

      if (!animate) {
        this.setStyleForElementRef('#111', '#fff', '15px solid #111', '#1d1d1d', '#111');
      }

    }

  }

  setStyleForElementRef(
    background: string,
    info: string,
    tableBorder: string,
    trBackground: string,
    tdColor: string
  ): void {
    this._renderer.setStyle(this._background, 'background', background);
    this._renderer.setStyle(this._info, 'color', info);

    //* FILTER
    this._renderer.setStyle(this._radioFilterTable, 'border', tableBorder);

    this._radioFilterTableTr.forEach((tr, i, arr) => {

      this._renderer.setStyle(tr, 'background', trBackground);
      arr[i].addEventListener('mouseover', () => {
        this._renderer.setStyle(tr, 'background', 'red');
      })
      arr[i].addEventListener('mouseout', () => {
        this._renderer.setStyle(tr, 'background', trBackground);
      })
    })

    for (const td of this._radioFilterTableTd) {
      this._renderer.setStyle(td, 'color', tdColor);
    }

    //* RADIO LIST
    this._renderer.setStyle(this._radioListTable, 'border', tableBorder);
    for (const tr of this._radioListTableTr) {
      this._renderer.setStyle(tr, 'background', trBackground);
    }
    for (const td of this._radioListTableTd) {
      this._renderer.setStyle(td, 'color', tdColor);
    }]


  }

}
