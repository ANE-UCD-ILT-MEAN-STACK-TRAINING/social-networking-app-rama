import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(public postsService : PostsService) { }

  @Input() posts: Post[] = [];
  private postSubscription : Subscription;
  /*posts = [
    {title: 'First Post', content: " This is the first post content"},
    {title: 'Second Post', content: " This is the Second post content"},
    {title: 'Third Post', content: " This is the Third post content"}
  ]*/

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postSubscription =  this.postsService.getPostUpdateListener()
    .subscribe((postsReceived: Post[]) => {
        this.posts = postsReceived;
    });

    
  }

  editPost() {
    console.log("Edit function to be done later")
  }

  onDelete(postId : string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }




}
