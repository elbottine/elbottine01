import { FilterBase } from "../shared/Filter-base";

export class SearchPhotoAlbumResponse {

	public constructor(init?: Partial<SearchPhotoAlbumResponse>) {
		this.list = init && init.list ? init.list.map(t => new PhotoAlbum(t)) : [];
	}

	list: PhotoAlbum[];
}

export class PhotoAlbum {

    public constructor(init?: Partial<PhotoAlbum>) {
		Object.assign(this, init);
	}

	get id(): string {
		return (<any>this)['_id'];
	}
	
	set id(value: string) {
		(<any>this)['_id'] = value;
	}

	title: string;
    date: string;
	text: string;
	paths: string[];
	createdAt: string;
	createdBy: string;
	updatedAt: string;
	updatedBy: string;
    mainImagePath: string;

	clone(): PhotoAlbum {
		return new PhotoAlbum(this);
	}

    get shortText(): string {
        return this.text?.substr(0, 500);
    }
}

export class ClubActivitiesFilter extends FilterBase {
	public constructor(init?: Partial<ClubActivitiesFilter>) {
		super();
		Object.assign(this, init);
	}

    title: string;
    
	clone(): ClubActivitiesFilter {
		return new ClubActivitiesFilter(this);
	}
}
