import { state } from '@angular/animations';
import { Video } from '@models/video.model';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as VideoActions from '../actions/videos.actions';

export interface State {
  videos: Video[];
}

export const initialState: State = {
    videos: []
};

const videosReducer = createReducer(
    initialState,
    on(VideoActions.addVideo, (state, {video}) => ({...state, videos: [...state.videos, video]})),
    on(VideoActions.deleteVideo, (state, {video}) => ({...state, videos: [
        ...state.videos.slice(0, state.videos.indexOf(video)),
        ...state.videos.slice(state.videos.indexOf(video) + 1)
    ]})),
    on(VideoActions.favourVideo, (state, {video}) => ({...state, videos: [
        ...state.videos,
        video = {...video, favourite: true}
    ]})),
    on(VideoActions.unfavourVideo, (state, {video}) => ({...state, videos: [
        ...state.videos,
        video = {...video, favourite: false}
    ]})),
    on(VideoActions.deleteAllVideos, (state) => ({...state, videos: []})),
    on(VideoActions.setVideos, (state, {videos}) => ({...state, videos: videos}))
);

export function reducer(state: State | undefined, action: Action): State {
    return videosReducer(state, action);
}
