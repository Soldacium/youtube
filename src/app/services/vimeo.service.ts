import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideoApiData } from '@models/video-api-data.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  constructor(private http: HttpClient) { }

  getVimeoVideoData(id: string): Observable<VideoApiData | undefined>{
    return this.http.get('http://localhost:3000/api/vimeo/' + id).pipe(
      map((res: any) => {
        const videoData = res.data;
        if (videoData.app){
          return this.getModifiedVimeoVideoData(videoData);
        }
        return;
      })
    );
  }

  private getModifiedVimeoVideoData(videoData: any): VideoApiData{
    const modifiedData = {
      title: videoData.name,
      description: videoData.descpription,
      thumbnail: videoData.pictures.sizes[videoData.pictures.sizes.length - 2].link,
      views: videoData.stats.plays === null ? '' : videoData.stats.plays
    };
    return modifiedData;
  }
}
