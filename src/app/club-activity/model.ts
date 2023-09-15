import { FilterBase } from "../shared/Filter-base";

export class SearchClubActivityResponse {

	public constructor(init?: Partial<SearchClubActivityResponse>) {
		this.list = init && init.list ? init.list.map(t => new ClubActivity(t)) : [];
	}

	list: ClubActivity[];
}

export class ClubActivity {

    public constructor(init?: Partial<ClubActivity>) {
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

	clone(): ClubActivity {
		return new ClubActivity(this);
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
