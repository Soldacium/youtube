
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import * as fromVideos from '@store/reducers/videos.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot({videos: fromVideos.reducer})
    ],
    exports: [

    ]
})
export class NgRxStoreModule { }
