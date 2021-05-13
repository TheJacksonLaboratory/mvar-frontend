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
  mRNAid: string;
  dnaHGVS: string;
  proteinHGVS: string;
  impact: string;
  annotation: string;
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
  caID: string;
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
  variantHgvsNotation: string;
  assembly: string;
  impact: string;
  impacts: string; // stores all impacts
  accession: string;
  externalId: string;
  functionalClassCode: string;
  functionalClassCodes: string; // stores all annotations
  functionalClassSOid: string; // SO id of functional class
  dnaHgvsNotation: string;
  proteinHgvsNotation: string;
  strains: Strain[];
  transcripts: Transcript[];
  externalSource: string;
  sources: Source[];

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

export class Source {
  name: string;
  sourceVersion: string;
  constructor() {
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

    alleleCount: number;
    geneCount: number;
    strainCount: number;
    transcriptCount: number;
    variantCount: number;
    variantCanonIdentifierCount: number;

    variantStrainCount: number;
    variantTranscriptCount: number;

    strainAnalysisCount: number;
    geneAnalysisCount: number;
    transcriptAnalysisCount: number;

    constructor() {
        this.alleleCount = -1;
        this.geneCount = -1;
        this.strainCount = -1;
        this.transcriptCount = -1;
        this.variantCount = -1;
        this.variantCanonIdentifierCount = -1;

        this.variantStrainCount = -1;
        this.variantTranscriptCount = -1;

        this.strainAnalysisCount = -1;
        this.geneAnalysisCount = -1;
        this.transcriptAnalysisCount = -1;
    }
}

export const chromosomes = [
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