import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blogpost, BlogpostsFilter } from './model';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'xyz-search-result',
	template: `
<div class="mt-4">
    <div class="row bg-light mt-3 p-3 border" *ngFor="let model of blogposts">
        <div class="col-lg-10"><p class="fs-3">{{model.title}}</p></div>
        <div class="col-lg-2"><p class="fs-4">{{model.date | dateFormat}}</p></div>
        <div class="my-4 text-secondary" [innerHTML]="model.shortText" *ngIf="model.shortText"></div>        
        <div class="col text-end">
            <a [routerLink]="['/blogpost', 'read', model.id]" class="">La suite...</a>
            <a [routerLink]="['/blogpost', 'edit', model.id]" class="ms-2" *ngIf="canEdit(model)">Modifier</a>
        </div>
    </div>
</div>
`
})
export class SearchResultComponent {

	constructor(private router: Router, private authService: AuthService) { }

	@Input()
	model: BlogpostsFilter;

	@Input()
	blogposts: Blogpost[];

    canEdit(blogpost: Blogpost) {
        return blogpost.id && this.authService.canEdit;
    }
}
