// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const  MMRDB_API_BASE_URL = 'http://localhost:8080/';
export const environment = {

  MMRDB_API_VARIANT_SEARCH_URL:  MMRDB_API_BASE_URL + 'variant/query',
  MMRDB_API_SV_VARIANT_SEARCH_URL:  MMRDB_API_BASE_URL + 'svVariant/query',
  MMRDB_API_GENE_URL:  MMRDB_API_BASE_URL + 'gene',
  MMRDB_API_STRAIN_URL:  MMRDB_API_BASE_URL + 'strain',
  MMRDB_API_PHENOTYPE_URL:  MMRDB_API_BASE_URL + 'phenotype',
  MMRDB_API_VARIANT_URL:  MMRDB_API_BASE_URL + 'variant',
  MMRDB_API_SAMPLE_URL:  MMRDB_API_BASE_URL + 'sample',
  MMRDB_API_VCF_FILE_URL:  MMRDB_API_BASE_URL + 'vcfFile',
  MMRDB_API_SAMPLE_FILE_URL:  MMRDB_API_BASE_URL + 'sampleFile',
  MGI_GENE_URL: 'http://www.informatics.jax.org/marker/',
  MGI_STRAIN_URL: 'http://www.informatics.jax.org/strain/',
  NCBI_DBSNP_URL: 'https://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?do_not_redirect&rs=',
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
