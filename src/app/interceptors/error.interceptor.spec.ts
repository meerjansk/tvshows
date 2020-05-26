import { TestBed, async } from '@angular/core/testing';
import { ErrorInterceptor } from './error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let service: HttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        ErrorInterceptor,
        HttpService, 
        HttpClient, 
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
      ]
    });
    interceptor = TestBed.inject(ErrorInterceptor);
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should update errorMessage with error code when there is error in Http Request / Response', async(() => {
    service.get('http://api.tvmaze.com/search/shows?page=1').subscribe(
    () => {}, 
    (error) => {
      expect(error).toContain('Error Code');
    });
  }));
});
