import { Component, OnInit, Input } from '@angular/core';
import { environment} from '../../../environments/environment';
import {Strain} from '../../models';

@Component({
  selector: 'app-strain',
  templateUrl: './strain.component.html',
  styleUrls: ['./strain.component.scss']
})
export class StrainComponent implements OnInit {

  mgiStrainUrl = environment.MGI_STRAIN_URL;

  @Input()
  strain: Strain;

  constructor() { }

  ngOnInit() {
  }

}
