import { EventEmitter, Injectable } from '@angular/core';
import { Video } from '../models/video.model';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() {
    this.getVideosFromLocalStorage();
    //this.getOptionsFromLocalStorage();
   }

  localStorage = localStorage;
  keys = {
    videos: 'videos',
    options: 'options'
  };

  lastPage = 0;
  lastItemsPerPage = 0;



  videos: Video[] = [];
  videosMeetingSearchCriteria: Video[] = [];
  searchedVideos: Video[] = [];
  searchedVideosChange = new EventEmitter<Video[]>();



  searchOptions = {
    videos: 'all',
    sort: 'descending',
    display: 'blocks'

  };






  updateSearchOptions(typeOfVideos: string, sortOrder: string, videoDisplay: string): void{
    if (sortOrder !== this.searchOptions.sort){
      this.sortVideosByDate();
    }

    this.searchOptions = {
      videos: typeOfVideos,
      sort: sortOrder,
      display: videoDisplay

    };

    this.updateVideosMeetingSearchCriteria();
  }

  updateVideosMeetingSearchCriteria(): void{
    let videos: Video[] = [];

    switch (this.searchOptions.videos) {
      case 'all':
        videos = this.videos;
        break;
      case 'fav':
        videos = this.videos.filter(video => video.favourite === true)
        break;
      case 'yt':
        videos = this.videos.filter(video => video.type === 'yt')
        break;
      case 'vimeo':
        videos = this.videos.filter(video => video.type === 'vimeo')
        break;
      default:
        break;
    }

    this.videosMeetingSearchCriteria = videos;
    this.getVideosFromPage(this.lastPage,this.lastItemsPerPage);
  }

  // that's enough for now as all videos are already sorted by date;
  sortVideosByDate(){
    this.videos.reverse();
    this.updateVideosMeetingSearchCriteria();
  }






  getVideosFromPage(page: number, itemsPerPage: number): Video[]{

    this.lastItemsPerPage = itemsPerPage;
    this.lastPage = page;

    const videosGotten = [];
    const min = (page) * itemsPerPage;

    for (let i = min; i < min + itemsPerPage; i++){
      if (this.videosMeetingSearchCriteria[i]){
        this.getVideoInfo(this.videosMeetingSearchCriteria[i].id, this.videosMeetingSearchCriteria[i].type);
        videosGotten.push(this.videosMeetingSearchCriteria[i]);
      }
    }

    this.searchedVideos = videosGotten;
    this.searchedVideosChange.emit(this.searchedVideos)
    return videosGotten;
  }

  getVideoInfo(id: string, type: string): void{

    return;
  }

  getYoutubeVideo(id: string){

  }

  getVimeoVideo(id: string){

  }






  checkIfVideoExists(id: string, type: string){

  }

  addVideo(id: string, type: string): void{

    const video: Video = {
      id,
      type,
      favourite: false,
      modifyDate: Date.now()
    };

    this.videos.push(video);
    this.getVideosFromPage(this.lastPage,this.lastItemsPerPage);
    this.updateLocalStorage();
  }

  deleteVideo(id: string): void{
    const video = this.videos.find(video => video.id === id);
    if(video){
      this.videos.splice(this.videos.indexOf(video),1);
      this.searchedVideos.splice(this.searchedVideos.indexOf(video),1)
      this.updateLocalStorage();
    }

  }







  setVideoAsFavourite(id: string): void{
    const video = this.videos.find(video => video.id === id);
    if(video){
      video.favourite = true;
    }

    if(this.searchOptions.videos === 'fav'){
      this.getVideosFromPage(this.lastPage,this.lastItemsPerPage)
    }

    this.updateLocalStorage();
  }

  setVideoAsNotFavourite(id: string): void {
    const video = this.videos.find(video => video.id === id);

    if(video){
      video.favourite = false;
    }

    

    if(this.searchOptions.videos === 'fav'){
      this.updateVideosMeetingSearchCriteria();
      this.getVideosFromPage(this.lastPage,this.lastItemsPerPage)
    }

    this.updateLocalStorage();
    
  }







  clearLocalStorage(): void{
    this.videos = [];
    localStorage.setItem(this.keys.videos, JSON.stringify([]));
  }

  private getItemFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  private updateLocalStorage(): void{
    const videos = JSON.stringify(this.videos);
    localStorage.setItem(this.keys.videos, videos);
  }

  private getVideosFromLocalStorage(): void{
    this.videos = JSON.parse(localStorage.getItem(this.keys.videos) || '[]');
    console.log(this.videos)
  }

  private getOptionsFromLocalStorage(): void{
    this.searchOptions = JSON.parse(localStorage.getItem(this.keys.options) || "{}");
    console.log(this.searchOptions)
  }
}
