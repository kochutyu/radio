import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/player/navbar/navbar.component';
import { PlayerControlComponent } from './components/player/player-control/player-control.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [  
    PlayerComponent,
    NavbarComponent,
    PlayerControlComponent
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
    PlayerComponent,
    PlayerControlComponent,
    NavbarComponent,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
