import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() callbackData = new EventEmitter<string>();

  src:string="";

  constructor() { }

  ngOnInit(): void {
  }

  callSearch(term: string):void{

    if(term.length >= 3){
      // console.log(term);
      this.callbackData.emit(term);
    }
    
  }

}
