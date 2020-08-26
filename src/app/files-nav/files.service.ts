import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {File} from '../models';
import { environment } from '../../environments/environment';


const url = environment.MVAR_API_VCF_FILE_URL;
const sampleUrl = environment.MVAR_API_SAMPLE_URL;

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  public getNewFiles(): Observable<any> {

      return this.http.get(url + '?status=new');
  }

  public getProcessedFiles(): Observable<any> {

      return this.http.get(url + '?status=processed');

  }

  public getPendingFiles(): Observable<any> {

    return this.http.get(url + '?status=pending');

  }

  public getErrorFiles(): Observable<any> {

    return this.http.get(url + '?status=error');

  }

  public downloadFile(id: string){

    const downloadUrl = url + '/' + id + '/download'
    window.open(downloadUrl);

  }

  public deleteFile(id: string){

    return this.http.delete(url + '/' + id);
  }

  public loadVcfFiles(files: string[], varType: string){
      return this.http.get(sampleUrl + '/loadVcf', {params: {vcfFile: files, varType: varType}});
  }
}
