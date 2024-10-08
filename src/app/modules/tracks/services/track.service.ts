import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { map, mergeMap, observable, Observable, of, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(
    private httpClient: HttpClient
  ) { 
    
  }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]>{
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }

  getAllTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map((dataRaw:any)=>{
        return dataRaw.data;
      }),
      catchError((err)=>{
        const { status, statusText } = err;
        console.log('Algo paso en AllTracks', status, statusText);
        return of([])
      })
    );
  }

  getAllRandom$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      mergeMap(({data}:any) => this.skipById(data, 2)),
      catchError((err) => {
        const { status, statusText } = err;
        console.log('Algo paso en RandomTracks ', status, statusText);
        return of([])
      })
    );
  }
}
