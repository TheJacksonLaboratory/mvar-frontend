import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {File} from '../models';
import { environment } from '../../environments/environment';


const url = environment.MMRDB_API_VCF_FILE_URL;

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  public getNewFiles(): Observable<any> {

      //return of(this.files);

      return this.http.get(url + '?status=new');
  }

  public getProcessedFiles(): Observable<any> {

      return this.http.get(url + '?status=processed');

  }

  public getPendingFiles(): Observable<any> {

    return this.http.get(url + '?status=pending');

  }

  public downloadFile(id: string){

    const downloadUrl = url + '/' + id + '/download'
    window.open(downloadUrl);

  }

  public deleteFile(id: string){

    return this.http.delete(url + '/' + id);
  }
}
