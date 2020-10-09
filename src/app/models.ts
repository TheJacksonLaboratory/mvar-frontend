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

export class Transcript {
  id: number;
  dnaHGVS: string;
  proteinHGVS: string;
  locationStart: number;
  locationEnd: number;
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
  attributes: string;
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

export class Variant {
  id: number;
  canonVarIdentifier: VarCanonIdentifier;
  gene: Gene;
  chr: string;
  ref: string;
  alt: string;
  position: number;
  type: string;
  hgvs: string;
  assembly: string;
  impact: string;
  accession: string;
  externalId: string;
  functionalClassCode: string;
  dnaHgvsNotation: string;
  proteinHgvsNotation: string;
  strains: Strain[];
  transcripts: Transcript[];

  variantRefTxt: string;

  constructor() {
    this.gene = new Gene();
    this.canonVarIdentifier = new VarCanonIdentifier();
  }

  public setGene(gene: Gene) {
    this.gene = gene;
  }
  public setVarCanonIdentifier(canonVarIdentifier: VarCanonIdentifier) {
    this.canonVarIdentifier = canonVarIdentifier;
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
