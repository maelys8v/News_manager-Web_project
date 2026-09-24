import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Highlight } from '../directives/highlight'
import { ChangeDetectorRef } from '@angular/core'; // to correct the delay issue when publishing
import { NewsService } from '../services/news'
import { Observable, of } from 'rxjs';

@Component({
  imports: [CommonModule, FormsModule, Highlight],
  standalone: true,
  selector: 'app-article-list',
  styleUrl: './article-list.css',
  templateUrl: './article-list.html',
})
export class ArticleList{ //implements OnInit {

  article: Article = {
    title: "",
    subtitle: "",
    body: "",
    abstract: "",
    category: 'National',
    id: "",
    id_user:"",
    update_date: Date.now(),
  };

  articles = new Observable<Article[]>; // The list of articles -> add 3 hard ones in the constructor


  @ViewChild('articleForm') articleForm: any;

  constructor(private cdr: ChangeDetectorRef, private articleService : NewsService) { // ChangeDetectorRef to correct the delay issue when publishing
    this.articles = articleService.getArticles();       
  }




  // addArticle():void{//title: string, subtitle: string, body: string, abstract: string, category: 'National' | 'International' | 'Sports' | 'Economy', id: number): void {
  //   // this.article.title = title;
  //   // this.article.subtitle = subtitle;
  //   // this.article.body = body;
  //   // this.article.abstract = abstract;
  //   // this.article.category = category;
  //   this.article.id = this.articleService.getId();

  //   this.articleService.addArticle(this.article)
  //   this.cdr.detectChanges(); // to correct the delay issue when publishing
  //   window.alert(`The article [${this.article.title}] has been published`);
  //   this.clear();
  // }

  getArticle(id:string|null): Observable<Article>{
    let a : Observable<Article>;
    a = this.articleService.getArticle(id);
    window.alert(`Done`);
    return a;
  }



  clear(): void {
    this.articleForm.resetForm({ category: 'National' });
  }
}










