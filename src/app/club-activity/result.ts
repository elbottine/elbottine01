import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClubActivity, ClubActivitiesFilter } from './model';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'xyz-search-result',
	template: `
<div class="mt-4">
    <div class="d-flex align-middle g-2 mb-2" *ngFor="let model of clubActivities">
        <div class="align-middle me-2">{{model.date| dateFormat}}</div>
        <div class="align-middle me-auto">{{model.title}}</div>
        <button class="btn btn-primary btn-sm" [routerLink]="['/club-activity', 'read', model.id]">La suite...</button>
        <button class="btn btn-primary btn-sm" [routerLink]="['/club-activity', 'edit', model.id]" *ngIf="canEdit(model)">Modifier</button>
    </div>
</div>
`
})
export class SearchResultComponent {

	constructor(private router: Router, private authService: AuthService) { }

	@Input()
	model: ClubActivitiesFilter;

	@Input()
	clubActivities: ClubActivity[];

    canEdit(clubActivity: ClubActivity) {
        return clubActivity.id && this.authService.canEdit;
    }
}
