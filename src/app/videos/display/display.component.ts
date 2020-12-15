import { Component, OnInit } from '@angular/core';
import { Video } from '@models/video.model';
import { VideoService } from '@services/video.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {



  constructor(
    private videoService: VideoService,
    private sanitizer: DomSanitizer) { }

  videos: Video[] = [];

  videoPlayingUrl!: SafeResourceUrl;
  openPlayer = false;

  itemsPerPage = 6;
  page = 0;

  displayType = '';
  searchedVideosLength = 0;




  ngOnInit(): void {
    this.videoService.searchedVideosChange.subscribe((videos: any[]) => {
      this.videos = videos;
      this.searchedVideosLength = this.videoService.getVideosMeetingSearchCriteriaLength();
    });

    this.videoService.optionsChange.subscribe((options: any) => {
      this.displayType = options.display;
    });

    this.displayType = this.videoService.searchOptions.displayType;
    this.videoService.getVideosFromPage(this.page, this.itemsPerPage);
  }





  changePage(event: any): void{
    this.videoService.getVideosFromPage(event.pageIndex, event.pageSize);
  }

  deleteVideo(video: Video): void{
    this.videoService.deleteVideo(video.id);
  }

  favourVideo(video: Video): void{
    this.videoService.setVideoAsFavourite(video.id);
  }

  unfavourVideo(video: Video): void{
    this.videoService.setVideoAsNotFavourite(video.id);
  }

  playVideo(video: Video): void{
    this.openPlayer = true;
    if (video.type === 'yt'){
      this.videoPlayingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.id}`);
    }else{
      this.videoPlayingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${video.id}?`);
    }
  }

  closeVideo(close: boolean): void{
    this.openPlayer = false;
    this.videoPlayingUrl = '';
  }



}
