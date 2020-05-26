import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnChanges {
  @Input() searchResults: any = [];
  @Input() searchInput: any = [];
  @Input() genreInput: string;
  showsData: any = [];
  showsDataDrama: any = [];
  showsDataSports: any = [];
  showsDataComedy: any  [];
  start = 0;
  maxItems = 4;
  end = this.maxItems;
  genre: string;
  
  isLoading: boolean = false;
  searchText: string;
  hasError: boolean = false;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    
  }
  // Receive input params from parent and store in variables
  ngOnChanges(changes: any) {
    if (changes['searchInput']) {
      this.searchText = changes['searchInput'].currentValue;
    } 
    if (changes['genreInput']) {
      this.genre = changes['genreInput'].currentValue;
      console.log(this.genre);
    } 
    if (changes['searchResults']) {
      this.showsData = changes['searchResults'].currentValue ? changes['searchResults'].currentValue : [];
    }
  }
  // Display previous items fetched from API based on maxItems defined
  prev() {
    this.start -= this.maxItems;
    this.end -= this.maxItems;
    if (this.start < 0) {
      this.start = 0;
      this.end = this.maxItems;
    }
  }
  // Display next items fetched from API based on maxItems defined
  next() {
    this.start += this.maxItems;
    this.end += this.maxItems;
    if (this.end >= this.showsData.length) {
      this.start = this.showsData.length-(this.maxItems + 1);
      this.end = this.showsData.length-1;
    }
  }
}
