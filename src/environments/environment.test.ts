const MVAR_API_BASE_URL = '../MVAR/';
export const environment = {

    MVAR_API_VARIANT_SEARCH_URL: MVAR_API_BASE_URL + 'variant/query',
    MVAR_API_VARIANT_EXPORT_CSV_URL: MVAR_API_BASE_URL + 'variant/exportCsv',
    MVAR_API_SV_VARIANT_SEARCH_URL: MVAR_API_BASE_URL + 'svVariant/query',
    MVAR_API_SV_VARIANT_EXPORT_CSV_URL: MVAR_API_BASE_URL + 'svVariant/exportCsv',
    MVAR_API_GENE_URL: MVAR_API_BASE_URL + 'gene',
    MVAR_API_STRAIN_URL: MVAR_API_BASE_URL + 'strain',
    MVAR_API_PHENOTYPE_URL: MVAR_API_BASE_URL + 'phenotype',
    MVAR_API_VARIANT_URL: MVAR_API_BASE_URL + 'variant',
    MVAR_API_SAMPLE_URL: MVAR_API_BASE_URL + 'sample',
    MVAR_API_VCF_FILE_URL: MVAR_API_BASE_URL + 'vcfFile',
    MVAR_API_SAMPLE_FILE_URL: MVAR_API_BASE_URL + 'sampleFile',
    MVAR_API_ANNOTATED_MUTATION_URL: MVAR_API_BASE_URL + 'annotatedMutation',
    MVAR_API_USER_AUTH_URL: MVAR_API_BASE_URL + 'auth/mylogin',
    MGI_GENE_URL: 'http://www.informatics.jax.org/marker/',
    MGI_STRAIN_URL: 'http://www.informatics.jax.org/strain/',
    NCBI_DBSNP_URL: 'https://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?do_not_redirect&rs=',
    ENSEMBL_TRANSCRIPT_URL: 'http://useast.ensembl.org/Mus_musculus/Transcript/Summary?t=',
    JAX_STRAIN_REGISTRY_URL: 'https://www.jax.org/strain/',
    JAX_MAMMALIAN_PHENOTYPE_URL: 'http://www.informatics.jax.org/vocab/mp_ontology/',
    production: false
};
