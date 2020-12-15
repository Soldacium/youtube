import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from '@models/video.model';

@Component({
  selector: 'app-videos-layout',
  templateUrl: './videos-layout.component.html',
  styleUrls: ['./videos-layout.component.scss']
})
export class VideosLayoutComponent {

  @Input()
  videos!: Video[];

  @Input()
  displayType = '';

  @Output() delete:
  EventEmitter<any> = new EventEmitter<Video>();

  @Output() favour:
  EventEmitter<any> = new EventEmitter<Video>();

  @Output() unfavour:
  EventEmitter<any> = new EventEmitter<Video>();

  @Output() playVid:
  EventEmitter<any> = new EventEmitter<Video>();


  deleteVideo(video: Video): void{
    this.delete.emit(video);
  }

  favourVideo(video: Video): void{
    this.favour.emit(video);
  }

  unfavourVideo(video: Video): void{
    this.unfavour.emit(video);
  }

  playVideo(video: Video): void{
    this.playVid.emit(video);
  }

}
