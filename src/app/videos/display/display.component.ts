import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  videos: Array<object> = [];
  videosLength = 0;

  itemsPerPage = 6;
  page = 0;

  ngOnInit(): void {
    this.videosLength = this.videoService.videos.length;
    this.videos = this.videoService.getVideosFromPage(this.page, this.itemsPerPage);
  }

  changePage(event: any){
    console.log(event)
    this.videos = this.videoService.getVideosFromPage(event.pageIndex, event.pageSize);

  }



}
