import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  videos = [
    1,2,3,4,5,6
  ]

  itemsPerPage = 6;
  page = 1;

  ngOnInit(): void {
    this.videos = this.videoService.getVideosFromPage(this.page, this.itemsPerPage);
  }

  changePage(){
    this.videos = this.videoService.getVideosFromPage(this.page, this.itemsPerPage);

  }



}
