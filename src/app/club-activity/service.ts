import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { ClubActivity, ClubActivitiesFilter, SearchClubActivityResponse } from './model';

@Injectable({
	providedIn: 'root'
})
export class ClubActivityService {
	private url = 'api/club-activity/';

	private clubActivities$: Observable<SearchClubActivityResponse>;
	private searchClubActivitiesChange$ = new Subject<ClubActivitiesFilter>();
	
	constructor(
		private httpClient: HttpClient
	) {}

	get(id: string): Observable<ClubActivity> {
		return this.httpClient.get<ClubActivity>(this.url + id).pipe(map(b => new ClubActivity(b)));
	}

	upsert(clubActivity: ClubActivity): Observable<ClubActivity> {
        let response: Observable<Object>;
		if (clubActivity.id) {
			response = this.httpClient.put(this.url + clubActivity.id, clubActivity);
		} else {
			response = this.httpClient.post(this.url, clubActivity);
		}
        return response.pipe(map(r => new ClubActivity(r)));
	}

	delete(clubActivityId: string): Observable<any> {
		return this.httpClient.delete(this.url + clubActivityId);
	}

	searchClubActivities(filter?: ClubActivitiesFilter): void {
		this.searchClubActivitiesChange$.next(filter);
	}

	getClubActivities$(): Observable<SearchClubActivityResponse> {
		if (!this.clubActivities$) {
			this.clubActivities$ = this.searchClubActivitiesChange$.pipe(
				switchMap(filter => this.searchClubActivities2(filter)),
				shareReplay(1)
			);
		}
		return this.clubActivities$;
	}

	searchClubActivities2(filter?: ClubActivitiesFilter): Observable<SearchClubActivityResponse> {
		const params = this.getHttpParams(filter);
		return this.httpClient
			.get<SearchClubActivityResponse>(this.url, params)
			.pipe(map(x =>
                 new SearchClubActivityResponse(x)
                 ));
	}

	private getHttpParams(filter?: object): {} {
		let params = new HttpParams();
		if (filter) {
			Object.keys(filter)
				.filter(property => !property.startsWith('_'))
				.forEach(property => {
					const value = (<any>filter)[property];
					if (value !== null && value !== undefined) {
						params = params.append(property, `${value}`);
					}
				});
		}
		return { params };
	}
}
