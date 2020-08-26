export class File {
  id: number;
  name: string;
  extension: string;
  status: string;
  varType: String;
  selected: boolean;

  constructor(){
      this.selected = false;
  }
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

export class VarCanonIdentifier {
  id: number;
  caid: string;
  variantRefTxt: string;
  constructor() {
  }
}

export class  Sample {
  id: number;
  sampleId: string;
  jaxRegistryId: string;
  newMutantId: string;
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
  strainBackground: string;
  refGenome: string;
  limsSampleId: string;

  constructor() {
    this.strain = new Strain();
  }
}

export class Variant {
  id: number;
  canonIdentifier: VarCanonIdentifier;
  gene: Gene;
  chr: string;
  ref: string;
  alt: string;
  pos: number;
  type: string;
  hgvs: string;
  assembly: string;
  impact: string;
  accession: string;
  externalId: string;
  functionalClassCode: string;
  dnaHgvsNotation: string;
  proteinHgvsNotation: string;
  
  variantRefTxt: string;

  constructor() {
    this.gene = new Gene();
    this.canonIdentifier = new VarCanonIdentifier();
  }

  public setGene(gene: Gene) {
    this.gene = gene;
  }
  public setVarCanonIdentifier(canonIdentifier: VarCanonIdentifier) {
    this.canonIdentifier = canonIdentifier;
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
    supp: number;
    suppVec: string;
    inExon: boolean;

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

export class User {
    id: number;
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
    access_token?: string;
    refresh_token?: string;
}

export class MVARStats {

    exomeSamplesCount: number;
    wholeGenomeSamplesCount: number;
    snpIndelVariantsCount: number;
    svVariantsCount: number;
    strainCount: number;
    confirmedSnpIndelMutationCount: number;
    confirmedSVMutationCount: number;
    snpIndelCandidateCount: number;
    svMutantCandidateCount: number;
    publicationCount: number;

    constructor() {
        this.exomeSamplesCount = -1;
        this.wholeGenomeSamplesCount = -1;
        this.snpIndelVariantsCount = -1;
        this.svVariantsCount = -1;
        this.strainCount = -1;
        this.confirmedSnpIndelMutationCount = -1;
        this.confirmedSVMutationCount = -1;
        this.snpIndelCandidateCount = -1;
        this.svMutantCandidateCount = -1;
        this.publicationCount = -1;
    }
}
