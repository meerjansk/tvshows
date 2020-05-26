import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowsService } from '../services/shows.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
  id: any;
  showDetails: any;
  displayDetails: boolean = false;
  hasError: boolean = false;
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private shows: ShowsService
  ) { }

  // Get id from params and call API to get Show details
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.isLoading = true;
    this.shows.getDetails(this.id).subscribe(
      (data) => {
        this.showDetails = data;
        this.displayDetails = true;
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
