import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Video } from '@models/video.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage = localStorage;
  localStorageSpaceTaken = '';
  private storageKeys = {
    videos: 'videos',
    options: 'options'
  };

  lastPage = 0;
  lastItemsPerPage = 0;




  savedVideos: Video[] = [];
  loadedVideos = new Map([]);
  videosMeetingSearchCriteria: Video[] = [];
  searchedVideos: Video[] = [];
  searchedVideosChange = new EventEmitter<Video[]>();
  optionsChange = new EventEmitter<object>();

  errorEmitter = new EventEmitter<string>();

  storageSpaceEmitter = new EventEmitter<string>();




  constructor() { }

  addVideo(id: string, type: string): void{

    const videoDataObservable =  type === 'yt' ? this.getYoutubeVideoData(id) : this.getVimeoVideoData(id);
    videoDataObservable.subscribe((videoData: any) => {
      if (videoData){
        const video: Video = {
          id,
          type,
          favourite: false,
          title: videoData.title,
          thumbnail: videoData.thumbnail,
          views: videoData.views,
          modifyDate: new Date().toLocaleDateString('en-GB')
        };

        this.savedVideos.push(video);
        this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
        this.updateLocalStorage();

        this.errorEmitter.emit('');
      }else {
        this.errorEmitter.emit('Video not found');
      }
    });
  }

  deleteVideo(id: string): void{
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);
    if (video){
      this.savedVideos.splice(this.savedVideos.indexOf(video), 1);
      this.searchedVideos.splice(this.searchedVideos.indexOf(video), 1);
      this.updateVideosMeetingSearchCriteria();
      this.updateLocalStorage();
    }
  }



  setVideoAsFavourite(id: string): void{
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);
    if (video){
      video.favourite = true;
    }

    if (this.searchOptions.videos === 'fav'){
      this.updateVideosMeetingSearchCriteria();
      this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
    }

    this.updateLocalStorage();
  }

  setVideoAsNotFavourite(id: string): void {
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);

    if (video){
      video.favourite = false;
    }

    if (this.searchOptions.videos === 'fav'){
      this.updateVideosMeetingSearchCriteria();
      this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
    }

    this.updateLocalStorage();
  }

  clearLocalStorage(): void{

    localStorage.setItem(this.storageKeys.videos, JSON.stringify([]));
    this.updateVideosMeetingSearchCriteria();
    this.getLocalStorageSpaceTaken();
  }

  private getLocalStorageSpaceTaken(): string{
    let spaceTaken = 0;
    this.savedVideos.forEach(video => {
      for (const [key, value] of Object.entries(video)) {
        if (value){
          spaceTaken += value.toString().length;
        }
      }
    });

    //this.localStorageSpaceTaken = (spaceTaken / 5100000).toFixed(5);
    this.storageSpaceEmitter.emit(this.localStorageSpaceTaken);

    return (spaceTaken / 5100000).toFixed(5);
  }

  private updateLocalStorage(): void{
    const videos = JSON.stringify(this.savedVideos);
    localStorage.setItem(this.storageKeys.videos, videos);
    this.getLocalStorageSpaceTaken();
  }

  private getVideosFromLocalStorage(): void{
    this.savedVideos = JSON.parse(localStorage.getItem(this.storageKeys.videos) || '[]');
    this.getLocalStorageSpaceTaken();
  }
}
