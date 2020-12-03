import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  mode = '';


  sorts = [
    {value: 'descending', viewValue: 'Descending'},
    {value: 'ascending', viewValue: 'Ascending'},
  ];

  searchOptions = {

  }



  ngOnInit(): void {
    this.searchOptions = this.videoService.searchOptions;
  }

  setDisplayMode(mode: string){
    if (this.mode !== mode){
      this.mode === mode;
    }else{
      this.mode === 'all';
    }

  }

  updateOptions(){
    //this.videoService.updateSearchOptions()
  }




}
