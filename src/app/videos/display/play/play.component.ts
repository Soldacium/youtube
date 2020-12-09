import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {

  @Input()
  videoUrl!: SafeUrl;

  @Output('close')
  closeEmitter = new EventEmitter<boolean>();


  closeVideo(event: Event): void{
    event.stopPropagation();
    this.closeEmitter.emit(true);
  }
}
