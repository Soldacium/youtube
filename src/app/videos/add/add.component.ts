import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  value = 'Clear me';

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
  }

  addVideo(){
    this.videoService.addVideo('','','');
  }

}
