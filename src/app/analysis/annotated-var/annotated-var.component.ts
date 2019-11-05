import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Variant, AnnotatedMutation} from '../../models';
import {AnnotationService} from '../annotation.service';
import { MatInputModule } from '@angular/material/input';

import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-annotated-var',
  templateUrl: './annotated-var.component.html',
  styleUrls: ['./annotated-var.component.scss']
})
export class AnnotatedVarComponent implements OnInit {

  @Input()
  variant: Variant;

  @Output()
  closeDialogEvent = new EventEmitter<any>();

  notesFC = new FormControl();
  annotationFC = new FormControl();
  saveDisabled = true;



    annotatedMutation: AnnotatedMutation = new AnnotatedMutation();

  constructor(private annotationService: AnnotationService) { }

  ngOnInit() {

      this.getAnnotatedVariant()

      this.notesFC.valueChanges.subscribe(value => {
          this.annotatedMutation.notes = this.notesFC.value;
          this.valueChanges()
      });

      this.annotationFC.valueChanges.subscribe(value => {
          this.valueChanges()
      });
  }

  valueChanges() {
      if (this.annotatedMutation.status && this.annotatedMutation.notes && this.annotatedMutation.notes.length > 0) {
          this.saveDisabled = false;
      }
  }

  getAnnotatedVariant() {

      const params: any = {}

      if (this.variant.annotatedMutation) {
          params.id = this.variant.annotatedMutation.id;
          this.annotationService.getVariantAnnotation(params).subscribe(data => {
              this.annotatedMutation = data;
          });
      } else {
        this.getVariant()
      }
  }

  getVariant() {
      // get a fresh copy of variant
      const params: any = {}

      if (this.variant) {
          params.id = this.variant.id;
          this.annotationService.getVariant(params).subscribe(data => {
              this.variant = data;

              if (this.variant.annotatedMutation) {
                  this.annotatedMutation = this.variant.annotatedMutation;
              }
          });
      }
  }

  saveAnnotation(){

    this.annotatedMutation.sample = this.variant.sample;
    const params: any = {}
    params.annotatedMutation  = this.annotatedMutation;
    params.variantId = this.variant.id
    this.annotationService.updateVariantAnnotation(params).subscribe(data => {
      console.log(data);
      this.annotatedMutation = data;
    });
    this.saveDisabled = true;
  }

  onClose(){
      this.closeDialogEvent.emit(true);
  }

}
