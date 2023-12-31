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
  isLoading = false;
  private mode = 'create';
  private postId: string = '';
  public post: Post | undefined; // Initialize the 'post' property

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.isLoading = true;
      this.postsService.addPost(form.value.title, form.value.content);
    } else if (this.mode === 'edit') {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }

    form.resetForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      console.log(paramMap);
      if (paramMap.has('postId')) {
        console.log('has postId');
        this.mode = 'edit';
        this.postId = paramMap.get('postId')!;
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        console.log('does not have postId');
        this.mode = 'create';
        this.postId;
      }
    });
  }
}
