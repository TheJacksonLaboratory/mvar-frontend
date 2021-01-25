// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const MVAR_API_BASE_URL = 'http://localhost:8080/';
export const environment = {

    MVAR_API_VARIANT_SEARCH_URL: MVAR_API_BASE_URL + 'variant/query',
    MVAR_API_VARIANT_EXPORT_CSV_URL: MVAR_API_BASE_URL + 'variant/exportCsv',
    MVAR_API_GENE_URL: MVAR_API_BASE_URL + 'gene',
    MVAR_API_STRAIN_URL: MVAR_API_BASE_URL + 'strain',
    MVAR_API_TRANSCRIPT_URL: MVAR_API_BASE_URL + 'transcript',
    MVAR_API_ALLELE_URL: MVAR_API_BASE_URL + 'allele',
    MVAR_API_SEQUENCE_ONTOLOGY_URL: MVAR_API_BASE_URL + 'sequenceOntology',
    MVAR_API_PHENOTYPE_URL: MVAR_API_BASE_URL + 'phenotype',
    MVAR_API_VARIANT_URL: MVAR_API_BASE_URL + 'variant',
    MVAR_API_STATS_URL: MVAR_API_BASE_URL + 'mvarStats',
    MVAR_API_VCF_FILE_URL: MVAR_API_BASE_URL + 'vcfFile',
    MVAR_API_USER_AUTH_URL: MVAR_API_BASE_URL + 'auth/mylogin',
    MGI_GENE_URL: 'http://www.informatics.jax.org/marker/',
    MGI_STRAIN_URL: 'http://www.informatics.jax.org/strain/',
    NCBI_DBSNP_URL: 'https://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?do_not_redirect&rs=',
    ENSEMBL_TRANSCRIPT_URL: 'http://useast.ensembl.org/Mus_musculus/Transcript/Summary?t=',
    SEQUENCE_ONTOLOGY_URL: 'http://www.sequenceontology.org/browser/current_release/term/',
    JAX_STRAIN_REGISTRY_URL: 'https://www.jax.org/strain/',
    JAX_MAMMALIAN_PHENOTYPE_URL: 'http://www.informatics.jax.org/vocab/mp_ontology/',
    production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
