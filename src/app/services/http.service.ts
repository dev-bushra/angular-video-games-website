// Services File

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
  
// HttpSevice Class
export class HttpService {

  constructor(private http: HttpClient) { }

  // GET Request /games : get all games in db
  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    // filter ordering added to the reques params
    let params = new HttpParams().set('ordering', ordering);

    // check if there is a search value
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    // return the data from the api
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  // GET Request /games/:id : get single game form db
  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    // return the single game Info/ScreenShot/Trailer values
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
