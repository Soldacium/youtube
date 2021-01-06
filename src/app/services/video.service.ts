import { EventEmitter, Injectable } from '@angular/core';
import { Video } from '@models/video.model';
import { Observable } from 'rxjs';
import { YoutubeService } from './youtube.service';
import { VimeoService } from './vimeo.service';
import { SearchOptions } from '@models/search-options.model';
import { VideoTypes } from '@models/video-types.model';

import { Store } from '@ngrx/store';
import { setVideos, addVideo, deleteVideo, deleteAllVideos, setSearchedVideos,
favourVideo, unfavourVideo, setVideosMeetingSearchCriteria } from '@store/actions/videos.actions';
import { State } from '@store/reducers/videos.reducer';
import { reverseSortOrder } from '@appRoot/store/actions/sort-videos.actions';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private youtubeService: YoutubeService,
    private vimeoService: VimeoService,
    private store: Store<State>) {
      this.setupStoreSubscription();
    }

  lastPage = 0;
  lastItemsPerPage = 0;

  savedVideos: Video[] = [];
  videosMeetingSearchCriteria: Video[] = [];
  searchedVideos: Video[] = [];
  searchedVideosChange = new EventEmitter<Video[]>();

  errorEmitter = new EventEmitter<string>();

  searchOptions: SearchOptions = {
    videosAllowed: 'all',
    sort: 'descending',
    displayType: 'blocks'

  };
  optionsChange = new EventEmitter<object>();

  private videoSearchTypes = {
    all: 'all',
    youtube: 'yt',
    vimeo: 'vimeo',
    favourite: 'fav'
  };

  private setupStoreSubscription(): void {
    this.updateVideosMeetingSearchCriteria();
    this.store.dispatch(setVideos({videos: [...this.savedVideos]}));

    this.store.select('videos').subscribe((videoStorage: any) => {
      const prevLengthVideos = this.savedVideos.length;
      const prevLengthCriteriaVideos = this.videosMeetingSearchCriteria.length;

      this.savedVideos = [...videoStorage.videos];
      this.searchedVideos = [...videoStorage.searchedVideos];
      this.videosMeetingSearchCriteria = [...videoStorage.videosMeetingSearchCriteria];

      if (prevLengthVideos !== videoStorage.videos.length) {
        this.updateVideosMeetingSearchCriteria();
      }

      if (prevLengthCriteriaVideos !== videoStorage.videosMeetingSearchCriteria.length) {
        this.updateVideosMeetingSearchCriteria();
      }
    });
  }

  updateSearchOptions(typeOfVideos: 'all' | 'vimeo' | 'yt' | 'favourite', sortOrder: 'descending' | 'ascending', videoDisplay: 'blocks' | 'list'): void {
    if (sortOrder !== this.searchOptions.sort) {
      this.sortVideosByDate();
    }

    this.searchOptions = {
      videosAllowed: typeOfVideos,
      sort: sortOrder,
      displayType: videoDisplay
    };
    this.optionsChange.emit(this.searchOptions);
    this.updateVideosMeetingSearchCriteria();
  }

  private sortVideosByDate(): void {
    this.store.dispatch(reverseSortOrder());
  }

  private updateVideosMeetingSearchCriteria(): void {
    this.store.dispatch(setVideosMeetingSearchCriteria({acceptableVideos: this.getVideosBySearchOption(this.searchOptions.videosAllowed)}));
    this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
  }

  private getVideosBySearchOption(allowedVideosType: string): Video[]{
    switch (allowedVideosType) {
      case this.videoSearchTypes.all:
        return this.savedVideos;

      case this.videoSearchTypes.favourite:
        return this.savedVideos.filter(video => video.favourite === true);

      case this.videoSearchTypes.youtube:
        return this.savedVideos.filter(video => video.type === this.videoSearchTypes.youtube);

      case this.videoSearchTypes.vimeo:
        return this.savedVideos.filter(video => video.type === this.videoSearchTypes.vimeo);

      default:
        return [];
    }
  }

  getVideosMeetingSearchCriteriaLength(): number {
    return this.videosMeetingSearchCriteria.length;
  }

  getVideosFromPage(page: number, itemsPerPage: number): Video[] {
    this.lastItemsPerPage = itemsPerPage;
    this.lastPage = page;

    const videosGotten = [];
    const minimumItems = (page) * itemsPerPage;

    for (let i = minimumItems; i < minimumItems + itemsPerPage; i++) {
      const video = this.videosMeetingSearchCriteria[i];
      if (video) {
        videosGotten.push(video);
      }
    }

    this.store.dispatch(setSearchedVideos({searchedVideos: [...videosGotten]}));
    return videosGotten;
  }

  addVideo(id: string, type: VideoTypes): Observable<Video | undefined> {

    const videoDataObservable: Observable<Video | undefined> =
    type === 'yt' ? this.youtubeService.getYoutubeVideoData(id, type) : this.vimeoService.getVimeoVideoData(id, type);

    return videoDataObservable;
  }

  deleteVideo(id: string): void {
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);

    if (!video) {
      return;
    }

    this.store.dispatch(deleteVideo({video}));
    this.updateVideosMeetingSearchCriteria();
  }

  setVideoAsFavourite(id: string): void {

    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);

    if (video) {
      this.store.dispatch(favourVideo({video}));
      this.updateVideosMeetingSearchCriteria();
    }
  }

  setVideoAsNotFavourite(id: string): void {
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);

    if (video) {
      this.store.dispatch(unfavourVideo({video}));
      this.updateVideosMeetingSearchCriteria();
    }
  }

  clearAllVideos(): void {
    this.store.dispatch(deleteAllVideos());
  }

}
