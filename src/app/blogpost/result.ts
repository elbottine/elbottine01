import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blogpost, BlogpostsFilter } from './model';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'xyz-search-result',
	template: `
<!-- <div class="card my-4 bg-light" *ngFor="let model of blogposts">
    <div class="card-body">
        <div class="card-title d-flex my-2">
            <div class=""><h3>{{model.title}}</h3></div>
            <div class="ms-auto"><h3>{{model.date| dateFormat}}</h3></div>
        </div>
        <div [innerHTML]="model.shortText"></div>
        <div class="d-flex align-items-end">
            <div class="text-muted">{{model.updatedBy}} - {{model.updatedAt | dateFormat: 'dt'}}</div>
            <div class="ms-auto">
                <button class="btn btn-primary btn-sm" [routerLink]="['/blogpost', 'read', model.id]">La suite...</button>
                <button class="btn btn-primary btn-sm" [routerLink]="['/blogpost', 'edit', model.id]" *ngIf="canEdit(model)">Modifier</button>
            </div>
        </div>
    </div>
</div> -->

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
