import { Component, ElementRef, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Highlight } from '../directives/highlight'
import { ChangeDetectorRef } from '@angular/core'; // to correct the delay issue when publishing
import { NewsService } from '../services/news'
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash'



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
      image_media_type: "",
      image_data: ""
    };

  articles: Article[] = []; 
  id_value: string | null = '';

  //image attributes
  imageError: string | null = null;
  isImageSaved: boolean = false;
  cardImageBase64: string | null = null;


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
        if (this.article.image_data) {
          this.cardImageBase64 = 'data:' + this.article.image_media_type + ';base64,' + this.article.image_data;
          this.isImageSaved = true;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
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
      image_media_type: '',
      image_data: ''
    };
  
  }

  clear(): void {
    this.articleForm.resetForm();
    this.article = this.emptyArticle();
  }


//dealing with images as described in auxiliary material: 

// The controller where the function imaged is loaded must include the following: 


//
// * Function "fileChangeEvent", which reads the file introduced by the user, converts it into base64 and updates the following attributes: 
//
// this.cardImageBase64
// this.isImageSaved
// this.article.image_media_type 
// this.article.image_data
@ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  addImage() {
    this.imageInput.nativeElement.click();
    this.cdr.detectChanges();
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.article.image_media_type = '';
    this.article.image_data = '';
    this.imageInput.nativeElement.value = ''; // lets you re-select the same file
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > MAX_SIZE) {
        this.imageError =
          'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          this.cdr.detectChanges();

          this.article.image_media_type = fileInput.target.files[0].type;
          const head = this.article.image_media_type.length + 13;
          this.article.image_data = e.target.result.substring(head, e.target.result.length);
          this.cdr.detectChanges();

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    this.cdr.detectChanges();
    return true;
  }


}










