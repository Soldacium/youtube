import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';
import { VideoService } from '@services/video.service';


@Component({
  selector: 'app-video-options',
  templateUrl: './video-options.component.html',
  styleUrls: ['./video-options.component.scss']
})
export class VideoOptionsComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private videoService: VideoService) { }

  localStorageSpaceTaken = '';

  ngOnInit(): void {
    this.getLocalStorageSpaceTaken();
  }

  getLocalStorageSpaceTaken(): void {
    this.localStorageSpaceTaken = this.localStorageService.localStorageSpaceTaken;
    this.localStorageService.storageSpaceEmitter.subscribe((storageTaken: string) => {
      this.localStorageSpaceTaken = storageTaken;
    });
  }

  clearAllVideos(): void {
    this.videoService.clearAllVideos();
  }

}
