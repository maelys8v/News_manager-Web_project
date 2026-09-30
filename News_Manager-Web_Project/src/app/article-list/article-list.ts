import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core'; // to correct the delay issue when publishing
import { NewsService } from '../services/news'
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { TextpipePipe } from '../pipes/text-pipe-pipe';



@Component({
  imports: [CommonModule, FormsModule, RouterLink, TextpipePipe],
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
  term: string = ""

  @ViewChild('articleForm') articleForm: any;

  constructor(
    private cdr: ChangeDetectorRef, 
    private articleService : NewsService,
    private route: ActivatedRoute, 
    private newsService: NewsService,
    private sanitizer: DomSanitizer) {}
  
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


  removeArticle(article: Article): void {
    if (window.confirm(`Are you sure you want to delete the article "${article.title}"?`)) {
      this.newsService.deleteArticle(article).subscribe({
        next: () => {
          this.allArticles = this.allArticles.filter(a => a.id !== article.id);
          this.applyFilter();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err); 
          window.alert('Impossible de supprimer l\'article');
        }
      });
    }
  }

  clear(): void {
    this.articleForm.resetForm({ category: 'National' });
  }

  trustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}










