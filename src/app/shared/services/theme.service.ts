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

  player: QueryList<ElementRef>;

  private _renderer: Renderer2;

  //* COMPONENT PLAYER
  private _screen: HTMLElement;
  private _info: HTMLElement;
  private _background: HTMLElement;
  private _playerControl: Array<HTMLElement>;

  //* COMPONENT DROP-MENU
  private _dropMenu: HTMLElement;

  //* TABLE IN DROP-MENU
  private _radioFilterTable: HTMLElement;
  private _radioFilterTableTr: Array<HTMLElement>;
  private _radioFilterTableTd: Array<HTMLElement>;
  private _filterBtn: Array<HTMLElement>;

  //* TABLE IN DROP-MENU
  private _radioListTable: HTMLElement;
  private _radioListTableTr: Array<HTMLElement>;
  private _radioListTableTd: Array<HTMLElement>;

  //* ALL ELEMENTS
  private _allElementsRef: Array<HTMLElement | Array<HTMLElement>> = [];

  constructor(
    private playerS: PlayerService,
    rendererFactory: RendererFactory2
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  private getElementRefForItemTag(): void {
    this.player.forEach((item: ElementRef) => {
      this._screen = item.nativeElement.children[1];
      this._dropMenu = item.nativeElement.children[1].children[1];

      this._info = item.nativeElement.children[1].children[2].children[0];
      this._playerControl = item.nativeElement.children[1].children[5].children[0].children;
      this._background = item.nativeElement.children[1].children[7];

      //* RADIO FILTER
      this._radioFilterTable = item.nativeElement.children[1].children[1].children[0].children[0].children[0].children[0];
      this._radioFilterTableTr = this.getListOfElementRef(item.nativeElement.children[1].children[1].children[0].children[0].children[0].children[0].children, [0]);
      this._radioFilterTableTd = this.getListOfElementRef(item.nativeElement.children[1].children[1].children[0].children[0].children[0].children[0].children, [], [0]);
      this._filterBtn = this.getListOfElementRef(item.nativeElement.children[1].children[1].children[0].children[0].children[0].children[0].children[1].children[2].children[0].children);

      //* RADIO LIST
      this._radioListTable = item.nativeElement.children[1].children[1].children[0].children[1].children[0];
      this._radioListTableTr = this.getListOfElementRef(item.nativeElement.children[1].children[1].children[0].children[1].children[0].children, [0]);
      this._radioListTableTd = this.getListOfElementRef(item.nativeElement.children[1].children[1].children[0].children[1].children[0].children, [], [0]);
    })
  }

  private groupAllElementsRef(): void {
    this._allElementsRef = [
      this._screen,
      this._dropMenu,
      this._info,
      this._playerControl,
      this._radioFilterTable,
      this._radioFilterTableTr,
      this._radioFilterTableTd,
      this._filterBtn,
      this._radioListTable,
      this._radioListTableTr,
      this._radioListTableTd,
      this._background
    ]
    this._allElementsRef = this.flattenDeep(this._allElementsRef);
  }

  private setTransitionForAllElementsRef(delay: number = 0.5, cubicBezierFunction: string = 'ease-in'): void {
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

    this.setTheme(theme);

    // TODO: ANIMATION FOR THEME
    if (this.playerS.animatePlayerGetListRadio === 'stop') {
      this.initLightTheme();
      this.initDarkTheme();
    } else {
      this.initLightTheme(true);
      this.initDarkTheme(true);
    }

    localStorage.setItem('theme', JSON.stringify(theme));
  }

  private flattenDeep(arr): Array<any> {
    return arr.reduce((acc, val, arr) => Array.isArray(val) ? acc.concat(val) : acc.concat(val), []);
  }

  private getListOfElementRef(arr: Array<any>, exception?: Array<number>, include?: Array<number>): Array<HTMLElement> {
    let newArr: Array<HTMLElement> = [];

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

  private setTheme(theme: string): boolean {
    this.resetTheme();

    if (this.registerTheme.hasOwnProperty(theme)) {
      this.registerTheme[theme] = true;
      return true;
    }

    return false;
  }

  private resetTheme(): void {
    for (const key in this.registerTheme) {

      this.registerTheme.hasOwnProperty(key)
        ? this.registerTheme[key] = false
        : null;

    }
  }

  private parameterProcessing(parameter: any | Array<any>, localStorageKey: string, defaultValue: any | Array<any>): any | Array<any> {

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

  private initLightTheme(animate: boolean = false): void {

    if (this.registerTheme.light) {

      if (animate) {
        this.setStyleForElementRef('#fff', '#111', '#5c677d', '#FFE7E6', '#1d1d1d', '#edd895', '#222', '#4D0028', '#00efff');
      }

      if (!animate) {
        this.setStyleForElementRef('#FFE6F3', '#56677d', '#5c677d', '#FFE7E6', '#1d1d1d', '#edd895', '#222', '#4D0028', '#56677d');
      }

    }

  }

  private initDarkTheme(animate: boolean = false): void {

    if (this.registerTheme.dark) {

      if (animate) {
        this.setStyleForElementRef('#fff', '#111', '#111', '#1d1d1d', '#edd895', '#222', '#ff564c', '#111', '#fff');
      }

      if (!animate) {
        this.setStyleForElementRef('#111', '#fff', '#111', '#1d1d1d', '#edd895', '#222', '#ff564c', '#111', '#fff');
      }

    }

  }

  private setStyleForElementRef(
    background: string,
    info: string,
    tableBackground: string,
    trBackground: string,
    trColor: string,
    trHoverBackground: string,
    trHoverColor: string,
    tdColor: string,
    tdPlayerControl: string,
    filterBtnBackground: string = '#5b6277',
    filterColor: string = '#ffffff',
  ): void {

    this._renderer.setStyle(this._background, 'background', background);

    this._renderer.setStyle(this._dropMenu.children[0], 'background', tableBackground)
    this._renderer.setStyle(this._info, 'color', info);

    for (const td of this._playerControl) {
      this._renderer.setStyle(td, 'color', tdPlayerControl);
    }

    //* RADIO FILTER
    this._renderer.setStyle(this._radioFilterTable, 'border', `15px solid ${tableBackground}`);

    for (const tr of this._radioFilterTableTr) {
      this._renderer.setStyle(tr, 'background', trBackground);
    }

    for (const td of this._radioFilterTableTd) {
      this._renderer.setStyle(td, 'color', tdColor);
    }

    for (const filterBtn of this._filterBtn) {
      this._renderer.setStyle(filterBtn, 'background', filterBtnBackground);
      this._renderer.setStyle(filterBtn, 'color', filterColor);
    }

    //* RADIO LIST
    this._renderer.setStyle(this._radioListTable, 'border', `15px solid ${tableBackground}`);

    for (const tr of this._radioListTableTr) {

      this._renderer.setStyle(tr, 'background', trBackground);
      this._renderer.setStyle(tr, 'color', trColor);

      tr.addEventListener('mouseover', () => {
        this._renderer.setStyle(tr, 'background', trHoverBackground);
        this._renderer.setStyle(tr, 'color', trHoverColor);
      })

      tr.addEventListener('mouseout', () => {
        this._renderer.setStyle(tr, 'background', trBackground);
        this._renderer.setStyle(tr, 'color', trColor);
      })

    }

    for (const td of this._radioListTableTd) {
      this._renderer.setStyle(td, 'color', tdColor);
    }

  }

}
