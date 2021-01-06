import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideoApiData } from '@models/video-api-data.model';
import { VideoTypes } from '@models/video-types.model';
import { Video } from '@models/video.model';
import { VimeoApiResponse } from '@models/vimeo-api-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  constructor(private http: HttpClient) { }

  getVimeoVideoData(id: string, type: VideoTypes): Observable<Video | undefined> {
    return this.http.get<VimeoApiResponse>('http://localhost:3000/api/vimeo/' + id).pipe(
      map((res: VimeoApiResponse) => {
        if (res.uri) {
          return this.getModifiedVimeoVideoData(res, id, type);
        }
        return;
      })
    );
  }

  private getModifiedVimeoVideoData(videoData: VimeoApiResponse, id: string, type: VideoTypes): Video {
    const modifiedData: Video = {
      id,
      type,
      favourite: false,
      title: videoData.name,
      thumbnail: videoData.pictures.sizes[videoData.pictures.sizes.length - 2].link,
      views: videoData.stats.plays === null ? '' : videoData.stats.plays.toString(),
      modifyDate: new Date().toLocaleDateString('en-GB')
    };
    return modifiedData;
  }
}
