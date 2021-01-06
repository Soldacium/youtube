import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideoTypes } from '@models/video-types.model';
import { Video } from '@models/video.model';
import { YoutubeApiResponse } from '@models/youtube-api-reponse.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  getYoutubeVideoData(id: string, type: VideoTypes): Observable<Video | undefined> {
    return this.http.get<YoutubeApiResponse>('http://localhost:3000/api/youtube/' + id).pipe(
      map((res: YoutubeApiResponse) => {
        if (res) {
          return this.getModifiedYoutubeVideoData(res, id, type);
        }
        return;
      })
    );
  }

  private getModifiedYoutubeVideoData(videoData: YoutubeApiResponse, id: string, type: VideoTypes): Video {
    const modifiedData: Video = {
      id,
      type,
      favourite: false,
      title: videoData.snippet.title,
      thumbnail: videoData.snippet.thumbnails.maxres ? videoData.snippet.thumbnails.maxres.url : videoData.snippet.thumbnails.high.url,
      views: videoData.statistics.viewCount.toString(),
      modifyDate: new Date().toLocaleDateString('en-GB')
    };
    return modifiedData;
  }
}
