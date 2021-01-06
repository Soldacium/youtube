
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { VideoEffects } from '@store/effects/videos.effects';

import * as fromVideos from '@store/reducers/videos.reducer';
import { metaReducers } from '@store/reducers/meta-reducers.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot({videos: fromVideos.reducer, searchedVideos: fromVideos.reducer}, {metaReducers}),
        EffectsModule.forRoot([VideoEffects])
    ]
})
export class NgRxStoreModule { }
