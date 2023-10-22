import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blogpost, BlogpostsFilter } from './model';
import { BlogpostService } from './service';
import { AccountService } from '../auth/account.service';

@Component({
	template: `
<div class="container">

    <div class="d-flex align-items-end">
        <h1 class="mt-4">Evénements</h1>
    </div>

	<form class="d-flex mt-4" xxstyle="display: none;">
		<div class="p-2">Recherche:</div>
		<input class="form-control me-1" type="search" [(ngModel)]="model.title" name="search"/>
		<button class="btn btn-primary" (click)="search()">
			<i class="bi bi-search"></i>
		</button>
         <button *ngIf="canEdit" class="btn btn-danger text-nowrap" routerLink="/blogpost/edit">
            Ajouter un événement
        </button>
	</form>

    <div class="search-result-table-area">
        <xyz-search-result [model]="model" [blogposts]="blogposts$ | async">
        </xyz-search-result>
    </div>
    
</div>
`
})
export class BlogpostSearchComponent implements OnInit {

	constructor(
		private blogpostService: BlogpostService,
        private accountService: AccountService
	) {	}

	blogposts$: Observable<Blogpost[]>;
	model: BlogpostsFilter;
	filter: string;

	ngOnInit(): void {
		this.model = new BlogpostsFilter();
        this.blogposts$ = this.blogpostService.getBlogposts$()
            .pipe(
		        map(x => x.list),
//			    shareReplay(1)
		    );
        this.blogposts$.subscribe();
        this.search();
	}

    get canEdit() {
        return this.accountService.userInfo.canEdit;
    }

	search(): void {
		this.blogpostService.searchBlogposts(this.model.clone());
	}
}
