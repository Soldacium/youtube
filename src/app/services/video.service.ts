import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }

  // $client = new Vimeo("{client_id}", "{client_secret}", "{access_token}");

  keys = {
    settings: 'sett',
    videos: 'aa'

  };

  localStorage = localStorage;
  videos: Video[] = [];
  searchedVideos = [];



  searchOptions = {
    videos: 'all',
    sort: 'descending',
    display: 'blocks'

  };

  updateSearchOptions(typeOfVideos: string, sortOrder: string, videoDisplay: string){
    if (sortOrder !== this.searchOptions.sort){
      this.sortVideosByDate(sortOrder);
    }

    this.searchOptions = {
      videos: typeOfVideos,
      sort: sortOrder,
      display: videoDisplay

    };


  }


  getVideoInfo(id: string){


    return;
  }

  getAllVideos(){
    this.videos = JSON.parse(localStorage.getItem(this.keys.videos) || '{}');
  }

  sortVideosByDate(order: string){
    if (order === 'descending'){

    }else{

    }
  }

  getVideosFromPage(page: number, itemsPerPage: number){

    const min = (page - 1) * itemsPerPage;

    for (let i = min; i < min + itemsPerPage; i++){
      if (this.videos[i]){
        this.getVideoInfo(this.videos[i].id);
      }
    }

    return [];
  }

  checkIfVideoExists(id: string, type: string){

  }

  addVideo(id: string, type: string){
    const video: Video = {
      id,
      type,
      favourite: false,
      modifyDate: new Date()
    };

    this.videos.push(video);
    this.updateLocalStorage();
  }

  deleteVideo(id: string){
    this.videos.filter(video => video.id !== id);
    this.updateLocalStorage();
  }

  makeVideoFavourite(){

  }


  private updateLocalStorage(){
    const videos = JSON.stringify(this.videos);
    localStorage.setItem(this.keys.videos, videos);
  }
}
