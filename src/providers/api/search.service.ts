import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import BASE_API from './BASE_API';
import { SearchGet } from '../../interfaces';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  get(tag: string, pageNumber: number = 0): Observable<SearchGet> {
    return this.http.get<SearchGet>(
      `${BASE_API}flickr.photos.search&tags=${tag}&per_page=10&page=${pageNumber}`
    );
  }
}
