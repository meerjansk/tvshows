import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShowListComponent } from './show-list.component';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { SimpleChange } from '@angular/core';

const testData = '[{"score":18.912712,"show":{"id":46584,"url":"http://www.tvmaze.com/shows/46584/drama","name":"Drama","type":"Scripted","language":"Spanish","genres":["Drama","Comedy"],"status":"Running","runtime":25,"premiered":"2020-02-04","officialSite":"http://www.rtve.es/playz/drama/","schedule":{"time":"19:00","days":["Tuesday"]},"rating":{"average":null},"weight":0,"network":{"id":147,"name":"RTVE","country":{"name":"Spain","code":"ES","timezone":"Europe/Madrid"}},"webChannel":null,"externals":{"tvrage":null,"thetvdb":376734,"imdb":"tt11341924"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/244/611819.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/244/611819.jpg"},"summary":"<p><b>Drama</b> tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/46584"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/1812874"}}}}]';

describe('ShowListComponent', () => {
  let component: ShowListComponent;
  let fixture: ComponentFixture<ShowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [HttpService, HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.start = 0;
    component.maxItems = 4;
    component.end = component.maxItems;
    component.showsData = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save data received from parent as searchInput to be saved in searchText variable', () => {
    component.ngOnChanges({
      searchInput: new SimpleChange(null, 'Glue', false)
    });
    expect(component.searchText).toEqual('Glue');
  });

  it('should save data received from parent genreInput to be saved in genre variable', () => {
    component.ngOnChanges({
      genreInput: new SimpleChange(null, 'Drama', false)
    });
    expect(component.genre).toEqual('Drama');
  });

  it('should save data received from parent searchResults to be saved in showsData variable', () => {
    component.ngOnChanges({
      searchResults: new SimpleChange(null, JSON.parse(testData), false)
    });
    expect(component.showsData.length).not.toEqual(0);
  });

  it('should set showsData to empty array when no data received from parent for searchResults', () => {
    component.ngOnChanges({
      searchResults: new SimpleChange(null, null, false)
    });
    expect(component.showsData.length).toEqual(0);
  });

  it('Calling Next method should increment start value and end value by 4', () => {
    component.showsData = [1,2,3,4,5,6,7,8,9,0];
    component.next();
    expect(component.start).toEqual(4);
  });

  it('Calling Next method beyond available data should reset end value to max length', () => {
    component.showsData = [1,2,3,4,5,6,7,8,9,0];
    component.start = 8;
    component.end = 10;
    component.next();
    expect(component.start).toEqual(5);
    expect(component.end).toEqual(9);
  });

  it('Calling Prev method should decrement start value and end value by 4', () => {
    component.showsData = [1,2,3,4,5,6,7,8,9,0];
    component.start = 4;
    component.end = 8;
    component.prev();
    expect(component.start).toEqual(0);
    expect(component.end).toEqual(4);
  });

  it('Calling Prev method beyond available data should reset start value to 0', () => {
    component.showsData = [1,2,3,4,5,6,7,8,9,0];
    component.start = 0;
    component.end = 4;
    component.prev();
    expect(component.start).toEqual(0);
    expect(component.end).toEqual(4);
  });

});
