import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { UsersRestApiService } from '../../services/users-rest-api.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.less',
  imports: [AsyncPipe, MatCardModule],
  standalone: true,
})
export class UserPostsComponent implements OnInit {
  public _posts$?: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersRestApiService
  ) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._posts$ = this.usersService.getUserPosts(id);
    }
  }
}
