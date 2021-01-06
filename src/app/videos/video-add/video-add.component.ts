import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { getVideoFromAPI } from '@appRoot/store/actions/videos.actions';
import { State } from '@appRoot/store/reducers/videos.reducer';
import { VideoTypes } from '@models/video-types.model';
import { Store } from '@ngrx/store';
import { VideoService } from '@services/video.service';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.scss']
})
export class VideoAddComponent implements OnInit {

  searchInput = '';
  videoType: VideoTypes = 'yt';
  error = '';
  youtubeVideoIdLength = 11;
  vimeoVideoIdLength = 9;

  constructor(private videoService: VideoService, private store: Store<State>) { }

  ngOnInit(): void {
    this.getErrorsSubscriber();
  }

  getErrorsSubscriber(): void {
    this.videoService.errorEmitter.subscribe((error: string) => {
      this.error = error;
    });
  }

  changeVideoType(event: MatButtonToggleChange): void {
    this.videoType = event.value;
  }

  addVideo(): void {
    const videoID = this.modifySearchInput();
    if (videoID) {
      this.store.dispatch(getVideoFromAPI({id: videoID, videoType: this.videoType}));
      // this.videoService.addVideo(videoID, this.videoType);
    }
  }

  modifySearchInput(): string | undefined {
    let newId: string;
    if (this.videoType === 'yt' && this.searchInput.length >= this.youtubeVideoIdLength) {
      newId = this.searchInput.substr(this.searchInput.length - this.youtubeVideoIdLength);
    } else if (this.videoType === 'vimeo' && this.searchInput.length >= this.vimeoVideoIdLength) {
      newId = this.searchInput.substr(this.searchInput.length - this.vimeoVideoIdLength);
    } else {
      this.error = 'Must be minimum 9 characters for Vimeo and 11 for YT';
      return;
    }
    return newId;
  }

  clearSearchInput(): void {
    this.searchInput = '';
  }

}
