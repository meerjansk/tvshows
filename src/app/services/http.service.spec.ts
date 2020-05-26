import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', async(() => {
    service.get('http://api.tvmaze.com/shows/1234').subscribe(
      (data) => {
        expect(typeof(data)).toEqual('object');
      }
    );
  }));
  it('should return error', async(() => {
    service.get('http://api.tvmaze.com/search/shows?page=1').subscribe(
      () => {},
      (error) => {
        expect(typeof(error)).toEqual('object');
      }
    );
  }));
});
