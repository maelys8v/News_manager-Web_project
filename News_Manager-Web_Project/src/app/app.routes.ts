import { Routes } from '@angular/router';
import { ArticleList } from './article-list/article-list';
import { RouterLink } from '@angular/router';
import { ArticleEdition } from './article-edition/article-edition';
import { ArticleDetails } from './article-details/article-details';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ArticleList },            // all categories
  { path: 'list/:category', component: ArticleList },  // ex: /list/economy
  { path: 'edit/:id', component : ArticleEdition},
  { path: 'detail/:id', component : ArticleDetails}
];