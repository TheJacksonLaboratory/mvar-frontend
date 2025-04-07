import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'mvar-api',
  templateUrl: './mvar-api.component.html',
  styleUrls: ['./mvar-api.component.scss']
})

export class MvarApiComponent implements OnInit {

  selectedTab: any;

  apiUrl: string;
  strainUrl: string;
  geneUrl: string;
  soUrl: string;
  variantUrl: string;
  transcriptUrl: string;
  mvarStatUrl: string;
  mvarSourceUrl: string;
  mvarApiPage: string;

  variantIdParameter: string;
  variantUrlQuery: string;

  strainIdParameter: string;
  strainUrlQuery: string;

  variantQueryParameters =
`{"max":1000, "offset":20, "sortBy":"mvarId",
"sortDirection":"asc", "gene":["xkr4"],"strain":["C57BL/6J"],
"type":["SNP"], "annotation":["missense_variant"], "chr":"1",
"startPos":3400000, "endPos":3500000}`;
strainQueryParameters =
`{"max":1000, "offset":0, "sortBy":"name", "sortDirection":"asc",
  "name":["C57BL/6J", "..."], "attributes":["inbred strain", "..."],
  "primary_id":["MGI:5655905", "..."]}
`;
  httpHeaderParam =
`HTTP header:
{ 'Content-Type': 'application/json' }`;

bashVariantQuery =
`curl -X POST -H 'Accept: application/json'
     -d '{"max":1000, "offset":20, "gene":["xkr4"],
          "strain":["C57BL/6J", "129P2/OlaHsd", "ZALENDE/EiJ"],
          "type":["SNP"], "annotation":["missense_variant"], "chr":"2",
          "startPos":3400000, "endPos":3500000}'
     https://mvar.jax.org/variant/query`;

pythonVariantQuery =
`# with requests version>=2.4.2, otherwise use "data=" which will take a string
import requests
response = requests.post('https://mvar.jax.org/variant/query',
                        json={"max":1000, "offset":20, "gene":["xkr4"],
                              "strain":["C57BL/6J", "129P2/OlaHsd", "ZALENDE/EiJ"],
                              "type":["SNP"], "annotation":["missense_variant"], "chr":"2",
                              "startPos":3400000, "endPos":3500000})`;
javaVariantQuery =
`import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

public class HttpPostJsonExample {
  public static void main(String[] args) throws Exception {
    String payload = "data={" +
                     "\\"max\\":1000, \\"offset\\":20, \\"gene\\":[\\"xkr4\\"], " +
                     "\\"strain\\":[\\"C57BL/6J\\", \\"129P2/OlaHsd\\", \\"ZALENDE/EiJ\\"], " +
                     "\\"type\\":[\\"SNP\\"], \\"annotation\\":[\\"missense_variant\\"], \\"chr\\":\\"2\\", " +
                     "\\"startPos\\":3400000, \\"endPos\\":3500000 " +
                     "}";
    StringEntity entity = new StringEntity(payload, ContentType.APPLICATION_FORM_URLENCODED);

    HttpClient httpClient = HttpClientBuilder.create().build();
    HttpPost request = new HttpPost("https://mvar.jax.org/variant/query");
    request.setEntity(entity);

    HttpResponse response = httpClient.execute(request);
    System.out.println(response.getStatusLine().getStatusCode());
  }
}`;

rVariantQuery =
`library(httr)
json = '{"max":1000, "offset":20, "gene":["xkr4"], "assembly":"mm39",
         "strain":["C57BL/6J", "129P2/OlaHsd", "ZALENDE/EiJ"],
         "type":["SNP"], "annotation":["missense_variant"], "chr":"2",
         "startPos":3400000, "endPos":3500000}'
response <- POST (url = "https://mvar.jax.org/variant/query", content_type_json(), body = json)`;

constructor(private route: ActivatedRoute, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.apiUrl = environment.MVAR_API_SWAGGER_URL;
    this.strainUrl = environment.MVAR_API_STRAIN_URL;
    this.strainIdParameter = this.strainUrl + `/19`;
    this.strainUrlQuery = this.strainUrl + `/query`;
    this.geneUrl = environment.MVAR_API_GENE_URL;
    this.soUrl = environment.MVAR_API_SEQUENCE_ONTOLOGY_URL;
    this.variantUrl = environment.MVAR_API_VARIANT_URL;
    this.variantIdParameter = this.variantUrl + `/19`;
    this.variantUrlQuery = this.variantUrl + `/query`;
    this.transcriptUrl = environment.MVAR_API_TRANSCRIPT_URL;
    this.mvarStatUrl = environment.MVAR_API_STAT_URL;
    this.mvarSourceUrl = environment.MVAR_API_SOURCE_URL;

    this.route.paramMap.subscribe(paramsIn => {
      const selectedTabIn = paramsIn.get('selectedTab');
      if (selectedTabIn) {
        this.selectedTab = selectedTabIn;
      }
    });
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });

  }

  /**
   * Unused ?
   * @param content
   * @private
   */
  private getToc(content: any) {
    // create div
    let div, target;
    // read content into div:
    div.innerHTML = content;

    // create an array of headlines:
    // initialize table of contents(toc) and select all level 1 and 2 headers, reading them into an array:
    let myArrayOfNodes = [].slice.call(div.querySelectorAll('h1, h2'));

    const toc = document.createElement('ul');
    let pointer = toc;
    myArrayOfNodes = [].slice.call(div.querySelectorAll('h1, h2'));

    // loop through the array of headlines
    myArrayOfNodes.forEach(
      function (value, key, listObj) {
        console.log(value.tagName + ': ' + value.innerHTML);

        // if we have detected a top level headline:
        if ('H1' === value.tagName) {
          // reset the pointer to top level:
          pointer = toc;
        }

        // if we are at top level and we have detected a headline level 2
        if ('H2' === value.tagName && pointer === toc) {
          // create a nested unordered list
          pointer = pointer.appendChild(document.createElement('ul'));
        }

        // for each headline, create a list item with the corresponding HTML content:
        const li = target.appendChild(document.createElement('li'));
        li.innerHTML = value.innerHTML;
      });
  }

}
