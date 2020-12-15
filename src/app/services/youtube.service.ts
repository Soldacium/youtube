import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }


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
}
