import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from 'app/core/services/search.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() topicName: string;
  @Input() questionsAmount: Number = 0;
  @Input() weatherReportsAmount: Number = 0;

  constructor(private _searchService: SearchService) {
  }
  
  stackOverflowQuestions = [];
  weatherReports = {};

  ngOnInit() {
    let result;

    // Beispiel objekt AKA mock
    this.stackOverflowQuestions = [
      {"answer_count": 1, "link": "https://stackoverflow.com/questions/37652801/when-to-use-interface-and-model-in-typescript-angular", "title": "When to use Interface and Model in TypeScript / Angular"},
      {"answer_count": 3, "link": "https://stackoverflow.com/questions/39728251/angular2-interpolation-and-element-attribute-vs-property", "title": "angular2 interpolation and element (attribute vs property)"},
      {"answer_count": 0, "link": "https://stackoverflow.com/questions/49658757/error-trying-to-diff-object-object-only-arrays-and-iterables-are-allowed", "title": "How to upgrade angular project between major versions?"},
      {"answer_count": 10, "link": "https://stackoverflow.com/questions/", "title": "Why is using <HTTPElement> in components frowned upon?"},
      {"answer_count": 7, "link": "https://stackoverflow.com/questions/", "title": "What are the differences between http and httpClient?"},
      {"answer_count": 4, "link": "https://stackoverflow.com/questions/55517060/clear-browser-cache-in-angular", "title": "Clear browser cache in Angular"},
      {"answer_count": 5, "link": "https://stackoverflow.com/questions/", "title": "Why not use optional params for interfaces?"},
      {"answer_count": 4, "link": "https://stackoverflow.com/questions/49658757/error-trying-to-diff-object-object-only-arrays-and-iterables-are-allowed", "title": "Error trying to diff '[object Object]'. Only arrays and iterables are allowed"},
      {"answer_count": 3, "link": "https://stackoverflow.com/questions/41396435/how-to-iterate-object-keys-using-ngfor", "title": "How to iterate object keys using *ngFor"},
      {"answer_count": 0, "link": "https://stackoverflow.com/questions/34274520/whats-the-meaning-of-in-typescript-fat-arrow", "title": "What's the meaning of “=>” in TypeScript? (Fat Arrow)"},
      {"answer_count": 14, "link": "https://stackoverflow.com/questions/12827266/get-and-set-in-typescript", "title": "get and set in TypeScript"}
    ]

    // Nur für einen Topic (TypeScript) die API einsetzen damit der 300 limit nicht so schnell überschritten wird
    //if (this.topicName.toUpperCase() == 'TypeScript'.toUpperCase() && this.questionsAmount > 0) {
    // Alle Topics verwenden
    if (this.questionsAmount > 0) {
      result = this._searchService.search(this.topicName);
      result.subscribe(response => {
        console.log("StackOverflow API response für '" + this.topicName + "' = ", response);
        console.log("StackOverflow API response für '" + this.topicName + "' (objekt -> items) = ", response.items);
        this.stackOverflowQuestions = response.items;
      });
    }

    if (this.weatherReportsAmount > 0) {
      this._searchService.fetchWeatherReports(this.weatherReportsAmount)
        .subscribe(response => {
          this.weatherReports = response;
          console.log("this.weatherReports = ", response);
        });
    }

  }

}
