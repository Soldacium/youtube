import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  constructor() { }

  @Input() link = '';

  ngOnInit(): void {
  }

}
