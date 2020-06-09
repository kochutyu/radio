import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/player/navbar/navbar.component';
import { PlayerControlComponent } from './components/player/player-control/player-control.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
    FontAwesomeModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PlayerComponent,
    NavbarComponent,
    FontAwesomeModule
  ]
})
export class SharedModule { }
