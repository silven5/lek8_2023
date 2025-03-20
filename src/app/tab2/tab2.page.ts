import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Component, OnInit } from '@angular/core';
import { GitUserService } from './../git-service/git-user.service';
import { interval, of, range, timer, fromEvent, from } from 'rxjs';
import {
  filter,
  map,
  tap,
  mapTo,
  mergeMap,
  concatAll,
  mergeAll,
  switchAll,
  exhaust,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab2Page {
  constructor() {}

  ngOnInit() {}
  timer1$: any;
  //Приклад1
  ras() {
    this.timer1$ = timer(0, 1000)
      .pipe(map(() => makeRequest()))
      .subscribe({
        next: console.log,
      });
  }
  //Приклад1_1
  ras1() {
    this.timer1$ = timer(0, 1000)
      .pipe(mergeMap(() => makeRequest()))
      .subscribe({
        next: console.log,
      });
  }
  stop() {
    this.timer1$.unsubscribe();
  }
  //Приклад2
  ras2() {
    console.log('ConcatAll');
    of(
      firstInnerObservable,
      secondInnerObservable,
      triInnerObservable,
      cInnerObservable,
      pInnerObservable
    )
      .pipe(concatAll())
      .subscribe({
        next: console.log,
      });
  }
  ras2_1() {
    console.log('MergeAll');
    of(
      firstInnerObservable,
      secondInnerObservable,
      triInnerObservable,
      cInnerObservable,
      pInnerObservable
    )
      .pipe(mergeAll())
      .subscribe({
        next: console.log,
      });
  }
  ras2_2() {
    console.log('switchAll');
    of(
      firstInnerObservable,
      secondInnerObservable,
      triInnerObservable,
      cInnerObservable,
      pInnerObservable
    )
      .pipe(switchAll())
      .subscribe({
        next: console.log,
      });
  }
  ras2_3() {
    console.log('exhaust');
    of(
      firstInnerObservable,
      secondInnerObservable,
      triInnerObservable,
      cInnerObservable,
      pInnerObservable
    )
      .pipe(exhaust())
      .subscribe({
        next: console.log,
      });
  }
}

//Приклад1

const makeRequest = () => {
  return timer(1000).pipe(
    // mapTo('success')
    map(() => 'sucess')
  );
};

//Приклад2
// потік, генерує 1 по після однієї секунди
const firstInnerObservable = timer(100).pipe(
  // mapTo(1)
  map(() => 1)
);
//  потік, генерує 2 по після однієї секунди
const secondInnerObservable = timer(500).pipe(
  // mapTo(2)
  map(() => 2)
);
//  потік, генерує 3 по після однієї секунди
const triInnerObservable = timer(200).pipe(
  // mapTo(3)
  map(() => 3)
);
//  потік, генерує 4 по після однієї секунди
const cInnerObservable = timer(1200).pipe(
  // mapTo(3)
  map(() => 4)
);
//  потік, генерує 10 по після однієї секунди
const pInnerObservable = timer(150).pipe(
  // mapTo(3)
  map(() => 10)
);
