import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { Subscription} from 'rxjs';
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  isLoading = false;

  totalPosts = 10;
  postsPerPage = 5;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService : PostsService) { }

  @Input() posts: Post[] = [];
  private postSubscription : Subscription;
  /*posts = [
    {title: 'First Post', content: " This is the first post content"},
    {title: 'Second Post', content: " This is the Second post content"},
    {title: 'Third Post', content: " This is the Third post content"}
  ]*/

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSubscription =  this.postsService.getPostUpdateListener()
    .subscribe((postsReceived: Post[]) => {
        setTimeout(()=>{ this.isLoading = false }, 2000);
        this.posts = postsReceived;
    });

    
  }

  onDelete(postId : string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }



}
