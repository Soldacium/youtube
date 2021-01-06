import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, throwError } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { VideoService } from '@services/video.service';
import { YoutubeService } from '@services/youtube.service';
import * as VideoActions from '@store/actions/videos.actions';
import { Video } from '@models/video.model';

const emptyVideo: Video = {
  id: '',
  type: 'yt',
  favourite: false,
  title: '',
  thumbnail: '',
  views: '',
  modifyDate: new Date().toLocaleDateString('en-GB')
};

@Injectable()
export class VideoEffects {
  addVideo$ = createEffect(() =>
  this.actions$.pipe(
    ofType(VideoActions.getVideoFromAPI),
    exhaustMap(action =>
      this.videoService.addVideo(action.id, action.videoType).pipe(
        map((video) => {
            // this.videoService.updateVideosMeetingSearchCriteria();
            return video ? VideoActions.addVideo({video}) : VideoActions.addVideo({video: emptyVideo});
          }
        )
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private videoService: VideoService
  ) {}
}
