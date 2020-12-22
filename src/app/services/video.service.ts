import { EventEmitter, Injectable } from '@angular/core';
import { Video } from '@models/video.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { YoutubeService } from './youtube.service';
import { VimeoService } from './vimeo.service';
import { VideoApiData } from '@models/video-api-data.model';
import { VideoTypes } from '@models/video-types.model';


@Injectable({
  providedIn: 'root'
})
export class VideoService {


  constructor(
    private storageService: LocalStorageService,
    private youtubeService: YoutubeService,
    private vimeoService: VimeoService) {
      this.savedVideos = this.storageService.getVideosFromLocalStorage();
      this.storageService.getLocalStorageSpaceTaken();
    }

  lastPage = 0;
  lastItemsPerPage = 0;

  savedVideos: Video[] = [];
  videosMeetingSearchCriteria: Video[] = [];
  searchedVideos: Video[] = [];
  searchedVideosChange = new EventEmitter<Video[]>();

  errorEmitter = new EventEmitter<string>();

  searchOptions = {
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


  updateSearchOptions(typeOfVideos: string, sortOrder: string, videoDisplay: string): void{
    if (sortOrder !== this.searchOptions.sort){
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

  sortVideosByDate(): void{
    this.savedVideos.reverse();
  }

  updateVideosMeetingSearchCriteria(): void{
    this.videosMeetingSearchCriteria = this.getVideosBySearchOption(this.searchOptions.videosAllowed);
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

  getVideosMeetingSearchCriteriaLength(): number{
    return this.videosMeetingSearchCriteria.length;
  }



  getVideosFromPage(page: number, itemsPerPage: number): Video[]{

    this.lastItemsPerPage = itemsPerPage;
    this.lastPage = page;

    const videosGotten = [];
    const minimumItems = (page) * itemsPerPage;

    for (let i = minimumItems; i < minimumItems + itemsPerPage; i++){
      const video = this.videosMeetingSearchCriteria[i];
      if (video){
        videosGotten.push(video);
      }
    }

    this.searchedVideos = videosGotten;
    this.searchedVideosChange.emit(this.searchedVideos);
    return videosGotten;
  }


  addVideo(id: string, type: VideoTypes): void{

    const videoDataObservable: Observable<VideoApiData | undefined> =
    type === 'yt' ? this.youtubeService.getYoutubeVideoData(id) : this.vimeoService.getVimeoVideoData(id);

    videoDataObservable.subscribe((videoData: VideoApiData | undefined) => {
      if (videoData){
        const video: Video = this.getVideoApiDataAsVideo(videoData, id, type);

        this.savedVideos.push(video);
        this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
        this.storageService.updateLocalStorage();

        this.errorEmitter.emit('');
      }else {
        this.errorEmitter.emit('Video not found');
      }
    });
  }

  private getVideoApiDataAsVideo(videoApiData: VideoApiData, id: string, type: VideoTypes): Video{
    const video: Video = {
      id,
      type,
      favourite: false,
      title: videoApiData.title,
      thumbnail: videoApiData.thumbnail,
      views: videoApiData.views.toString(),
      modifyDate: new Date().toLocaleDateString('en-GB')
    };

    return video;
  }



  deleteVideo(id: string): void{
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);
    if (video){
      this.savedVideos.splice(this.savedVideos.indexOf(video), 1);
      this.searchedVideos.splice(this.searchedVideos.indexOf(video), 1);
      this.updateVideosMeetingSearchCriteria();
      this.storageService.updateLocalStorage();
    }
  }

  setVideoAsFavourite(id: string): void{
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);
    if (video){
      video.favourite = true;
    }
    if (this.searchOptions.videosAllowed === this.videoSearchTypes.favourite){
      this.updateVideosMeetingSearchCriteria();
      this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
    }
    this.storageService.updateLocalStorage();
  }

  setVideoAsNotFavourite(id: string): void {
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);
    if (video){
      video.favourite = false;
    }
    if (this.searchOptions.videosAllowed === this.videoSearchTypes.favourite){
      this.updateVideosMeetingSearchCriteria();
      this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
    }
    this.storageService.updateLocalStorage();
  }

  clearAllVideos(): void{
    this.searchedVideos = [];
    this.savedVideos = [];
    this.storageService.savedVideos = this.savedVideos;
    this.updateVideosMeetingSearchCriteria();
    this.storageService.clearLocalStorage();
  }

}
