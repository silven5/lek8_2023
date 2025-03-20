import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  concatMap,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent],
})
export class Tab4Page implements OnInit {
  constructor() {}
  //Приклад1
  mySubject = new Subject();
  ras1() {
    this.mySubject.next('Start Subject');
    this.mySubject.next(1);
    let subscription1 = this.mySubject.subscribe((x) => {
      console.log('Підписка 1:', x);
    });
    this.mySubject.next(2);
    let subscription2 = this.mySubject.subscribe((x) => {
      console.log('Підписка 2:', x);
    });
    this.mySubject.next(3);
    subscription1.unsubscribe;
    this.mySubject.next(4);
    this.mySubject.next(5);
  }
  myObservable = new Observable((observer) => {
    observer.next('Start Observable');
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.complete();
  });
  ras1_2() {
    let subscription1 = this.myObservable.subscribe((x) => {
      console.log('Підписка 1:', x);
    });
    this.mySubject.next(2);
    let subscription2 = this.myObservable.subscribe((x) => {
      console.log('Підписка 2:', x);
    });
  }
  //Приклад2
  mySubject2 = new Subject();
  //Масив з їжою
  eats = ['🌭', '🍕', '🍔', '🍟', '🥪', '🥞', '🥐', '🧇'];
  trickleEats = timer(2000).pipe(
    concatMap((val) => this.eats),
    tap((val) => console.log('Eat ' + val))
  );
  ras2() {
    let subscription1 = this.mySubject2.subscribe((x) => {
      console.log('Підписка 1:', x);
    });
    let subscription2 = this.mySubject2.subscribe((x) => {
      console.log('Підписка 2:', x);
    });
    let subscription3 = this.mySubject2.subscribe((x) => {
      console.log('Підписка 3:', x);
    });
    this.trickleEats.subscribe(this.mySubject2);
  }
  //Приклад3
  mySubject3 = new ReplaySubject(1);
  ras3() {
    this.mySubject3.next(1);
    this.mySubject3.next(2);
    this.mySubject3.next(3);
    this.mySubject3.next(4);
    this.mySubject3.subscribe((x) => {
      console.log('Від першого sub:', x);
    });
    this.mySubject3.next(5);
    this.mySubject3.subscribe((x) => {
      console.log('Від другого sub:', x);
    });
    this.mySubject3.next(6);
    this.mySubject3.subscribe((x) => {
      console.log('Від третього sub:', x);
    });
  }
  //Приклад4
  ras4() {
    let mySubject = new BehaviorSubject('Hello');
    mySubject.next('1');
    mySubject.subscribe((x) => {
      console.log('Від першого sub:', x);
    });
    mySubject.next('5');
    mySubject.subscribe((x) => {
      console.log('Від другого sub:', x);
    });
    mySubject.next('6');
    mySubject.subscribe((x) => {
      console.log('Від третього sub:', x);
    });
    mySubject.next('7');
  }
  //Приклад5
  ras5() {
    let sbj = new AsyncSubject();
    sbj.subscribe((vl) => console.log(`Async1: ${vl}`));
    sbj.next(7);
    sbj.next(8);
    sbj.subscribe((vl) => console.log(`Async2: ${vl}`));
    sbj.next(9);
    sbj.next(10);
    setTimeout(() => sbj.complete(), 2000);
    sbj.next(101);
  }
  ngOnInit() {}
}
