import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // The below code is not needed as will be using service directly.
  /*storedPosts : Post[] = [];
  onPostAdded(post){
    this.storedPosts.push(post);
  }*/ 
}


