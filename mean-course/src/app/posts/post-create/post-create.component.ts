import { Component,  OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from "@angular/forms";
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService : PostsService) { }

  @Output() postCreated = new EventEmitter();

  ngOnInit(): void {
  }

 /* onAddPost(){
    alert(" Save Post Button Clicked");
  }*/

 /* newPost = 'No Content';
  onAddPost(postInput : HTMLTextAreaElement){
    console.dir(postInput);
    this.newPost= postInput.value;
}*/

enteredTitle = '';
enteredContent = '';
onAddPost(form: NgForm) {   
  if(form.invalid) {
    return;
  }
    /**const post: Post = {
      title: form.value.title,
      content:form.value.content
    } **/ // Post object Not needed as we will be using service
    //this.postCreated.emit(post); // Replacing this line by service component

    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }


}
