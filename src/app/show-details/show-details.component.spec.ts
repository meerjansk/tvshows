import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ShowDetailsComponent } from './show-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

const testData = '{"id":46584,"url":"http://www.tvmaze.com/shows/46584/drama","name":"Drama","type":"Scripted","language":"Spanish","genres":["Drama","Comedy"],"status":"Running","runtime":25,"premiered":"2020-02-04","officialSite":"http://www.rtve.es/playz/drama/","schedule":{"time":"19:00","days":["Tuesday"]},"rating":{"average":null},"weight":0,"network":{"id":147,"name":"RTVE","country":{"name":"Spain","code":"ES","timezone":"Europe/Madrid"}},"webChannel":null,"externals":{"tvrage":null,"thetvdb":376734,"imdb":"tt11341924"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/244/611819.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/244/611819.jpg"},"summary":"<p><b>Drama</b> tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/46584"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/1812874"}}}';

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDetailsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [HttpService, HttpClient, {provide: ActivatedRoute, useValue: {
        paramMap: of(convertToParamMap({id: 123}))
      }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call API to get Show details', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testData)));
    component.ngOnInit();
    expect(typeof(component.showDetails)).toBe('object');  
  });

  it('should call API to get Show details', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(throwError('error'));
    component.ngOnInit();
    expect(component.hasError).toBeTruthy();  
  });

});
