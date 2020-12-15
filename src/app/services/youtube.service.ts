import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideoApiData } from '@models/video-api-data.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }


  getYoutubeVideoData(id: string): Observable<VideoApiData | undefined>{
    return this.http.get('http://localhost:3000/api/youtube/' + id).pipe(
      map((res: any) => {
        const videoData = res.video.data.items[0];
        if (videoData){
          return this.getModifiedYoutubeVideoData(videoData);
        }
        return;
      })
    );
  }

  private getModifiedYoutubeVideoData(videoData: any): VideoApiData{
    const modifiedData = {
      title: videoData.snippet.title,
      description: videoData.snippet.descpription,
      thumbnail: videoData.snippet.thumbnails.maxres ? videoData.snippet.thumbnails.maxres.url : videoData.snippet.thumbnails.high.url,
      views: videoData.statistics.viewCount
    };
    return modifiedData;
  }
}
