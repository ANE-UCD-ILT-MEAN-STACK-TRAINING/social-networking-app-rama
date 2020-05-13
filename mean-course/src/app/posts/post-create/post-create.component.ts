import { Component,  OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';
  private postId : string;
  post : Post;
  isLoading = false;
  form : FormGroup;
  imagePreview : string;

  constructor(public postsService : PostsService, public route : ActivatedRoute) { }

  @Output() postCreated = new EventEmitter();

  ngOnInit(): void {
        this.form = new FormGroup({
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        content: new FormControl(null, { validators: [Validators.required] }),
        image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
      });
  
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        //this.postsService.getPost(this.postId);
        // Replace the above line by the below 3 lines of code.
        this.postsService.getPost(this.postId).subscribe(postData => {
          console.log("Post data title from getPost service " + postData.title);
          this.isLoading = false;
          this.post = { 
            id: postData._id,
            title: postData.title, 
            content: postData.content, 
            imagePath: postData.imagePath }
            console.log("after getting post title from postservice " + this.post.title);
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath
            });
          });  
        }
        else {
        this.mode = 'create';
        this.postId = null;
        }
    });
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

    this.postsService.addPost(form.value.title, form.value.content, form.value.imagePath);
    form.resetForm();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }




  onSavePost() {
    if (this.form.invalid) return;
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
     this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }

    this.form.reset();
  }

}
