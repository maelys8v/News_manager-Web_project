import { Routes } from '@angular/router';
import { ArticleList } from './article-list/article-list';
import { RouterLink } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ArticleList },            // all categories
  { path: 'list/:category', component: ArticleList },  // ex: /list/economy
  // later: detail/:id, edit/:id ...
];