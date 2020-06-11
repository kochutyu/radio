import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/player/navbar/navbar.component';
import { PlayerControlComponent } from './components/player/player-control/player-control.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropMenuComponent } from './components/player/drop-menu/drop-menu.component';
import { PlayerService } from './services/player.service';
import { RadioService } from './services/radio.service';
import { RadioListComponent } from './components/player/drop-menu/radio-list/radio-list.component';
import { RadioFilterComponent } from './components/player/drop-menu/radio-filter/radio-filter.component';

@NgModule({
  declarations: [  
    PlayerComponent,
    NavbarComponent,
    PlayerControlComponent,
    DropMenuComponent,
    RadioListComponent,
    RadioFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PlayerComponent,
    PlayerControlComponent,
    NavbarComponent,
    DropMenuComponent,
    RadioListComponent,
    RadioFilterComponent
  ],
  providers: [
    PlayerService,
    RadioService
  ],
})
export class SharedModule { }
