import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const headers = new HttpHeaders({'Content-Type': 'application/json'});
const urlWeather = './assets/json/weatherdata.json';

export interface ISearchResultItem  {
    answer_count: number;
    closed_date: number;
    closed_reason: string;
    creation_date: number;
    is_answered: boolean;
    last_activity_date: number;
    link: string;
    score: number;
    tags: Array<string>;
    title: string;
    view_count: number;
}

@Injectable()
export class SearchService {

    private static readonly apiUrl =
        "https://api.stackexchange.com/2.2/search?pagesize=20&order=desc&sort=activity&site=stackoverflow&intitle=";

    constructor(
      private http: Http,
      private httpclient: HttpClient
      ) { }

    search(keyword: string): Observable<JSON> {
        return this.http.get(SearchService.apiUrl + keyword)
            .map((res: Response) => {
                let data = res.json();
                console.log("API USAGE: " + data.quota_remaining + " of " + data.quota_max + " requests available" );
                console.log(data);
                return data;
            })
            .catch((err: Response) => Observable.of(err.json()));
    }
    
    fetchWeatherReports(count: Number): Observable<JSON> {
      return this.http.get(urlWeather)
        .map((res: Response) => {
          let data = res.json();
          if (count < 1) {
            return data;
          }
          let returnData = [];
          for (let i = 0; i < count; i++) {
            let randomNumber = Math.floor(Math.random() * data.length);
            returnData.push(data[randomNumber]);
          }
          return returnData;
      })
      .catch((err: Response) => Observable.of(err.json()));
    }
    
    // falls mit httpclient
    /*
    fetchWeatherReports(): Observable<JSON> {
      return this.httpclient.get<JSON>(urlWeather, {headers});
    }
    */

}
