import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { HomeComponent } from './home.component';

const testData = '[{"id":46584,"url":"http://www.tvmaze.com/shows/46584/drama","name":"Drama","type":"Scripted","language":"Spanish","genres":["Drama","Comedy","Sports"],"status":"Running","runtime":25,"premiered":"2020-02-04","officialSite":"http://www.rtve.es/playz/drama/","schedule":{"time":"19:00","days":["Tuesday"]},"rating":{"average":null},"weight":0,"network":{"id":147,"name":"RTVE","country":{"name":"Spain","code":"ES","timezone":"Europe/Madrid"}},"webChannel":null,"externals":{"tvrage":null,"thetvdb":376734,"imdb":"tt11341924"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/244/611819.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/244/611819.jpg"},"summary":"<p><b>Drama</b> tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/46584"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/1812874"}}}]';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [HttpService, HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return data on page load', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testData)));
    component.getShows();
    spyOn(component.showsData, 'sort');
    expect(component.showsData.length).toEqual(1);
    expect(component.showsDataDrama.length).toBeGreaterThan(0);
    expect(component.showsDataComedy.length).toBeGreaterThan(0);
    expect(component.showsDataSports.length).toBeGreaterThan(0);
  });

  it('should show error when API call returns an error', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(throwError('error'));
    component.getShows();
    expect(component.hasError).toBeTruthy();
  });

  it('should return data on proper input', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testData)));
    component.getSearchResults('glue');
    expect(component.searchResults.length).toBeGreaterThan(0);
  });

  it('should show error when API call returns an error', () => {
    spyOn(HttpService.prototype, 'get').and.returnValue(throwError('error'));
    component.getSearchResults('glue');
    expect(component.hasError).toBeTruthy();
  });

  it('Should call getSearchResults method after some data entered and idle for 1sec', fakeAsync(() => {
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testData)));
    component.searchInput = 'Glue';
    component.keyupEvent();
    tick(1000);
    expect(component.searchResults.length).toBeGreaterThan(0);
  }));

  it('Should call getShows method after deleting text from search input', fakeAsync(() => {
    spyOn(HttpService.prototype, 'get').and.returnValue(of(JSON.parse(testData)));
    component.searchInput = 'Glue';
    component.keyupEvent();
    tick(1000);
    component.searchInput = '';
    component.keyupEvent();
    tick(1000);
    expect(component.showsData.length).toBeGreaterThan(0);
    expect(component.showsDataDrama.length).toBeGreaterThan(0);
    expect(component.showsDataComedy.length).toBeGreaterThan(0);
    expect(component.showsDataSports.length).toBeGreaterThan(0);
  }));
});
