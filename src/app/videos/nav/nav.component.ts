import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  mode = '';


  sorts = [
    {value: 'descending', viewValue: 'Descending'},
    {value: 'ascending', viewValue: 'Ascending'},
  ];
 
  

  ngOnInit(): void {
  }

  setDisplayMode(mode: string){
    if(this.mode !== mode){
      this.mode == mode;
    }else{
      this.mode == 'all';
    }

    console.log('lol')
  }


  

}
