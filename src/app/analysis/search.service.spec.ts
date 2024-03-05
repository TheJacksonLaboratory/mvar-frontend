import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Source} from '../models';
import {environment} from '../../environments/environment';

describe('SearchService', () => {

  let service: SearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
    service = TestBed.inject(SearchService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO add tests for each endpoint

  it('gets mvar sources', () => {
    let result: Source[];
    const url = `${environment.MVAR_API_API_STAT_SOURCES_URL}`;
    service.getSources();
    service.sourcesSubject.subscribe(sources => {
      result = sources;
    });
    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush([]);
    httpTestingController.verify();
  });
});
