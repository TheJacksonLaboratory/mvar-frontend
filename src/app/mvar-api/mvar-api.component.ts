import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
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

// Not  yet used
  bashGetToken = `TOKEN=$(curl -s -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' --data '{"username":"{myusername}","password":"{mypassword}","rememberMe":false}' https://bhcape01.jax.org/api/auth/login | jq -r '.access_token’)`;

  // Not  yet used
  pythonGetToken =
    `import requests, json
data = { 'username' : 'myusername', 'password' : 'mypassword' }
r = requests.post('https://mvar.jax.org/login', data=json.dumps(data), verify=False)
token = json.loads(r.text)['access_token']`;

// Not  yet used
  javaGetToken =
    `import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
  
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
  
public class Login {
    public static void main(String[] args) throws Exception {
        // start HTTP POST to get a token
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("http://bhcape01.jax.org/api/auth/login");

        // send the username and password
        List<NameValuePair> nvps = new ArrayList<>();
        nvps.add(new BasicNameValuePair("username", "myusername"));
        nvps.add(new BasicNameValuePair("password", "mypassword"));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps));
 
        // make the call and print the token
        try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
            HttpEntity entity = response.getEntity();
            String token = EntityUtils.toString(entity, StandardCharsets.UTF_8);
            System.out.println(token);
        }
    }
}`;

// Not  yet used
  rGetToken =
    `library(httr)
secret = "{username: myusername, password: mypassword}"
token <- POST (url = "https://bhcape01.jax.org/api/auth/login", 
               add_headers("API-KEY" = "xxx", "VERSION" = "1", 
                           "Content-Type" = "application/json; charset=UTF-8",
                           "Accept" = "application/json; charset=UTF-8"), 
                           body = "{username: myusername, password: mypassword}")`;

  // Not  yet used
  authResponse =
    `{
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Mjk4OTQ2NDEsIm5iZiI6MTYyOTg5NDY0MSwianRpIjoiYmJkYzY0ZTAtOTFkNy00MzYyLWI0ODktODg5OTVjNjExMjhmIiwiZXhwIjoxNjMyNDg2NjQxLCJpZGVudGl0eSI6eyJ1c2VyX2lkIjoyLCJmaXJzdF9uYW1lIjoiQmFoYSIsImxhc3RfbmFtZSI6IkVsIEthc3NhYnkiLCJlbWFpbCI6IkJhaGEuRWxLYXNzYWJ5QGpheC5vcmciLCJ1c2VybmFtZSI6ImVsa2FzYiIsInJvbGVzIjp7ImFkbWluIjpmYWxzZSwidXNlciI6dHJ1ZX0sImNvbmZpcm1lZCI6dHJ1ZSwiZ3JvdXBzIjpbInJlc2VhcmNoLXdpZGUtdXNlcnMiLCJDR1JQLWJoY2FwZTAybGQiLCJDLUJJRyIsIkNHUlAtc3VtbmVyLWxvZ2luIiwiQVpSLTJGQS1QaWxvdCIsIkdDUC1nZWRpLXNhbmRib3gtbmMtMDEtVXNlciIsInJzdHVkaW8tdXNlcnMiLCJPMzY1LVZpc2lvLVBsYW4yIiwiQ0dSUC13aW50ZXItbG9naW4iLCJDR1JQLWJoY2FwZTAxIiwiQk9YLUpBWF9BbGxfVXNlcnMiLCJHUlAtQkhfSERyaXZlX01pZ3JhdGlvbiIsIkNHUlAtY3RtdnIwMWx0IiwiTzM2NS1GYWN1bHR5LUEzLUJhc2UiLCJHUlAtV2ViRXhVc2VycyIsIkdSUC1BQUQtSVQtUGlsb3QiLCJWUE4tMkZBIiwiR29vZ2xlVXNlcnMiLCJFeGNoYW5nZSAyMDEzIFVzZXJzIiwiQ0dSUC1oZWxpeCIsImNzLWFsbCIsImNhcnRlcmxhYiIsIkNHUlAtY2FydGVyZGV2IiwiaHBjLXVzZXJzIiwiQURNLVN0cmljdFBhc3N3b3JkcyIsIkZBU1BFWC1VU0VSUyIsIkNHUlAtZG9ua2V5IiwiY3NzYyIsImNvbXBzY2kiXX0sInR5cGUiOiJyZWZyZXNoIn0.8n0eQWP1qLWDuOdNCvfFukqe5zNQr3EdY3HbRdWeE3Y",
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Mjk4OTQ2NDEsIm5iZiI6MTYyOTg5NDY0MSwianRpIjoiZDUwZThiNmUtY2E0ZS00YWFlLTg4YzctNWFiNzY2ZDIwNzdhIiwiZXhwIjoxNjI5ODk1NTQxLCJpZGVudGl0eSI6eyJ1c2VyX2lkIjoyLCJmaXJzdF9uYW1lIjoiQmFoYSIsImxhc3RfbmFtZSI6IkVsIEthc3NhYnkiLCJlbWFpbCI6IkJhaGEuRWxLYXNzYWJ5QGpheC5vcmciLCJ1c2VybmFtZSI6ImVsa2FzYiIsInJvbGVzIjp7ImFkbWluIjpmYWxzZSwidXNlciI6dHJ1ZX0sImNvbmZpcm1lZCI6dHJ1ZSwiZ3JvdXBzIjpbInJlc2VhcmNoLXdpZGUtdXNlcnMiLCJDR1JQLWJoY2FwZTAybGQiLCJDLUJJRyIsIkNHUlAtc3VtbmVyLWxvZ2luIiwiQVpSLTJGQS1QaWxvdCIsIkdDUC1nZWRpLXNhbmRib3gtbmMtMDEtVXNlciIsInJzdHVkaW8tdXNlcnMiLCJPMzY1LVZpc2lvLVBsYW4yIiwiQ0dSUC13aW50ZXItbG9naW4iLCJDR1JQLWJoY2FwZTAxIiwiQk9YLUpBWF9BbGxfVXNlcnMiLCJHUlAtQkhfSERyaXZlX01pZ3JhdGlvbiIsIkNHUlAtY3RtdnIwMWx0IiwiTzM2NS1GYWN1bHR5LUEzLUJhc2UiLCJHUlAtV2ViRXhVc2VycyIsIkdSUC1BQUQtSVQtUGlsb3QiLCJWUE4tMkZBIiwiR29vZ2xlVXNlcnMiLCJFeGNoYW5nZSAyMDEzIFVzZXJzIiwiQ0dSUC1oZWxpeCIsImNzLWFsbCIsImNhcnRlcmxhYiIsIkNHUlAtY2FydGVyZGV2IiwiaHBjLXVzZXJzIiwiQURNLVN0cmljdFBhc3N3b3JkcyIsIkZBU1BFWC1VU0VSUyIsIkNHUlAtZG9ua2V5IiwiY3NzYyIsImNvbXBzY2kiXX0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.jzhHmda5-Zq0KZdIXXBmNv2yGPYmbQzhyOk9-ljLgoE"
}`;

// Not  yet used
  userRegisterParameters =
    `{first_name: '', last_name: '', 
 username: '', email: '', 
 password: ''}`;

 // Not  yet used
  userConfirmParameters = `/{email_token}`;
// Not  yet used
  userResponse = `{'message': 'Success message'}, Status code`;
// Not  yet used
  authParameter =
    `HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;

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
json = '{"max":1000, "offset":20, "gene":["xkr4"],
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

  private getToc(content: any) {
    // create div
    var div, target;
    // read content into div:
    div.innerHTML = content;

    // create an array of headlines:
    // initialize table of contents(toc) and select all level 1 and 2 headers, reading them into an array:
    var myArrayOfNodes = [].slice.call(div.querySelectorAll("h1, h2"));

    // 
    var toc = document.createElement("ul");
    var pointer = toc;
    var myArrayOfNodes = [].slice.call(div.querySelectorAll("h1, h2"));

    // loop through the array of headlines
    myArrayOfNodes.forEach(
      function (value, key, listObj) {
        console.log(value.tagName + ": " + value.innerHTML);

        // if we have detected a top level headline:
        if ("H1" == value.tagName) {
          // reset the pointer to top level:
          pointer = toc;
        }

        // if we are at top level and we have detected a headline level 2
        if ("H2" == value.tagName && pointer == toc) {
          // create a nested unordered list
          pointer = pointer.appendChild(document.createElement("ul"));
        }

        // for each headline, create a list item with the corresponding HTML content:
        var li = target.appendChild(document.createElement("li"));
        li.innerHTML = value.innerHTML;
      });
  }

}
