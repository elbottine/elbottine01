import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoAlbum, ClubActivitiesFilter } from './model';
import { PhotoAlbumService } from './service';
import { AuthService } from '../auth/auth.service';

@Component({
	template: `
<div class="container">

    <div class="d-flex align-items-end">
        <h1 class="mt-4">Albums photo</h1>
    </div>

	<form class="d-flex mt-4" xxstyle="display: none;">
		<div class="p-2">Recherche:</div>
		<input class="form-control me-1" type="search" [(ngModel)]="model.title" name="search"/>
		<button class="btn btn-primary" (click)="search()">
			<i class="bi bi-search"></i>
		</button>
         <button *ngIf="canEdit" class="btn btn-danger text-nowrap" routerLink="/photo-album/edit">
            Ajouter un album photo
        </button>
	</form>

    <div class="search-result-table-area">
        <xyz-search-result [model]="model" [clubActivities]="clubActivities$ | async">
        </xyz-search-result>
    </div>
    
</div>
`
})
export class PhotoAlbumSearchComponent implements OnInit {

	constructor(
		private photoAlbumService: PhotoAlbumService,
        private authService: AuthService
	) {	}

	clubActivities$: Observable<PhotoAlbum[]>;
	model: ClubActivitiesFilter;
	filter: string;

	ngOnInit(): void {
		this.model = new ClubActivitiesFilter();
        this.clubActivities$ = this.photoAlbumService.getClubActivities$()
            .pipe(
		        map(x => x.list),
//			    shareReplay(1)
		    );
        this.clubActivities$.subscribe();
        this.search();
	}

    get canEdit() {
        return this.authService.canEdit;
    }

	search(): void {
		this.photoAlbumService.searchClubActivities(this.model.clone());
	}
}
