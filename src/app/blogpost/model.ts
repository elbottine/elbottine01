import { FilterBase } from "../shared/Filter-base";

export class SearchBlogpostResponse {

	public constructor(init?: Partial<SearchBlogpostResponse>) {
		this.blogposts = init && init.blogposts ? init.blogposts.map(t => new Blogpost(t)) : [];
	}

	blogposts: Blogpost[];
}

export class Blogpost {

    public constructor(init?: Partial<Blogpost>) {
		Object.assign(this, init);
        //if (!this.date) {
            // const date = new Date();
            // this.date = Date;
        //}
        if (typeof this.date === 'string') // || this.date instanceof String)
        {

        }
        else {
            this.date = null;
        }
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

	get updatedAtDate(): string {
		return new Date(Date.parse(this.updatedAt))
        .toLocaleDateString('fr-FR', 
            {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour12: false,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
	}

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
