import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blogpost, BlogpostsFilter } from './model';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'xyz-search-result',
	template: `
<div class="card my-4 flex-row" *ngFor="let model of blogposts">
    <!-- <img class="card-img-left debug" [src]="model.mainImagePath" style="width:200px; heigth:200px;"> -->
    <div class="card-body">
        <h3 class="card-title">{{model.title}}</h3>
        <div [innerHTML]="model.shortText"></div>
        <div class="d-flex align-items-end">
            <div class="text-muted">{{model.createdBy}} - {{model.createdAtDate}}</div>
            <div class="ms-auto">
            <button class="btn btn-outline-primary" [routerLink]="['/blogpost', 'read', model.id]">La suite...</button>
            <button class="btn btn-outline-primary" [routerLink]="['/blogpost', 'edit', model.id]" *ngIf="canEdit(model)">Modifier</button>
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

	htmlContent = '';

    canEdit(blogpost: Blogpost) {
        return blogpost.id && this.authService.canEdit;
    }

	// <!--  (click)="viewDetail(item.id, $event)"> -->
	// viewDetail(id: number, $event: any) {
	// 	$event.stopPropagation();
	// 	//this.router.navigateByUrl('/blogpost/' + id);
	// }
}
