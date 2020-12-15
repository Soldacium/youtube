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
    videos: '',
    sort: '',
    display: ''
  };

  ngOnInit(): void {
    this.searchOptions = this.videoService.searchOptions;
    this.videoService.updateSearchOptions(this.searchOptions.videos, this.searchOptions.sort, this.searchOptions.display);
  }

  setDisplayMode(mode: string): void{
    this.mode = this.mode === mode ? 'all' : mode;
  }

  updateOptions(): void{
    this.videoService.updateSearchOptions(this.searchOptions.videos, this.searchOptions.sort, this.searchOptions.display);
  }




}
