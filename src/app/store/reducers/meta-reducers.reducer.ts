import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

// const reducers: ActionReducerMap<State> = {todos, visibilityFilter};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [{videos: ['videos', 'searchedVideos', 'videosMeetingSearchCriteria']}],
    rehydrate: true,
    storage: localStorage})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
