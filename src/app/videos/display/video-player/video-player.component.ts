import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-play',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {

  @Input()
  videoUrl!: SafeUrl;

  @Output() closeVid:
  EventEmitter<any> = new EventEmitter<boolean>();


  closeVideo(event: Event): void{
    event.stopPropagation();
    this.closeVid.emit(true);
  }
}
