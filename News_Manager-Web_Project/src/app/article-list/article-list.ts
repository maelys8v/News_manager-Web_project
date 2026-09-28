import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Highlight } from '../directives/highlight'
import { ChangeDetectorRef } from '@angular/core'; // to correct the delay issue when publishing
import { NewsService } from '../services/news'
import { Observable, of } from 'rxjs';

import { ActivatedRoute, Router, NavigationExtras,RouterLink } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  imports: [CommonModule, FormsModule, Highlight, RouterLink],
  standalone: true,
  selector: 'app-article-list',
  styleUrl: './article-list.css',
  templateUrl: './article-list.html',
})
export class ArticleList implements OnInit {

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

  //articles = new Observable<Article[]>; // The list of articles -> add 3 hard ones in the constructor
  private allArticles: Article[] = [];
  articles: Article[] = [];
  private category: string | null = null;

  @ViewChild('articleForm') articleForm: any;

  constructor(
    private cdr: ChangeDetectorRef, 
    private articleService : NewsService,
    private route: ActivatedRoute, 
    private location: Location,
    private router: Router,
    private newsService: NewsService) {}
  
  ngOnInit() {
    console.log('init');
    
    // load once
    this.newsService.getArticles().subscribe({
      next: (list) => {
        console.log('réponse API :', list);
        console.log(Object.keys(list[0]));
        this.allArticles = list;
        this.applyFilter();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        window.alert('Impossible de charger les articles');
      }
    });

    // react every time the URL category changes
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');   // null on /list
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.articles = this.category
      ? this.allArticles.filter(
          a => a.category.toLowerCase() === this.category!.toLowerCase())
      : this.allArticles;
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










