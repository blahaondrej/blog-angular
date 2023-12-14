import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';

  private mode = 'create';
  private postId: string = '';
  public post: Post | undefined; // Initialize the 'post' property

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      console.log(paramMap);
      if (paramMap.has('postId')) {
        console.log('has postId');
        this.mode = 'edit';
        this.postId = paramMap.get('postId')!;
        this.post = this.postsService.getPost(this.postId) as Post | undefined;
      } else {
        console.log('does not have postId');
        this.mode = 'create';
        this.postId;
      }
    });
  }
}
