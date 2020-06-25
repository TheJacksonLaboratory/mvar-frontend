import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SvVariant, Variant, VariantAnnotation} from '../../models';
import {AnnotationService} from '../annotation.service';
import { MatInputModule } from '@angular/material/input';

import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-annotated-var',
  templateUrl: './annotated-var.component.html',
  styleUrls: ['./annotated-var.component.scss']
})
export class AnnotatedVarComponent implements OnInit {

  @Input()
  variant: Variant;

  @Input()
  svVariant: SvVariant;

  @Input()
  variantAnnotation: VariantAnnotation;

  @Output()
  closeDialogEvent = new EventEmitter<any>();

  isNewAnnotation = false;
  saveDisabled = true;

    annotationForm = new FormGroup({
        annotation: new FormControl('', [
            Validators.required
        ]),
        status: new FormControl('', [
            Validators.required
        ]),
        notes: new FormControl('', [
            Validators.required
        ]),
    });

      constructor(private annotationService: AnnotationService) {
  }

  ngOnInit() {

      if (! this.variantAnnotation) {
          this.isNewAnnotation = true;
          this.variantAnnotation = new VariantAnnotation();
      } else {
          this.annotationForm.setValue({
              annotation: this.variantAnnotation.annotation,
              status: this.variantAnnotation.status,
              notes: this.variantAnnotation.notes
          })
      }

      console.log("variant = " + this.variant.id)
  }

  getVariant() {
      // get a fresh copy of variant
      const params: any = {}

      if (this.variant) {
          params.id = this.variant.id;
          this.annotationService.getVariant(params).subscribe(data => {
              this.variant = data;
          });
      }

      if (this.svVariant) {
          params.id = this.svVariant.id;
          this.annotationService.getSvVariant(params).subscribe(data => {
              this.svVariant = data;
          });
      }
  }

  saveAnnotation(){

    this.variantAnnotation.sample = this.variant ? this.variant.sample : this.svVariant.sample;
    this.variantAnnotation.isSv = this.svVariant ? 'YES' : 'NO';
    this.variantAnnotation.status = this.annotationForm.controls.status.value;
    this.variantAnnotation.notes = this.annotationForm.controls.notes.value;
    this.variantAnnotation.annotation = this.annotationForm.controls.annotation.value;

    const params: any = {}
    params.variantAnnotation  = this.variantAnnotation;
    params.variantId = this.variant ? this.variant.id : this.svVariant.id;
    this.annotationService.updateVariantAnnotation(params).subscribe(data => {
      console.log(data);

      this.variantAnnotation = data;

      if (this.isNewAnnotation) {
          this.variant.variantAnnotations.push(this.variantAnnotation)
      }
      //this.variantAnnotation = data;
      this.closeDialogEvent.emit(true);
    }, error => {
        console.log(error)
        if (error.status === 403) {
            alert('Insufficient privileges to annotate variants. Please contact laura.reinholdt@jax.org');
        } else {
            alert('An error occurred. Please contact the administrator');
        }
        this.closeDialogEvent.emit(true);

    },  () => {
        this.closeDialogEvent.emit(true);
    });
  }

  onClose(){
      this.closeDialogEvent.emit(true);
  }

}
