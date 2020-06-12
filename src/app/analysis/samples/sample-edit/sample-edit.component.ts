import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Sample} from '../../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SampleService} from "../../sample.service";

@Component({
    selector: 'app-sample-edit',
    templateUrl: './sample-edit.component.html',
    styleUrls: ['./sample-edit.component.scss']
})
export class SampleEditComponent implements OnInit {

    @Input()
    sample: Sample;

    @Output()
    closeDialogEvent = new EventEmitter<any>();

    chromosomes = [{value: '', viewValue: ''},
        {value: '1', viewValue: '1'},
        {value: '2', viewValue: '2'},
        {value: '3', viewValue: '3'},
        {value: '4', viewValue: '4'},
        {value: '5', viewValue: '5'},
        {value: '6', viewValue: '6'},
        {value: '7', viewValue: '7'},
        {value: '8', viewValue: '8'},
        {value: '9', viewValue: '9'},
        {value: '10', viewValue: '10'},
        {value: '11', viewValue: '11'},
        {value: '12', viewValue: '12'},
        {value: '13', viewValue: '13'},
        {value: '14', viewValue: '14'},
        {value: '15', viewValue: '15'},
        {value: '16', viewValue: '17'},
        {value: '18', viewValue: '18'},
        {value: '19', viewValue: '19'},
        {value: 'X', viewValue: 'X'},
        {value: 'Y', viewValue: 'Y'},
        {value: 'MT', viewValue: 'MT'}];


    sampleForm = new FormGroup({
        jaxRegistryId: new FormControl('', [
            //Validators.required
        ]),
        newMutantId: new FormControl('', [
            //Validators.required
        ]),
        chrLinkage: new FormControl('', [
            //Validators.required
        ]),
    });

    constructor(private sampleService: SampleService) {
    }

    ngOnInit() {
        console.log(this.sample)
        this.sampleForm.setValue({
            jaxRegistryId: this.sample.jaxRegistryId ? this.sample.jaxRegistryId : '',
            newMutantId: this.sample.newMutantId ? this.sample.newMutantId : '',
            chrLinkage: this.sample.chrLinkage ? this.sample.chrLinkage : ''
        })
    }

    onClose() {
        this.closeDialogEvent.emit(true);
    }

    saveSample() {


        this.sample.chrLinkage = this.sampleForm.controls.chrLinkage.value;
        this.sample.jaxRegistryId = this.sampleForm.controls.jaxRegistryId.value;
        this.sample.newMutantId = this.sampleForm.controls.newMutantId.value;

        console.log(this.sample)
        const params: any = {}
        params.sample  = this.sample;
        this.sampleService.updateSample(params).subscribe(data => {
            console.log(data);

        }, error => {
            console.log(error.status)
            if (error.status === 403){
                alert('Insufficient privileges to update sample metadata. Please contact laura.reinholdt@jax.org');
            } else {
                alert('An error occurred. Please contact the administrator');
            }

            this.closeDialogEvent.emit(true);
            console.log(error)
        },  () => {
            this.closeDialogEvent.emit(true);
        });
    }
}
