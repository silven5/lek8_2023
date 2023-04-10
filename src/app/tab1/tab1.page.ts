import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { GitUserService } from './../git-service/git-user.service';
import { CommonModule } from '@angular/common';
import { Observable, pipe } from 'rxjs';
//Для приклада 4
import { interval, of, range } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
//Приклад5
import { fromEvent, from, } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, catchError } from 'rxjs/operators';
import { ViewChild, ElementRef, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab1Page {
  subscription!: any;
  subscription1!: any;
  subscription2!: any;
  subscription3!: any;
  counter = 0;
  counter1 = 0;

  constructor() { }
  //Приклад1
  ras() {
    //почали стежити
    observable.subscribe(observer);
  }
  //Приклад2
  ras1() {
    // просто логуємо кожне значення
    this.subscription = timer.subscribe({ next: console.log });
    this.counter++;
    console.log("Запустили потік номер " + this.counter);
  }
  stop1() {
    this.subscription.unsubscribe();
    console.log("Стоп потік номер " + this.counter);

  }
  //Приклад3
  ras2() {
    // просто логуємо кожне значення
    this.subscription1 = timer1.subscribe({ next: console.log });
    this.counter1++;
    console.log("Запустили потік номер " + this.counter1);
  }
  stop2() {
    this.subscription1.unsubscribe();
    console.log("Стоп потік номер " + this.counter1);

  }
  //Приклад 4

  ras3() {
    this.subscription2 = timer2.subscribe({ next: console.log });
  }
  data: number[] = [];
  // Приклад 4.1
  ras3_1() {
    obs.subscribe(
      val => {
        this.data.push(val)
        console.log(this.data)
      }
    )

  }
  //Приклад 4_2
  ras4_2() {
    let data1: number[] = [];
    array_o.subscribe(val => {
      data1.push(val)
      console.log(data1)
    });
  }
  //Приклад5
  @ViewChild('input', { static: true }) input!: ElementRef;


  gitHubUsers: string[] = [];
  recordRepsToList = (reps: string | any[]) => {
    this.gitHubUsers = [];
    console.log(reps);
    for (let i = 0; i < reps.length; i++) {
      this.gitHubUsers.push(reps[i]);
    }

  }
  ras5_1() {

    let gitUserService = new GitUserService();
    let user$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      //Встановлюємо затримку

      debounceTime(700),
      //отримуємо значення яке ввів користувач
      map((event: any) => (event.target).value));
    const subscribe = user$.subscribe(val => {
      console.log(val);
      gitUserService.getUsersRepsFromAPI(val);
      this.recordRepsToList(gitUserService.name);

    });

  }
  // Приклад 6
  ob_prom() {
    const s = new Observable(observer => {
      setTimeout(() => {
        observer.next('hi');
      }, 100);
      setTimeout(() => {
        observer.next('hello');
      }, 200);
      setTimeout(() => {
        observer.next('hello+hi');
      }, 300);
    });

    s.subscribe(value => {
      console.log('observable:', value);
    });

    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hi');
      }, 100);

      setTimeout(() => {
        resolve('hello');
      }, 200);
      setTimeout(() => {
        observer.next('hello+hi');
      }, 300);
    });

    p.then(value => {
      console.log('promise: ', value);
    });
  }
}
//Приклад1
//Створили потік який викидає декілька значень та закінчується
const observable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(25);
  observer.next(3 + 5);
  observer.next("Hello Observable");
  observer.next("HELLOOO!!!");
  observer.complete();
})
//створили спостирігача
const observer = {
  next: (value: any) => console.log(value), // 1, 2
  error: (error: any) => console.error(error), //
  complete: () => console.log("completed") // completed
};
//Приклад2
const timer = new Observable(observer => {
  // Оголошуємо x
  let x = -10;
  setInterval(() => {
    // Передаємо значення функції спостерігачу

    observer.next(x * x);
    // збільшуємо значення на одиницю
    x++;
    console.log("Потік працює x=" + x);
  }, 1000);
});
//Приклад3
const timer1 = new Observable(observer => {
  let x = -10;
  const intervalId = setInterval(() => {
    observer.next(x * x);
    x++;
    console.log("Потік працює x=" + x);
  }, 1000);
  return () => {
    clearInterval(intervalId);
  }
});
//Приклад4
const timer2 = range(0, 10)
  .pipe(

    filter((num) => num % 3 === 0),

    map((num) => num * 2)

  )
// Приклад 4.1
const obs = new Observable((observer) => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
  observer.next(4)
  observer.next(5)
  observer.complete()
}).pipe(
  //tap Використовується для виконання побічних ефектів для сповіщень із observable
  tap(data => console.log('tap ' + data)),
  //filter Фільтрує дані за допомогою певної умови
  filter((data) => (data as number) > 2),
  tap(data => console.log('filter ' + data)),        //tap
  //map - перетворює дані
  map((val) => { return val as number * 2 }),
  tap(data => console.log('final ' + data)),         //tap
)

//Приклад 4.2
const array_o = from([-2, -5, 4, 5, 6, -7, 22, -100]).pipe(
  filter(num => num < 0),
  map((val) => { return val as number * 2 })
)