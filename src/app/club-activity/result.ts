import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClubActivity, ClubActivitiesFilter } from './model';
import { AccountService } from '../auth/account.service';

@Component({
	selector: 'xyz-search-result',
	template: `
<div class="mt-4">
    <div class="row p-2 mt-3 bg-light border" *ngFor="let model of clubActivities">
        <div class="col-lg-2">{{model.date| dateFormat}}</div>
        <div class="col-lg-7">{{model.title}}</div>
        <div class="col-lg-3 text-end">
            <a [routerLink]="['/club-activity', 'read', model.id]" class="">La suite...</a>
            <a [routerLink]="['/club-activity', 'edit', model.id]" class="ms-2" *ngIf="canEdit(model)">Modifier</a>
        </div>
    </div>
</div>
`
})
export class SearchResultComponent {

	constructor(private router: Router, private accountService: AccountService) { }

	@Input()
	model: ClubActivitiesFilter;

	@Input()
	clubActivities: ClubActivity[];

    canEdit(clubActivity: ClubActivity) {
        return clubActivity.id && this.accountService.userInfo.canEdit;
    }
}
