import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ShowsService } from './shows.service';
import { HttpClient } from '@angular/common/http';

describe('ShowsService', () => {
  let service: ShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(ShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
