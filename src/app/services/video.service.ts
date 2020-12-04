import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() {
    this.getVideosFromLocalStorage();
   }

  // $client = new Vimeo("{client_id}", "{client_secret}", "{access_token}");

  keys = {
    videos: 'videos'

  };

  localStorage = localStorage;
  videos: Video[] = [];
  searchedVideos = [];



  searchOptions = {
    videos: 'all',
    sort: 'descending',
    display: 'blocks'

  };

  updateSearchOptions(typeOfVideos: string, sortOrder: string, videoDisplay: string): void{
    if (sortOrder !== this.searchOptions.sort){
      this.sortVideosByDate(sortOrder);
    }

    this.searchOptions = {
      videos: typeOfVideos,
      sort: sortOrder,
      display: videoDisplay

    };


  }




  getVideosFromLocalStorage(){
    this.videos = JSON.parse(localStorage.getItem(this.keys.videos) || '[]');
    console.log(this.videos)
  }

  sortVideosByDate(order: string){
    if (order === 'descending'){

    }else{

    }
  }

  getVideosFromPage(page: number, itemsPerPage: number){

    const videosGotten = [];
    const min = (page) * itemsPerPage;

    for (let i = min; i < min + itemsPerPage; i++){
      if (this.videos[i]){
        this.getVideoInfo(this.videos[i].id, this.videos[i].type);
        videosGotten.push(this.videos[i]);
      }
    }

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

  addVideo(id: string, type: string){
    const video: Video = {
      id,
      type,
      favourite: false,
      modifyDate: Date.now()
    };

    this.videos.push(video);
    this.updateLocalStorage();
    console.log(this.videos, video);
  }

  deleteVideo(id: string){
    this.videos.filter(video => video.id !== id);
    this.updateLocalStorage();
  }

  clearLocalStorage(){
    this.videos = [];
    localStorage.setItem(this.keys.videos, JSON.stringify([]));
  }

  makeVideoFavourite(id: string){

  }


  private updateLocalStorage(){
    const videos = JSON.stringify(this.videos);
    localStorage.setItem(this.keys.videos, videos);
  }
}
