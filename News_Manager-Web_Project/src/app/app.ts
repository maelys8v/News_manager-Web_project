import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
//import { ArticleList } from './article-list/article-list';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('News_Manager-Web_Project');
}