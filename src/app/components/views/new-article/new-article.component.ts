import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { ConfirmDailogComponent } from './confirm-dailog/confirm-dailog.component';

import { ArticleService } from 'src/app/services/Article.service';
import { Article } from '../../../models/article';
import { Observable, Subscription, } from 'rxjs';
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit, OnDestroy {
  public creatArticleform!: FormGroup;
  public article: Article = {} as Article;
  public tagField = new FormControl();
  public isEditing = false;
  public ListArticle: Article[] = [];
  public subcription: Subscription = new Subscription();
  public CurrentUserName !:string
  public error!:string

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private articleService: ArticleService,
    private dialog: MatDialog,
  ) {
        this.creatArticleform = this.fb.group(
          {
            title: ['' ],
            description: [''],
            body: ['']

      })


    this.article.tagList = [];
  }

  ngOnInit(): void {}

  addTag() {
    const tag = this.tagField.value;

    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }

    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  creatArticle(
    title: string,
    description: string,
    body: string,
    tagList: string[]
  ) {
  this.subcription.add(
    this.articleService.createArticle(title, description, body, tagList)
        .subscribe({next:((res) => {this.route.navigate(['home']);
        }),error:err=> this.error= err.error.errors.title[0]

  }))}
  openDialog() {
    const ref = this.dialog.open(ConfirmDailogComponent, {
      data: {
        title: 'Do you want to leave this page?'
      }
    });
    return ref.afterClosed();
  }
  checkDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isEditing  || this.openDialog()
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
