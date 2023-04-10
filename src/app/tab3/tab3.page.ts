import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClientModule } from '@angular/common/http';
import { Post } from './class/post';
import { PostService } from './srvice/post.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, HttpClientModule, CommonModule],
  providers: [PostService]
})
export class Tab3Page {
  posts = new Array<Post>();
  errorMessage: any;
  private results!: Observable<Post[]>;
  // створюємо сервіс
  constructor(private service: PostService) { }
  ngOnInit() {
    this.posts = [];
    this.service.getPosts().subscribe((response: Post[]) => {
      let data: any = response;
      console.log(data);
      this.posts = data.record;
      console.log(this.posts);
    });
    console.log("HELLO!!!" + this.posts);
    console.log(this.posts);
  }
}
