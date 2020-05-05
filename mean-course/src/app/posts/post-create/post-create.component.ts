import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

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

enteredValue = '';
newPost = 'No Content';
onAddPost(){   
  this.newPost=this.enteredValue;
}


}
