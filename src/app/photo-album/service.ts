import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { PhotoAlbum, ClubActivitiesFilter, SearchPhotoAlbumResponse } from './model';

@Injectable({
	providedIn: 'root'
})
export class PhotoAlbumService {
	private url = 'api/blog/photo-album/';

	private clubActivities$: Observable<SearchPhotoAlbumResponse>;
	private searchClubActivitiesChange$ = new Subject<ClubActivitiesFilter>();
	
	constructor(
		private httpClient: HttpClient
	) {}

	get(id: string): Observable<PhotoAlbum> {
		return this.httpClient.get<PhotoAlbum>(this.url + id).pipe(map(b => new PhotoAlbum(b)));
	}

	upsert(photoAlbum: PhotoAlbum): Observable<PhotoAlbum> {
        let response: Observable<Object>;
		if (photoAlbum.id) {
			response = this.httpClient.put(this.url + photoAlbum.id, photoAlbum);
		} else {
			response = this.httpClient.post(this.url, photoAlbum);
		}
        return response.pipe(map(r => new PhotoAlbum(r)));
	}

	delete(photoAlbumId: string): Observable<any> {
		return this.httpClient.delete(this.url + photoAlbumId);
	}

	searchClubActivities(filter?: ClubActivitiesFilter): void {
		this.searchClubActivitiesChange$.next(filter);
	}

	getClubActivities$(): Observable<SearchPhotoAlbumResponse> {
		if (!this.clubActivities$) {
			this.clubActivities$ = this.searchClubActivitiesChange$.pipe(
				switchMap(filter => this.searchClubActivities2(filter)),
				shareReplay(1)
			);
		}
		return this.clubActivities$;
	}

	searchClubActivities2(filter?: ClubActivitiesFilter): Observable<SearchPhotoAlbumResponse> {
		const params = this.getHttpParams(filter);
		return this.httpClient
			.get<SearchPhotoAlbumResponse>(this.url, params)
			.pipe(map(x =>
                 new SearchPhotoAlbumResponse(x)
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
