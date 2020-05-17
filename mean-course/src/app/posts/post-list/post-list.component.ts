import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { Subscription} from 'rxjs';
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  isLoading = false;

  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(public postsService: PostsService, private authService: AuthService) {
  }
  

  @Input() posts: Post[] = [];
  private postSubscription : Subscription;
  /*posts = [
    {title: 'First Post', content: " This is the first post content"},
    {title: 'Second Post', content: " This is the Second post content"},
    {title: 'Third Post', content: " This is the Third post content"}
  ]*/

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postSubscription =  this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[]; postCount: number }) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

  }

  /*onDelete(postId : string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      //this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }*/

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId)
      .subscribe(() => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.postsPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex +1;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    console.log(pageData);
  }



}
