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
  sampleStats: SampleStatistics;

  constructor() {
    this.strain = new Strain();
    //this.sampleStats = new SampleStatistics();
  }
}

export class SampleStatistics {
    id: number;
    totalNumReads: number;
    pctTargetBasesCovered_10x: number;
    pctTargetBasesCovered_50x: number;
    pctTargetBasesCovered_100x: number;
    pctTargetBasesCovered_40x: number;
    pctTargetBasesCovered_2x: number;
    pctSelectedBases: number;
    numPfUniqueReads: number;
    meanTargetCoverage: number;
    pctPfUqReadsAligned: number;
    totalNumHqReads: number;
    pctTargetBasesCovered_30x: number;
    pctTargetBasesCovered_20x: number;
    numIndels: number;
    numSnps: number;

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
  alleleCount: number;
  alleleFrequency: number;
  readDepth: number;
  qual: number;
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
  variantAnnotations: VariantAnnotation[];
  varTxt: string;
  seqSource: string;

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
    variantAnnotation: VariantAnnotation;
    supp: number;
    suppVec: string;
    inExon: boolean;
    source: string;
    varTxt: string;

    constructor() {
        ///this.gene = new Gene();
        this.sample = new Sample();
    }
}

export class VariantAnnotation {

  id: number;
  status: string;
  notes: string;
  updateBy: string;
  udadateDate: string;
  sample: Sample;
  annotation: string;
  isSv: string;
  varTxt: string;

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

export class MMRDBStats {

    exomeSamplesCount: number;
    wholeGenomeSamplesCount: number;
    snpVariantsCount: number;
    indelVariantsCount: number;
    svVariantsCount: number;
    strainCount: number;
    confirmedSnpMutationCount: number;
    confirmedIndelMutationCount
    confirmedSVMutationCount: number;
    snpCandidateCount: number;
    indelCandidateCount: number;
    svCandidateCount: number;
    publicationCount: number;

    constructor() {
        // this.exomeSamplesCount = -1;
        // this.wholeGenomeSamplesCount = -1;
        // this.snpIndelVariantsCount = -1;
        // this.svVariantsCount = -1;
        // this.strainCount = -1;
        // this.confirmedSnpIndelMutationCount = -1;
        // this.confirmedSVMutationCount = -1;
        // this.snpIndelCandidateCount = -1;
        // this.svMutantCandidateCount = -1;
        // this.publicationCount = -1;
    }
}
