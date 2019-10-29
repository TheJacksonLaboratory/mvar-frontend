export interface File {
  id: number;
  name: string;
  extension: string;
  status: string;
  varType: String;
}

export class Gene {
  id: number;
  name: string;
  type: string;
  chr: string;
  symbol: string;
  mgiId: string;
  description: string;

  constructor() {
  }
}

export class Phenotype {

  id: number;
  mpTermIdentifier;
  mpTermName;
  mpTermDescription;
}

export class Strain {

  id: number;
  identifier: string;
  name: string;
  description: string;
  carriesAlleleSymbol: string;
  carriesAlleleName: string;
  carriesAlleleType: string;
  carriesAlleleIdentifier: string;

  constructor(){
  }
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
  totalVarCount: number;
  rareVarCount: number;
  candidateVarCount: number;
  confirmedVarCount: number;
  totalSvVarCount: number;
  rareSvVarCount: number;
  candidateSvVarCount: number;
  confirmedSvVarCount: number;
  strain: Strain;
  // genomeBuild

  constructor() {
    this.strain = new Strain();
  }
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
  filter: string;
  mutantCandidate: string;
  sampleCount: number;
  varFreq: number;
  assembly: string;
  status: string;
  dbSNPId: string;
  snpEffImpact: string;
  snpEffFunctionalClass: string;
  snpEffEffect: string;
  snpEffCodonChange: string;
  snpEffAminoAcidChange: string;
  snpEffGeneName: string;
  snpEffGeneBiotype: string;
  snpEffTranscriptId: string;
  snpEffExonId: string;
  annotatedMutation: AnnotatedMutation;
  varTxt: string;

  constructor() {
    this.gene = new Gene();
    this.sample = new Sample();
  }

  public setGene(gene: Gene) {
    this.gene = gene;
  }
}

export class SvVariant {
    id: number;
    //gene: Gene;
    chr: string;
    chr2: string;
    pos: number;
    endPos: number;
    svLength: number;
    svType: string;
    sample: Sample;
    filter: string;
    mutantCandidate: string;
    varFreq: number;
    assembly: string;
    status: string;
    annotatedMutation: AnnotatedMutation;

    constructor() {
        ///this.gene = new Gene();
        this.sample = new Sample();
    }
}

export class AnnotatedMutation {

  id: number;
  status: string;
  notes: string;
  updatedBy: string;
  udadateDate: string;
  sample: Sample;

  constructor(){
    this.status = '';
    this.notes = '' ;
  }
}
