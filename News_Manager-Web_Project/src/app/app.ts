import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, RouterLink, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('News_Manager-Web_Project');

  term = signal('');

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.term.set(params.get('q') ?? '');
    });
  }

  onSearch(value: string): void {
    this.term.set(value);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: value || null },   // null retire le param si vide
      queryParamsHandling: 'merge',         // garde la catégorie dans le path
    });
  }
}