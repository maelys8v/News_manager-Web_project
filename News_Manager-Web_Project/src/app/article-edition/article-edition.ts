import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Highlight } from '../directives/highlight'
import { ChangeDetectorRef } from '@angular/core'; // to correct the delay issue when publishing
import { NewsService } from '../services/news'
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  imports: [CommonModule, FormsModule, Highlight],
  standalone: true,
  selector: 'app-article-edition',
  styleUrl: './article-edition.css',
  templateUrl: './article-edition.html',
})
export class ArticleEdition implements OnInit {

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

  articles: Article[] = []; 


  @ViewChild('articleForm') articleForm: any;

  constructor(private cdr: ChangeDetectorRef, 
    private articleService : NewsService,
    private route: ActivatedRoute, 
    private newsService: NewsService) { // ChangeDetectorRef to correct the delay issue when publishing
    
    
  }

  ngOnInit() {
    console.log('init');
    
    // load once
    this.newsService.getArticles().subscribe({
      next: (list) => {
        console.log('réponse API :', list);
        console.log(Object.keys(list[0]));
        this.articles = list;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        window.alert('Impossible de charger les articles');
      }
    });

    // react every time the URL category changes
   // this.route.paramMap.subscribe(params => {
     // this.article.category = params.get('category');   // null on /list
     // this.cdr.detectChanges();
    //});
  }

  // sendForm(): void {
  //   window.alert("Received information: " 
  //     + this.article.title + " " 
  //     + this.article.subtitle + " " 
  //     + this.article.body + " " 
  //     + this.article.abstract + " " 
  //     + this.article.category);
  // }

  sendForm(): void {
  
    const { id, ...payload } = this.article;   


    const newArticle = { ...payload, update_date: Date.now() } as Article;
    this.articleService.createArticle(newArticle).subscribe({
      next: (created) => {
        console.log('Article created', created);
        window.alert(`The article [${this.article.title}] has been published`);
        this.clear();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('status:', err.status, 'body:', err.error);
        window.alert(`Could not publish: ${err.status} ${JSON.stringify(err.error)}`);
      }
    });
  }


  clear(): void {
    this.articleForm.resetForm({ category: 'National' });
  }
}










