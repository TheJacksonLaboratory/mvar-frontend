import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable, of, BehaviorSubject } from 'rxjs';

const sampleUrl = environment.MMRDB_API_SAMPLE_URL;

@Injectable({
    providedIn: 'root'
})
export class SampleService {

    constructor(private http: HttpClient) {
    }

    updateSample(paramsIn: any): Observable<any> {
        // const formData: FormData = new FormData();
        // formData.append('sample', paramsIn.sample);

        return this.http.post(sampleUrl, {
            sample: paramsIn.sample
        })
    }
}
