import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ConfirmDailogComponent } from './confirm-dailog/confirm-dailog.component';

import { ArticleService } from 'src/app/services/Article.service';
import { Article } from '../../../models/article';
import { Observable, Subscription } from 'rxjs';
import { checkTitle } from './duplicatetittle';
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
})
export class NewArticleComponent implements OnInit,OnDestroy {
  public creatArticleform!: FormGroup;
  public article: Article = {} as Article;
  public tagField = new FormControl();
  public isEditing = false;
  public ListArticle: Article[] = [];
  public subcription:Subscription=new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {
    this.subcription.add(this.articleService.getArticleListUser().subscribe((data) => {
      this.ListArticle = data.articles;
      this.creatArticleform = this.fb.group(
        {
          title: ['', [Validators.required]],
          description: ['', [Validators.required]],
          body: ['', [Validators.required]],
        },
        { validators: checkTitle('title', this.ListArticle) }
      );
    }))

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
    this.article.tagList = this.article.tagList.filter(
      (tag) => tag !== tagName
    );
  }

  creatArticle(
    title: string,
    description: string,
    body: string,
    tagList: string[]
  ) {

   return this.subcription.add(this.articleService
      .createArticle(title, description, body, tagList)
      .subscribe((res) => {

        this.route.navigate(['home']);
      }));
  }
  openDialog() {
    const ref = this.dialog.open(ConfirmDailogComponent, {
      data: {
        title: 'Do you want to leave this page?',
      },
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
    return this.isEditing || this.openDialog();
  }
  ngOnDestroy(){
    this.subcription.unsubscribe()
  }
}
