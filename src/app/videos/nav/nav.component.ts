import { Component, OnInit } from '@angular/core';
import { VideoService } from '@services/video.service';

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
    videosAllowed: '',
    sort: '',
    displayType: ''
  };

  ngOnInit(): void {
    this.searchOptions = this.videoService.searchOptions;
    this.videoService.updateSearchOptions(this.searchOptions.videosAllowed, this.searchOptions.sort, this.searchOptions.displayType);
  }

  setDisplayMode(mode: string): void{
    this.mode = this.mode === mode ? 'all' : mode;
  }

  updateOptions(): void{
    this.videoService.updateSearchOptions(this.searchOptions.videosAllowed, this.searchOptions.sort, this.searchOptions.displayType);
  }




}
