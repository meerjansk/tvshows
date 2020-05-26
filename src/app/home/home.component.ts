import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ShowsService } from '../services/shows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchInput: string = '';
  showsData: any = [];
  searchResults: any = [];
  showsDataDrama: any = [];
  showsDataSports: any = [];
  showsDataComedy: any  [];
  isLoading: boolean = false;
  hasError: boolean = false;
  timer: any;
  constructor(private shows: ShowsService) { }

  ngOnInit(): void {
    this.getShows();
  }
  // Below method fetches all the shows in page1 from tvmaze API and split returned data based on genre
  getShows() {
    this.isLoading = true;
    this.shows.getAllShows().subscribe(
      (data) => {
        this.showsData = data;
        this.showsData.sort((a, b) => a.rating.average > b.rating.average ? -1 : 1 );
        this.showsDataDrama = this.showsData.filter(item => item.genres.indexOf('Drama') >= 0);
        this.showsDataComedy = this.showsData.filter(item => item.genres.indexOf('Comedy') >= 0);
        this.showsDataSports = this.showsData.filter(item => item.genres.indexOf('Sports') >= 0);
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  // Below method triggers when user starts entering text in search box
  keyupEvent() {
    // Debounce Keyup event
    this.isLoading = true;
    clearTimeout(this.timer);
    let _this = this;
    this.timer = setTimeout(function(){
      if (_this.searchInput) {
        _this.getSearchResults(_this.searchInput);
      } else {
        _this.getShows();
      }
    },1000);
  }
  // Below method fetches results for the text entered in Seach Input box
  getSearchResults(searchText: string) {
    this.shows.search(searchText).subscribe(
      (data) => {
        this.searchResults = data;
        this.searchResults = this.searchResults.map(item => item.show);
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
