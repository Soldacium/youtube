import { Video } from '@models/video.model';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as VideoActions from '../actions/videos.actions';
import * as SortActions from '../actions/sort-videos.actions';

export interface State {
  videos: Video[];
  searchedVideos: Video[];
  videosMeetingSearchCriteria: Video[];
}

export const initialState: State = {
    videos: [],
    searchedVideos: [],
    videosMeetingSearchCriteria: []
};

const videosReducer = createReducer(
    initialState,
    on(VideoActions.addVideo, (state, {video}) => {
    if (video.id !== ''){
        return({
            ...state,
            videos: [
                ...state.videos,
                video
            ]
        });
    }else{ return({...state}); }
    }),
    on(VideoActions.deleteVideo, (state, {video}) => ({
        ...state,
        videos: [
            ...state.videos.slice(0, state.videos.indexOf(video)),
            ...state.videos.slice(state.videos.indexOf(video) + 1)
        ],
        searchedVideos: [
            ...state.searchedVideos.slice(0, state.searchedVideos.indexOf(video)),
            ...state.searchedVideos.slice(state.searchedVideos.indexOf(video) + 1)
        ]})),
    on(VideoActions.favourVideo, (state, {video}) => ({
        ...state,
        videos: [
            ...state.videos.slice(0, state.videos.indexOf(video)),
            {...video, favourite: true},
            ...state.videos.slice(state.videos.indexOf(video) + 1),
        ]
    })),
    on(VideoActions.unfavourVideo, (state, {video}) => ({
        ...state,
        videos: [
            ...state.videos.slice(0, state.videos.indexOf(video)),
            {...video, favourite: false},
            ...state.videos.slice(state.videos.indexOf(video) + 1),
        ]
    })),
    on(VideoActions.deleteAllVideos, (state) => ({...state, videos: []})),
    on(VideoActions.setVideos, (state, {videos}) => ({
        ...state,
        videos
    })),
    on(VideoActions.setSearchedVideos, (state, {searchedVideos}) => ({
        ...state,
        searchedVideos
    })),
    on(SortActions.reverseSortOrder, (state, ) => ({
        ...state,
        videos: [...state.videos].reverse()
    })),
    on(VideoActions.setVideosMeetingSearchCriteria, (state, {acceptableVideos}) => ({
        ...state,
        videosMeetingSearchCriteria: acceptableVideos
    })),
);

export function reducer(state: State | undefined, action: Action): State {
    return videosReducer(state, action);
}
