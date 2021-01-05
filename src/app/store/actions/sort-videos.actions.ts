import { createAction, props } from '@ngrx/store';

export const reverseSortOrder = createAction(
    '[Videos Page] Reverse sort order'
);

export const sortVideosAscending = createAction(
    '[Videos Page] Sort videos ascending'
);
