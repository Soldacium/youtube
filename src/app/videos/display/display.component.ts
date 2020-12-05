import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  videos: Video[] = [];
  videosLength = 0;

  itemsPerPage = 6;
  page = 0;

  ngOnInit(): void {
    
    this.videoService.searchedVideosChange.subscribe((videos: Video[]) => {
      this.videos = videos;
    });

    this.videoService.getVideosFromPage(this.page, this.itemsPerPage);



    this.videosLength = this.videoService.videos.length;
    console.log(this.videos, this.videoService.searchedVideos)

  }

  changePage(event: any){
    console.log(event)
    this.videoService.getVideosFromPage(event.pageIndex, event.pageSize);
    this.videosLength = this.videoService.videos.length;

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



}
