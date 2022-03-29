import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/Article.service';
import { ConfirmDailogComponent } from '../confirm-dailog/confirm-dailog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public creatArticleform!: FormGroup;
  public article: Article = {} as Article;
  public tagField = new FormControl();
  public isEditing=false

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private articleService: ArticleService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.creatArticleform = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      body: ['', [Validators.required]],

    });
    this.article.tagList = [];
  }

  ngOnInit(): void {
    this.activeRoute.params.pipe(switchMap((parmas)=>{
      return this.articleService.getSlugArticle(parmas['slug'])
    })).subscribe((respon)=>{
      this.article=respon.article
      this.creatArticleform.patchValue(this.article)

    })
  }
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
    this.isEditing=true
    this.updateArticle(this.creatArticleform.value);
    if (this.article.slug) {
      this.articleService
        .updateArticle(this.article.slug, title, description, body, tagList)
        .subscribe((data) => {
          this.route.navigate([`home/${data.article.slug}`]);
        });
    }
  }
  updateArticle(values: Object) {
    Object.assign(this.article, values);
  }
  openDialog() {
    const ref = this.dialog.open(ConfirmDailogComponent, {
      data: {
        title: 'Do you want to leave this page?'
      }
    });
    return ref.afterClosed();
  }
  checkDeactivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isEditing || this.openDialog();
  }
}
