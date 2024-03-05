import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
  <span>{{rate >= 1 ? '★' : '☆'}}</span>
  <span>{{rate >= 2 ? '★' : '☆'}}</span>
  <span>{{rate >= 3 ? '★' : '☆'}}</span>
  <span>{{rate >= 4 ? '★' : '☆'}}</span>
  <span>{{rate >= 5 ? '★' : '☆'}}</span>
  <h3>{{name}}</h3>
  <p>{{content}}</p>
  `,
  host: {'class': 'ratings__item'}
})
export class RatingComponent {

  @Input('name')
  public name: string;

  @Input('content')
  public content: string;

  @Input('rate')
  public rate: number;
}

@Component({
  selector: 'app-average-rating',
  template: `
  <span>{{getAvg() >= 1 ? '★' : '☆'}}</span>
  <span>{{getAvg() >= 2 ? '★' : '☆'}}</span>
  <span>{{getAvg() >= 3 ? '★' : '☆'}}</span>
  <span>{{getAvg() >= 4 ? '★' : '☆'}}</span>
  <span>{{getAvg() >= 5 ? '★' : '☆'}}</span>
  `,
  host: {'class': 'ratings__average'}
})
export class AverageRatingComponent {
  @Input('ratings')
  public ratings: {name: string, content: string, rate: number}[];

  getAvg() {
    let sum = this.ratings.map(m => m.rate).reduce((a,b) => a + b);
    let average = Math.ceil(sum/this.ratings.length);
    return average
  }
}

@Component({
  selector: 'app-ratings-list',
  template: `
  <app-average-rating [ratings]="ratings" class="ratings__average"></app-average-rating>
  <app-rating class="" *ngFor="let r of ratings" [name]="r.name" [content]="r.content" [rate]="r.rate"></app-rating>
  `,
  host: {'class': 'ratings'}
})
export class RatingsListComponent {
  @Input('ratings')
  public ratings: {name: string, content: string, rate: number}[];
}
