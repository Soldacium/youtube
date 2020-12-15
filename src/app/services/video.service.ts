import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Video } from '@models/video.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VideoService {


  constructor(private http: HttpClient) {
    this.getVideosFromLocalStorage();
    this.getLocalStorageSpaceTaken();
   }

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
  searchedVideos: any[] = [];
  searchedVideosChange = new EventEmitter<any[]>();
  optionsChange = new EventEmitter<object>();

  errorEmitter = new EventEmitter<string>();

  storageSpaceEmitter = new EventEmitter<string>();



  searchOptions = {
    videos: 'all',
    sort: 'descending',
    display: 'blocks'

  };

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
      videos: typeOfVideos,
      sort: sortOrder,
      display: videoDisplay
    };
    this.optionsChange.emit(this.searchOptions);

    this.updateVideosMeetingSearchCriteria();
  }



  updateVideosMeetingSearchCriteria(): void{
    this.videosMeetingSearchCriteria = this.getVideosBySearchOption(this.searchOptions.videos);
    this.getVideosFromPage(this.lastPage, this.lastItemsPerPage);
  }

  private getVideosBySearchOption(allowedVideosType: string): Array<Video>{
    switch (allowedVideosType) {
      case 'all':
        return this.savedVideos;
      case 'fav':
        return this.savedVideos.filter(video => video.favourite === true);
      case 'yt':
        return this.savedVideos.filter(video => video.type === 'yt');
      case 'vimeo':
        return this.savedVideos.filter(video => video.type === 'vimeo');
      default:
        return [];
    }
  }

  getVideosMeetingSearchCriteriaLength(): number{
    return this.videosMeetingSearchCriteria.length;
  }

  sortVideosByDate(): void{
    this.savedVideos.reverse();
  }






  getVideosFromPage(page: number, itemsPerPage: number): any[]{

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
          console.log(res.video.data.items[0]);
          return {
            title: videoData.title,
            description: videoData.descpription,
            thumbnail: videoData.thumbnails.maxres ? videoData.thumbnails.maxres.url : videoData.thumbnails.high.url,
            views: res.video.data.items[0].statistics.viewCount
          };
        }
        return;
      })
    );
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
    this.searchedVideos = [];
    this.savedVideos = [];
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

    this.localStorageSpaceTaken = (spaceTaken / 5100000).toFixed(5);
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
