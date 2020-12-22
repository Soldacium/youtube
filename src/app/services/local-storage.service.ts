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

  savedVideos: Video[] = [];
  storageSpaceEmitter = new EventEmitter<string>();

  constructor() { }

  addVideoToLocalStorage(video: Video): void{
    this.savedVideos.push(video);
    this.updateLocalStorage();
  }

  deleteVideoFromLocalStorage(id: string): void{
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);
    if (video){
      this.savedVideos.splice(this.savedVideos.indexOf(video), 1);
      this.updateLocalStorage();
    }
  }

  setVideoAsFavourite(id: string): void{
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);
    if (video){
      video.favourite = true;
    }
    this.updateLocalStorage();
  }

  setVideoAsNotFavourite(id: string): void {
    const video = this.savedVideos.find(savedVideo => savedVideo.id === id);
    if (video){
      video.favourite = false;
    }
    this.updateLocalStorage();
  }

  clearLocalStorage(): void{
    localStorage.setItem(this.storageKeys.videos, JSON.stringify([]));
    this.getLocalStorageSpaceTaken();
  }

  getLocalStorageSpaceTaken(): string{
    let spaceTaken = 0;
    this.savedVideos.forEach(video => {
      for (const [key, value] of Object.entries(video)) {
        if (value){
          spaceTaken += value.toString().length;
        }
      }
    });

    this.localStorageSpaceTaken = (spaceTaken / 5100000).toFixed(5);
    this.storageSpaceEmitter.emit(this.localStorageSpaceTaken);

    return (spaceTaken / 5100000).toFixed(5);
  }

  updateLocalStorage(): void{
    const videos = JSON.stringify(this.savedVideos);
    localStorage.setItem(this.storageKeys.videos, videos);
    this.getLocalStorageSpaceTaken();
  }

  getVideosFromLocalStorage(): Video[]{
    this.savedVideos = JSON.parse(localStorage.getItem(this.storageKeys.videos) || '[]');
    this.getLocalStorageSpaceTaken();

    return this.savedVideos;
  }
}