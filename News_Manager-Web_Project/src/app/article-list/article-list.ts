import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core'; // to correct the delay issue when publishing
import { NewsService } from '../services/news'
import { Observable, of } from 'rxjs';

import { ActivatedRoute,RouterLink } from '@angular/router';



@Component({
  imports: [CommonModule, FormsModule, RouterLink],
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

  private allArticles: Article[] = [];
  articles: Article[] = [];
  private category: string | null = null;

  @ViewChild('articleForm') articleForm: any;

  constructor(
    private cdr: ChangeDetectorRef, 
    private articleService : NewsService,
    private route: ActivatedRoute, 
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
      this.cdr.detectChanges();
    });
  }

  private applyFilter() {
    this.articles = this.category
      ? this.allArticles.filter(
          a => a.category.toLowerCase() === this.category!.toLowerCase())
      : this.allArticles;
  }

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










