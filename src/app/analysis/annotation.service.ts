import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable, of, BehaviorSubject } from 'rxjs';

const variantAnnotationUrl = environment.MMRDB_API_VARIANT_ANNOTATION_URL;
const variantUrl = environment.MMRDB_API_VARIANT_URL;
const svVariantUrl = environment.MMRDB_API_SV_VARIANT_URL;

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor(private http: HttpClient) { }

  getVariantAnnotation(paramsIn: any): Observable<any> {

      return this.http.get(variantAnnotationUrl + '/' + paramsIn.id);

  }

  getVariant(paramsIn: any): Observable<any> {

    return this.http.get(variantUrl + '/' + paramsIn.id);

  }

  getSvVariant(paramsIn: any): Observable<any> {

     return this.http.get(svVariantUrl + '/' + paramsIn.id);
  }

  updateVariantAnnotation(paramsIn: any): Observable<any> {

      const formData: FormData = new FormData();
      formData.append('annotatedMutation', paramsIn.variantAnnotation);
      formData.append('varId', paramsIn.variantId);

      return this.http.post(variantAnnotationUrl, {annotatedMutation: paramsIn.variantAnnotation, varId: paramsIn.variantId})
    }
}
