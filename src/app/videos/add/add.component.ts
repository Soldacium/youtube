import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  value = 'Press enter to add';
  type = 'yt';
  error = '';

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {

    this.videoService.errorEmitter.subscribe((error: string) => {
      console.log(error)
      this.error = error;
    })
  }

  changeVideoType(event: any){
    this.type = event.value;
  }

  addVideo(){
    let newId: string;
    

    if (this.type === 'yt' && this.value.length >= 11){
      
      newId = this.value.substr(this.value.length - 11);
    } else if(this.type === 'vimeo' && this.value.length >= 9){
      newId = this.value.substr(this.value.length - 9);
    } else{
      this.error = 'Must be minimum 9 characters for Vimeo and 11 for YT'
      return
    }

    this.videoService.checkIfVideoExists(newId, this.type);

    this.videoService.addVideo(newId, this.type);
  }

}
