import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-article-details',
  styleUrl: './article-details.css',
  templateUrl: './article-details.html',
})
export class ArticleDetails implements OnInit {
  id_value: string | null = '';
  article: Article | null = null;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}
  
  ngOnInit(): void {
    this.id_value = this.route.snapshot.paramMap.get('id');
    
    console.log(Object.keys(arguments))

    this.newsService.getArticle(this.id_value).subscribe({
      next: (a) => {
        this.article = a;
      },
      error: (err) => {
        console.error(err);
        window.alert('Impossible de charger cet article');
      }
    });
  }
}
