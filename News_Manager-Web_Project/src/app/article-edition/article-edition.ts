import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Highlight } from '../directives/highlight'
import { ChangeDetectorRef } from '@angular/core'; // to correct the delay issue when publishing
import { NewsService } from '../services/news'
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


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
  id_value: string | null = '';


  @ViewChild('articleForm') articleForm: any;

  constructor(private cdr: ChangeDetectorRef, 
    private articleService : NewsService,
    private route: ActivatedRoute, 
    private router: Router,
    private newsService: NewsService) { // ChangeDetectorRef to correct the delay issue when publishing
    
    
  }

  ngOnInit() {
     this.route.paramMap.subscribe(params => {
      this.id_value = params.get('id');

      if (this.id_value) {
        this.newsService.getArticle(this.id_value).subscribe({
      next: (a) => {
        this.article = a;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        window.alert('Impossible de charger cet article');
        this.id_value = null;
        this.article = this.emptyArticle();
        this.router.navigate(['/articles/new']);   // adjust to your route
      },
    });
      } else {
        this.article = this.emptyArticle();
      }
    });
  }

  sendForm(): void {
  
      
    

    if (this.id_value) {
    const updatedArticle = { ...this.article, update_date: Date.now() } as Article;
    this.newsService.updateArticle(updatedArticle).subscribe({
      next: () => {
        window.alert(`The article [${this.article.title}] has been updated`);
        this.router.navigate(['/']);   // wherever your list lives
      },
      error: (err) => window.alert(`Could not update: ${err.status} ${JSON.stringify(err.error)}`),
    });
    } else {
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

    
  }

   private emptyArticle(): Article {
    return {
      title: '',
      subtitle: '',
      body: '',
      abstract: '',
      category: 'National',
      id: '',
      id_user: '',
      update_date: Date.now(),
    };
  }

  clear(): void {
    this.articleForm.resetForm();
    this.article = this.emptyArticle();
  }
}










