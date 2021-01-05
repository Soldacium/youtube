
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import * as fromVideos from '@store/reducers/videos.reducer';
import { metaReducers } from '@store/reducers/meta-reducers.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot({videos: fromVideos.reducer}, {metaReducers})
    ],
    exports: [

    ]
})
export class NgRxStoreModule { }
