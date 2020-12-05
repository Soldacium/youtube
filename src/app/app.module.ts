import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { AddComponent } from './videos/add/add.component';
import { OptionsComponent } from './videos/options/options.component';
import { NavComponent } from './videos/nav/nav.component';
import { DisplayComponent } from './videos/display/display.component';
import { VideoService } from './services/video.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { FormsModule } from '@angular/forms';
import { WatchComponent } from './videos/watch/watch.component';
import { PopupComponent } from './videos/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    AddComponent,
    OptionsComponent,
    NavComponent,
    DisplayComponent,
    WatchComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,


    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatButtonToggleModule

  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
