import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '@models/video.model';

@Component({
  selector: 'app-videos-page',
  templateUrl: './videos-page.component.html',
  styleUrls: ['./videos-page.component.scss']
})
export class VideosPageComponent {

  @Input()
  videos!: Video[];

  @Input()
  displayType = '';

  @Output() delete:
  EventEmitter<Video> = new EventEmitter<Video>();

  @Output() favour:
  EventEmitter<Video> = new EventEmitter<Video>();

  @Output() unfavour:
  EventEmitter<Video> = new EventEmitter<Video>();

  @Output() playVid:
  EventEmitter<Video> = new EventEmitter<Video>();


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
