import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  localStorageSpaceTaken = '';

  ngOnInit(): void {
    this.localStorageSpaceTaken = this.videoService.localStorageSpaceTaken;
  }

  clearAllVideos(): void{
    this.videoService.clearLocalStorage();
  }

}
