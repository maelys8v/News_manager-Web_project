import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-article-details',
  styleUrl: './article-details.css',
  templateUrl: './article-details.html',
})
export class ArticleDetails implements OnInit {
  id_value: string | null = '';
  article: Article | null = null;

  constructor(private route: ActivatedRoute, private newsService: NewsService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer,) {}
  
  ngOnInit(): void {
    this.id_value = this.route.snapshot.paramMap.get('id');
    console.log("init DETAIL")
    console.log(this.id_value)

    this.newsService.getArticle(this.id_value).subscribe({
      next: (a) => {
        this.article = a;
        console.log(this.article)
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        window.alert('Impossible de charger cet article');
      }
    });
  }

  trustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
