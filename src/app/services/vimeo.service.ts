import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  constructor(private http: HttpClient) { }

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
}
