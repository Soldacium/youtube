import { Injectable } from '@angular/core';
import { Video } from '../models/video.model'


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }

  //$client = new Vimeo("{client_id}", "{client_secret}", "{access_token}");

  keys = {
    settings: 'sett',
    videos: 'aa'

  };

  localStorage = localStorage;
  videos: Video[] = [];


  getVideoInfo(id: string){


    return;
  }

  getAllVideos(){
    this.videos = JSON.parse(localStorage.getItem(this.keys.videos) || '{}');
  }

  sortVideosByDate(){

  }

  getVideosFromPage(page: number){

  }

  addVideo(id: string, address: string, type: string){
    const video: Video = {
      id: id,
      type: type,
      favourite: false,
      modifyDate: new Date()
    }

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
