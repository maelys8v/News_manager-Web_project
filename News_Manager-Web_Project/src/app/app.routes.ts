import { Routes } from '@angular/router';
import { ArticleList } from './article-list/article-list';
import { RouterLink } from '@angular/router';
import { ArticleEdition } from './article-edition/article-edition';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ArticleList },            // all categories
  { path: 'list/:category', component: ArticleList },  // ex: /list/economy
  { path: 'edit/:id', component : ArticleEdition},
  // later: detail/:id, edit/:id ...
];