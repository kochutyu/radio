// TODO: MODULES
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// TODO: COMPONENTS
import { PlayerControlComponent } from './components/player/player-control/player-control.component';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/player/navbar/navbar.component';
import { DropMenuComponent } from './components/player/drop-menu/drop-menu.component';
import { RadioListComponent } from './components/player/drop-menu/radio-list/radio-list.component';
import { RadioFilterComponent } from './components/player/drop-menu/radio-filter/radio-filter.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DarkMixerComponent } from './components/player/ranges/dark-mixer/dark-mixer.component';
import { LightMixerComponent } from './components/player/ranges/light-mixer/light-mixer.component';

// TODO: PIPES
import { CountryPipe } from './pipe/country.pipe';
import { GenrePipe } from './pipe/genre.pipe';
import { SearchRadioPipe } from './pipe/search-radio.pipe';

// TODO: SERVICES
import { LoaderService } from './services/loader.service';
import { PlayerService } from './services/player.service';
import { RadioService } from './services/radio.service';
import { ThemeService } from './services/theme.service';

// TODO: DIRECTIVES
import { DiskDirective } from './directives/disk.directive';

@NgModule({
  declarations: [
    PlayerComponent,
    NavbarComponent,
    PlayerControlComponent,
    DropMenuComponent,
    RadioListComponent,
    RadioFilterComponent,
    GenrePipe,
    LoaderComponent,
    DarkMixerComponent,
    LightMixerComponent,
    DiskDirective,
    SearchRadioPipe,
    CountryPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
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
    RadioFilterComponent,
    GenrePipe,
    LoaderComponent,
    DarkMixerComponent,
    LightMixerComponent,
    ToastrModule,
    DiskDirective,
    SearchRadioPipe,
    CountryPipe
  ],
  providers: [
    PlayerService,
    RadioService,
    ThemeService,
    LoaderService
  ],
})
export class SharedModule { }