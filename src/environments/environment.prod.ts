
const  MMRDB_API_BASE_URL = '../mmrdb/';
export const environment = {

  MMRDB_API_VARIANT_SEARCH_URL:  MMRDB_API_BASE_URL + 'variant/query',
  MMRDB_API_VARIANT_EXPORT_CSV_URL:  MMRDB_API_BASE_URL + 'variant/exportCsv',
  MMRDB_API_SV_VARIANT_SEARCH_URL:  MMRDB_API_BASE_URL + 'svVariant/query',
  MMRDB_API_GENE_URL:  MMRDB_API_BASE_URL + 'gene',
  MMRDB_API_STRAIN_URL:  MMRDB_API_BASE_URL + 'strain',
  MMRDB_API_PHENOTYPE_URL:  MMRDB_API_BASE_URL + 'phenotype',
  MMRDB_API_VARIANT_URL:  MMRDB_API_BASE_URL + 'variant',
  MMRDB_API_SAMPLE_URL:  MMRDB_API_BASE_URL + 'sample',
  MMRDB_API_VCF_FILE_URL:  MMRDB_API_BASE_URL + 'vcfFile',
  MMRDB_API_SAMPLE_FILE_URL:  MMRDB_API_BASE_URL + 'sampleFile',
  MMRDB_API_ANNOTATED_MUTATION_URL: MMRDB_API_BASE_URL + 'annotatedMutation',
  MMRDB_API_USER_AUTH_URL: MMRDB_API_BASE_URL + 'auth/mylogin',
  MGI_GENE_URL: 'http://www.informatics.jax.org/marker/',
  MGI_STRAIN_URL: 'http://www.informatics.jax.org/strain/',
  NCBI_DBSNP_URL: 'https://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?do_not_redirect&rs=',
  ENSEMBL_TRANSCRIPT_URL: 'http://useast.ensembl.org/Mus_musculus/Transcript/Summary?t=',
  production: true
};
