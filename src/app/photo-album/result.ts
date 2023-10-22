import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoAlbum, ClubActivitiesFilter } from './model';
import { AccountService } from '../auth/account.service';

@Component({
	selector: 'xyz-search-result',
	template: `
<div class="mt-4">
    <div class="row p-2 mt-3 bg-light border" *ngFor="let model of clubActivities">
        <div class="col-lg-2">{{model.date| dateFormat}}</div>
        <div class="col-lg-7">{{model.title}}</div>
        <div class="col-lg-3 text-end">
            <a [routerLink]="['/photo-album', 'read', model.id]" class="">La suite...</a>
            <a [routerLink]="['/photo-album', 'edit', model.id]" class="ms-2" *ngIf="canEdit(model)">Modifier</a>
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
	clubActivities: PhotoAlbum[];

    canEdit(photoAlbum: PhotoAlbum) {
        return photoAlbum.id && this.accountService.userInfo.canEdit;
    }
}
