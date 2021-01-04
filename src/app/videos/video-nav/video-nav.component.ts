import { Component, OnInit } from '@angular/core';
import { SearchOptions } from '@models/search-options.model';
import { VideoService } from '@services/video.service';

@Component({
  selector: 'app-video-nav',
  templateUrl: './video-nav.component.html',
  styleUrls: ['./video-nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  mode = '';

  sorts = [
    {value: 'descending', viewValue: 'Descending'},
    {value: 'ascending', viewValue: 'Ascending'},
  ];

  searchOptions: SearchOptions = {
    videosAllowed: 'all',
    sort: 'ascending',
    displayType: 'blocks'
  };

  ngOnInit(): void {
    this.searchOptions = this.videoService.searchOptions;
    this.videoService.updateSearchOptions(this.searchOptions.videosAllowed, this.searchOptions.sort, this.searchOptions.displayType);
  }

  setDisplayMode(mode: string): void {
    this.mode = this.mode === mode ? 'all' : mode;
  }

  updateOptions(): void {
    this.videoService.updateSearchOptions(this.searchOptions.videosAllowed, this.searchOptions.sort, this.searchOptions.displayType);
  }




}
