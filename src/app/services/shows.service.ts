import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  isLoading:boolean = false;
  showsData:any = [];
  constructor(
    private httpService: HttpService
  ) { }
  // Below method fetches all shows from tvmaze API
  getAllShows() {
    return this.httpService.get(environment.url + '/shows?page=1');
  }
  // Below method fetch results based on the input text provided
  search(searchText: string) {
    return this.httpService.get(environment.url + '/search/shows?q=' + searchText);
  }
  // Below method fetch details based on the show id provided
  getDetails(id: number) {
    return this.httpService.get(environment.url + '/shows/' + id);
  }
}
