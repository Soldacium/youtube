import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideoApiData } from '@models/video-api-data.model';
import { VimeoApiResponse } from '@models/vimeo-api-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  constructor(private http: HttpClient) { }

  getVimeoVideoData(id: string): Observable<VideoApiData | undefined> {
    return this.http.get<VimeoApiResponse>('http://localhost:3000/api/vimeo/' + id).pipe(
      map((res: VimeoApiResponse) => {
        if (res.uri){
          return this.getModifiedVimeoVideoData(res);
        }
        return;
      })
    );
  }

  private getModifiedVimeoVideoData(videoData: VimeoApiResponse): VideoApiData {
    const modifiedData = {
      title: videoData.name,
      description: videoData.description,
      thumbnail: videoData.pictures.sizes[videoData.pictures.sizes.length - 2].link,
      views: videoData.stats.plays === null ? null : videoData.stats.plays
    };
    return modifiedData;
  }
}
