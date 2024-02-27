import { Component, OnInit, Input } from '@angular/core';
import {Gene} from '../../models';
import { environment} from '../../../environments/environment';

@Component({
  selector: 'app-gene',
  templateUrl: './gene.component.html',
  styleUrls: ['./gene.component.scss']
})


export class GeneComponent implements OnInit {

  mgiGeneUrl = environment.MGI_GENE_URL;

  @Input()
  gene: Gene;

  constructor() { }

  ngOnInit() {
  }

}
