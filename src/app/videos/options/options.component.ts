import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
  }

  clearAllVideos(){
    this.videoService.clearLocalStorage()
  }

}
