import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { State } from '@appRoot/store/reducers/videos.reducer';
import { Video } from '@models/video.model';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorageSpaceTaken = '';
  maxStorageSpaceInBytes = 5100000;

  savedVideos: Video[] = [];
  storageSpaceEmitter = new EventEmitter<string>();

  constructor(private store: Store<State>){
    store.select('videos').subscribe((storage: any) => {
      this.savedVideos = [...storage.videos];
      this.getLocalStorageSpaceTaken();
    });
  }


  getLocalStorageSpaceTaken(): string {
    let spaceTakenInBytes = 0;
    this.savedVideos.forEach(video => {
      for (const [key, value] of Object.entries(video)) {
        if (value) {
          spaceTakenInBytes += value.toString().length;
        }
      }
    });

    this.localStorageSpaceTaken = (spaceTakenInBytes / this.maxStorageSpaceInBytes).toFixed(5);
    this.storageSpaceEmitter.emit(this.localStorageSpaceTaken);

    return (spaceTakenInBytes / this.maxStorageSpaceInBytes).toFixed(5);
  }

}
