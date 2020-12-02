import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor() { }

  videos = [
    1,2,3,4,5,6
  ]

  ngOnInit(): void {
  }



}
