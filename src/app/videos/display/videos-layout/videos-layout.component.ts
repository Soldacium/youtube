import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-videos-layout',
  templateUrl: './videos-layout.component.html',
  styleUrls: ['./videos-layout.component.scss']
})
export class VideosLayoutComponent {

  @Input() 
  videos!: Video[];

  @Input()
  displayType: String = '';

  @Output('delete')
  deleteEmitter = new EventEmitter<Video>();

  @Output('favour')
  favourEmitter = new EventEmitter<Video>();

  @Output('unfavour')
  unfavourEmitter = new EventEmitter<Video>();

  @Output('play')
  playEmitter = new EventEmitter<Video>();


  deleteVideo(video: Video){
    this.deleteEmitter.emit(video);
  }

  favourVideo(video: Video){
    this.favourEmitter.emit(video);
  }

  unfavourVideo(video: Video){
    this.unfavourEmitter.emit(video);
  }

  playVideo(video: Video){
    this.playEmitter.emit(video);
  }

}
