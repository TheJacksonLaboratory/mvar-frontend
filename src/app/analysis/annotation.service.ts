import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable, of, BehaviorSubject } from 'rxjs';

const annotatedMutationUrl = environment.MVAR_API_ANNOTATED_MUTATION_URL;
const variantUrl = environment.MVAR_API_VARIANT_URL;

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor(private http: HttpClient) { }

  getVariantAnnotation(paramsIn: any): Observable<any> {

      return this.http.get(annotatedMutationUrl + '/' + paramsIn.id);

  }

  getVariant(paramsIn: any): Observable<any> {

    return this.http.get(variantUrl + '/' + paramsIn.id);

  }

  updateVariantAnnotation(paramsIn: any): Observable<any> {

      const formData: FormData = new FormData();
      formData.append('annotatedMutation', paramsIn.annotatedMutation);
      formData.append('varId', paramsIn.variantId);

      return this.http.post(annotatedMutationUrl, {annotatedMutation: paramsIn.annotatedMutation, varId: paramsIn.variantId})
    }
}
