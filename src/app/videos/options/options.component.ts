import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  localStorageSpaceTaken = '';

  ngOnInit(): void {
    this.localStorageSpaceTaken = this.localStorageService.localStorageSpaceTaken;
    this.localStorageService.storageSpaceEmitter.subscribe((storageTaken: string) => {
      this.localStorageSpaceTaken = storageTaken;
    });
  }

  clearAllVideos(): void{
    this.localStorageService.clearLocalStorage();
  }

}
