import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  value = 'Clear me';
  type = ''

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
  }

  addVideo(){
    let newId: string;
    if (this.type = 'yt'){
      newId = this.value.length >= 11?this.value.substr(this.value.length - 11) : this.value;
    } else{
      newId = this.value.length >= 9?this.value.substr(this.value.length - 9) : this.value;
    }

    this.videoService.checkIfVideoExists(newId, this.type);

    this.videoService.addVideo(newId, this.type);
  }

}
