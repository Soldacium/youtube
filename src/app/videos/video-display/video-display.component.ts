import { Component, OnInit } from '@angular/core';
import { Video } from '@models/video.model';
import { VideoService } from '@services/video.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { VimeoService } from '@services/vimeo.service';
import { SearchOptions } from '@models/search-options.model';

@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.scss']
})
export class VideoDisplayComponent implements OnInit {

  constructor(
    private videoService: VideoService,
    private sanitizer: DomSanitizer) { }

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
    this.videoService.searchedVideosChange.subscribe((videos: Video[]) => {
      this.videos = videos;
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

  closeVideo(close: boolean): void {
    this.openPlayer = false;
    this.videoPlayingUrl = '';
  }

}
