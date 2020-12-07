import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';

import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private videoService: VideoService, private sanitizer: DomSanitizer) { }

  videos: Video[] = [];
  videosLength = 0;

  videoPlayingUrl!: SafeResourceUrl;
  openPlayer = false;

  itemsPerPage = 6;
  page = 0;

  ngOnInit(): void {
    
    this.videoService.searchedVideosChange.subscribe((videos: any[]) => {


      this.videos = videos;
      console.log(videos)

    });

    this.videoService.getVideosFromPage(this.page, this.itemsPerPage);

    this.videosLength = this.videoService.savedVideos.length;

  }

  changePage(event: any){
    console.log(event)
    console.log(this.videos)
    this.videoService.getVideosFromPage(event.pageIndex, event.pageSize);
    this.videosLength = this.videoService.savedVideos.length;

  }

  deleteVideo(videoID: string){
    this.videoService.deleteVideo(videoID);
  }

  favourVideo(videoID: string){
    this.videoService.setVideoAsFavourite(videoID);
  }

  unfavourVideo(videoID: string){
    this.videoService.setVideoAsNotFavourite(videoID);
  }

  playVideo(video: Video){
    this.openPlayer = true;
    if(video.type === 'yt'){
      
      this.videoPlayingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.id}`)
      console.log(this.videoPlayingUrl)
    }else{

    }
    
  }

  closeVideo(event: Event){
    event.stopPropagation();
    this.openPlayer = false;
    this.videoPlayingUrl = '';
  }



}
