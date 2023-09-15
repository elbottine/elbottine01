import { FilterBase } from "../shared/Filter-base";

export class SearchBlogpostResponse {

	public constructor(init?: Partial<SearchBlogpostResponse>) {
		this.list = init && init.list ? init.list.map(t => new Blogpost(t)) : [];
	}

	list: Blogpost[];
}

export class Blogpost {

    public constructor(init?: Partial<Blogpost>) {
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

	clone(): Blogpost {
		return new Blogpost(this);
	}

    get shortText(): string {
        return this.text?.substr(0, 500);
    }
}

export class BlogpostsFilter extends FilterBase {
	public constructor(init?: Partial<BlogpostsFilter>) {
		super();
		Object.assign(this, init);
	}

    title: string;
    
	clone(): BlogpostsFilter {
		return new BlogpostsFilter(this);
	}
}
