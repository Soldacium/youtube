import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Video } from '../models/video.model';
import { map } from 'rxjs/operators';
import { LoadedVideos } from '../models/loadedVideo.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) {
    this.getVideosFromLocalStorage();
    // this.getOptionsFromLocalStorage();
   }

  localStorage = localStorage;
  keys = {
    videos: 'videos',
    options: 'options'
  };

  lastPage = 0;
  lastItemsPerPage = 0;




  savedVideos: Video[] = [];
  loadedVideos = new Map([]);
  videosMeetingSearchCriteria: Video[] = [];
  searchedVideos: any[] = [];
  searchedVideosChange = new EventEmitter<any[]>();

  errorEmitter = new EventEmitter<string>();



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
        videos = this.savedVideos;
        break;
      case 'fav':
        videos = this.savedVideos.filter(video => video.favourite === true);
        break;
      case 'yt':
        videos = this.savedVideos.filter(video => video.type === 'yt');
        break;
      case 'vimeo':
        videos = this.savedVideos.filter(video => video.type === 'vimeo');
        break;
      default:
        break;
    }

    this.videosMeetingSearchCriteria = videos;
    this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
  }

  // that's enough for now as all videos are already sorted by date;
  sortVideosByDate(){
    this.savedVideos.reverse();
    this.updateVideosMeetingSearchCriteria();
  }






  getVideosFromPage(page: number, itemsPerPage: number): any[]{

    this.lastItemsPerPage = itemsPerPage;
    this.lastPage = page;

    const videosGotten = [];
    const min = (page) * itemsPerPage;

    for (let i = min; i < min + itemsPerPage; i++){
      const video = this.videosMeetingSearchCriteria[i];

      if (video){
        videosGotten.push(video);
      }
    }

    this.searchedVideos = videosGotten;

    this.searchedVideosChange.emit(this.searchedVideos);
    return videosGotten;
  }

  getVideoInfo(id: string, type: string){

    return type === 'yt' ? this.getYoutubeVideoData(id) : this.getVimeoVideoData(id);
  }

  getVimeoVideoData(id: string): Observable<any>{
    return this.http.get('http://localhost:3000/api/vimeo/' + id).pipe(
      map((res: any) => {

        if (res.data.app){

          const videoData = res.data;

          return {
            title: videoData.name,
            description: videoData.descpription,
            thumbnail: videoData.pictures.sizes[videoData.pictures.sizes.length - 2].link,
            views: videoData.stats.plays
          };
        }
        return;

      })
    );

  }

  getYoutubeVideoData(id: string): Observable<any>{

    return this.http.get('http://localhost:3000/api/youtube/' + id).pipe(
      map((res: any) => {
        if (res.video.data.items[0]){
          const videoData = res.video.data.items[0].snippet;
          // console.log(res.video.data.items[0])

          return {
            title: videoData.title,
            description: videoData.descpription,
            thumbnail: videoData.thumbnails.maxres.url,
            views: res.video.data.items[0].statistics.viewCount

          };
        }
        return;
      })
    );
  }







  checkIfVideoExists(id: string, type: string){

  }

  addVideo(id: string, type: string): void{

    const videoData =  type === 'yt' ? this.getYoutubeVideoData(id) : this.getVimeoVideoData(id);
    videoData.subscribe((videoData: any) => {
      if (videoData){
        // console.log(videoData)
        const video: Video = {
          id,
          type,
          favourite: false,
          title: videoData.title,
          thumbnail: videoData.thumbnail,
          views: videoData.views,
          modifyDate: Date.now()
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
    const video = this.savedVideos.find(video => video.id === id);
    if (video){
      this.savedVideos.splice(this.savedVideos.indexOf(video), 1);
      this.searchedVideos.splice(this.searchedVideos.indexOf(video), 1);
      this.updateLocalStorage();
    }
  }







  setVideoAsFavourite(id: string): void{
    const video = this.savedVideos.find(video => video.id === id);
    if (video){
      video.favourite = true;
    }

    if (this.searchOptions.videos === 'fav'){
      this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
    }

    this.updateLocalStorage();
  }

  setVideoAsNotFavourite(id: string): void {
    const video = this.savedVideos.find(video => video.id === id);

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
    this.savedVideos = [];
    localStorage.setItem(this.keys.videos, JSON.stringify([]));
    this.getVideosFromPage(0, this.lastItemsPerPage);
  }

  private getItemFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  private updateLocalStorage(): void{
    const videos = JSON.stringify(this.savedVideos);
    localStorage.setItem(this.keys.videos, videos);
  }

  private getVideosFromLocalStorage(): void{
    this.savedVideos = JSON.parse(localStorage.getItem(this.keys.videos) || '[]');
  }

  private getOptionsFromLocalStorage(): void{
    this.searchOptions = JSON.parse(localStorage.getItem(this.keys.options) || '{}');
  }
}
