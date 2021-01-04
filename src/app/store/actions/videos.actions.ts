import { Video } from '@models/video.model';
import { createAction, props } from '@ngrx/store';

export const addVideo = createAction(
  '[Videos Page] Add video',
  props<{ video: Video }>()
);

export const deleteVideo = createAction(
    '[Videos Page] Delete video',
    props<{ video: Video }>()
);

export const deleteAllVideos = createAction(
    '[Videos Page] Delete all videos'
);

export const favourVideo = createAction(
    '[Videos Page] Favour video',
    props<{ video: Video }>()
);

export const unfavourVideo = createAction(
    '[Videos Page] Unfavour video',
    props<{ video: Video }>()
);

export const setVideos = createAction(
    '[Videos Page] Set videos',
    props<{ videos: Video[] }>()
);

export const setSearchedVideos = createAction(
    '[Videos Page] Set searched videos',
    props<{ searchedVideos: Video[]}>()
);

