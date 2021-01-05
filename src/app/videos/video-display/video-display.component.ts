import { Component, OnInit } from '@angular/core';
import { Video } from '@models/video.model';
import { VideoService } from '@services/video.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { VimeoService } from '@services/vimeo.service';
import { SearchOptions } from '@models/search-options.model';
import { Store } from '@ngrx/store';
import { State } from '@store/reducers/videos.reducer';

@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.scss']
})
export class VideoDisplayComponent implements OnInit {

  constructor(
    private videoService: VideoService,
    private sanitizer: DomSanitizer,
    private store: Store<State>) { } // Store<{videos: Video[]}>

  videos: Video[] = [];

  videoPlayingUrl!: SafeResourceUrl;
  openPlayer = false;

  itemsPerPage = 6;
  videosMeetingSearchCriteriaLength = 0;
  page = 0;

  displayType = '';

  videoPlayers = {
    yt: 'https://www.youtube.com/embed/',
    vimeo: 'https://player.vimeo.com/video/'
  };

  ngOnInit(): void  {
    this.getVideos();
    this.getDisplayType();
  }

  getVideos(): void  {
    this.store.select('videos').subscribe((videoStorage: any) => {
      this.videos = [...videoStorage.searchedVideos];
      this.videosMeetingSearchCriteriaLength = this.videoService.getVideosMeetingSearchCriteriaLength();
    });
    this.videoService.getVideosFromPage(this.page, this.itemsPerPage);
  }

  getDisplayType(): void  {
    this.videoService.optionsChange.subscribe((options: SearchOptions) => {
      this.displayType = options.displayType;
    });

    this.displayType = this.videoService.searchOptions.displayType;
  }


  changePage(event: PageEvent): void  {
    this.videoService.getVideosFromPage(event.pageIndex, event.pageSize);
  }

  deleteVideo(video: Video): void  {
    this.videoService.deleteVideo(video.id);
  }

  favourVideo(video: Video): void {
    this.videoService.setVideoAsFavourite(video.id);
  }

  unfavourVideo(video: Video): void {
    this.videoService.setVideoAsNotFavourite(video.id);
  }

  playVideo(video: Video): void {
    this.openPlayer = true;
    this.videoPlayingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoPlayers[video.type] + video.id);
  }

  closeVideo(): void {
    this.openPlayer = false;
    this.videoPlayingUrl = '';
  }

}
