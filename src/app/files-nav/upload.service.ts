import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import {Subject, BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import {catchError} from 'rxjs/operators';

const urlVcfFile = environment.MVAR_API_VCF_FILE_URL + '/upload/';


@Injectable({
    providedIn: 'root'
})
export class UploadService {

    url = '';
    paramName = ''
    public isThereFileChanges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public isThereSampleChanges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
    }

    public upload(files: Set<File>, fileType: string, seqSource: string): { [key: string]: { progress: Observable<any> } } {

        this.setCall(fileType)
        // this will be the our resulting map
        const status: { [key: string]: { progress: Observable<any> } } = {};

        files.forEach(file => {
            // create a new multipart-form for every file
            const formData: FormData = new FormData();
            formData.append(this.paramName, file, file.name);

            if (fileType === 'vcf') {
                formData.append('seqSource', seqSource);
            }

            // create a http-post request and pass the form
            // tell it to report the upload progress
            const req = new HttpRequest('POST', this.url, formData, {
                reportProgress: true
            });

            // create a new progress-subject for every file
            const progress = new Subject<any>();

            // send the http-request and subscribe for progress-updates
            const uploadRes$ = this.http.request(req).pipe(
                catchError((err) => {
                    console.log('CATCHING error');
                    progress.next({ data: { errors: [{ message: err.message }] } });
                    progress.complete();

                    status[file.name] = {
                        progress: progress.asObservable()
                    };
                    return of([])
                }));


            uploadRes$.subscribe((event: any) => {
                if (event.type === HttpEventType.UploadProgress) {

                    // calculate the progress percentage
                    const percentDone = Math.round(100 * event.loaded / event.total);

                    // pass the percentage into the progress-stream
                    progress.next({ percentDone: percentDone });
                } else if (event instanceof HttpResponse) {
                    // console.log(event.body)
                    // Close the progress-stream if we get an answer form the API
                    // The upload is complete
                    progress.next({ data: event.body });
                    progress.complete();
                }

                // Save every progress-observable in a map of all observables
                status[file.name] = {
                    progress: progress.asObservable()
                };
            });


        }// end for loop
        );

        // return the map of progress.observables
        return status;
    }

    errorHandler(error: HttpErrorResponse) {
        console.log('errror handler')
        // console.log (error)
        return throwError(() => new Error(error.message || 'Server Error'));
    }

    private setCall(fileType: string) {

        if (fileType === 'vcf') {
            this.url = urlVcfFile;
            this.paramName = 'vcfFile';
        }
    }

}
