import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClubActivity, ClubActivitiesFilter } from './model';
import { ClubActivityService } from './service';
import { AccountService } from '../auth/account.service';

@Component({
	template: `
<div class="container">

    <div class="d-flex align-items-end">
        <h1 class="mt-4">Activités</h1>
    </div>

	<form class="d-flex mt-4" xxstyle="display: none;">
		<div class="p-2">Recherche:</div>
		<input class="form-control me-1" type="search" [(ngModel)]="model.title" name="search"/>
		<button class="btn btn-primary" (click)="search()">
			<i class="bi bi-search"></i>
		</button>
         <button *ngIf="canEdit" class="btn btn-danger text-nowrap" routerLink="/club-activity/edit">
            Ajouter une activité
        </button>
	</form>

    <div class="search-result-table-area">
        <xyz-search-result [model]="model" [clubActivities]="clubActivities$ | async">
        </xyz-search-result>
    </div>
    
</div>
`
})
export class ClubActivitySearchComponent implements OnInit {

	constructor(
		private clubActivityService: ClubActivityService,
        private accountService: AccountService
	) {	}

	clubActivities$: Observable<ClubActivity[]>;
	model: ClubActivitiesFilter;
	filter: string;

	ngOnInit(): void {
		this.model = new ClubActivitiesFilter();
        this.clubActivities$ = this.clubActivityService.getClubActivities$()
            .pipe(
		        map(x => x.list),
//			    shareReplay(1)
		    );
        this.clubActivities$.subscribe();
        this.search();
	}

    get canEdit() {
        return this.accountService.userInfo.canEdit;
    }

	search(): void {
		this.clubActivityService.searchClubActivities(this.model.clone());
	}
}
