export interface File {
  id: number;
  name: string;
  extension: string;
  status: string;
}

export class Gene {
  id: number;
  name: string;
  type: string;
  chr: string;
  symbol: string;
  mgiId: string;

  constructor() {
  }
}

export class Phenotype {

  id: number;
  mpTermIdentifier;
  mpTermName;
  mpTermDescription;
}

export class  Sample {
  id: number;
  sampleId: string;
  jaxStrainId: string;
  inheritance: string;
  sampleName: string;
  limsSampleName: string;
  genotype: string;
  researcher: string;
  study: string;
  chrLinkage: string;
  fileName: string;
  phenotypeStatus; string;
  platform: string;
  strainOfOrigin: string;
  phenotypes: Phenotype[];
  // genomeBuild

  constructor() { }
}

export class Variant {
  id: number;
  gene: Gene;
  chr: string;
  ref: string;
  alt: string;
  pos: number;
  type: string;
  sample: Sample;
  functionalClass: string;
  impact: string;
  filter: string;
  candidate: string;
  sampleCount: number;

  constructor() {
    this.gene = new Gene();
    this.sample = new Sample();
  }

  public setGene(gene: Gene) {
    this.gene = gene;
  }

}
