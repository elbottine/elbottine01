import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blogpost, BlogpostsFilter } from './model';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'xyz-search-result',
	template: `
<div class="card my-4" *ngFor="let model of blogposts">
    <!-- <img class="card-img-left debug" [src]="model.mainImagePath" style="width:200px; heigth:200px;"> -->
    <div class="card-body">
        <div class="card-title d-flex my-3">
            <div class="p-2"><h3>{{model.title}}</h3></div>
            <div class="ms-auto p-2"><h3>{{model.date| dateFormat}}</h3></div>
        </div>
        <div [innerHTML]="model.shortText"></div>
        <div class="d-flex align-items-end">
            <div class="text-muted">{{model.updatedBy}} - {{model.updatedAt | dateFormat: 'dt'}}</div>
            <div class="ms-auto">
            <button class="btn btn-primary" [routerLink]="['/blogpost', 'read', model.id]">La suite...</button>
            <button class="btn btn-primary" [routerLink]="['/blogpost', 'edit', model.id]" *ngIf="canEdit(model)">Modifier</button>
            </div>
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
