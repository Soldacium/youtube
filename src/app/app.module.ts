import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@appRoot/app-routing.module';
import { AppComponent } from '@appRoot/app.component';
import { VideosComponent } from '@videos/videos.component';
import { VideoAddComponent } from '@videos/video-add/video-add.component'; // ./videos
import { OptionsComponent } from '@videos/options/options.component';
import { NavComponent } from '@videos/nav/nav.component';
import { DisplayComponent } from '@videos/display/display.component';
import { VideoService } from '@services/video.service';
import { VideosLayoutComponent } from '@videos/display/videos-layout/videos-layout.component';
import { VideoPlayerComponent } from '@videos/display/video-player/video-player.component';


import { MaterialModule } from '@appRoot/material.module';
import { YoutubeService } from '@services/youtube.service';
import { VimeoService } from '@services/vimeo.service';
import { LocalStorageService } from '@services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    VideoAddComponent,
    OptionsComponent,
    NavComponent,
    DisplayComponent,
    VideosLayoutComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    MaterialModule

  ],
  providers: [VideoService, YoutubeService, VimeoService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
