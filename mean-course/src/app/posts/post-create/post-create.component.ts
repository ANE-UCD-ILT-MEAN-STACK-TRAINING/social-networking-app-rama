import { Component,  OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

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
onAddPost() {   
    const post: Post = {
      title: this.enteredTitle,
      content:this.enteredContent
    }
    this.postCreated.emit(post);
  }


}
