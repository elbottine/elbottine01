import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, first, map, tap } from 'rxjs';

@Component({
    template: `<span [innerHTML]="content | async"></span>`,
})
export class HtmlContentComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private readonly httpClient: HttpClient,
        private readonly sanitizer: DomSanitizer
    ) { }

    path: string;
    content: Observable<SafeHtml>

    ngOnInit() {
        const sub = this.route.data
            .pipe(first())
            .subscribe(data => {
                this.path = data.path;
                this.content = this.getContent();
            });
    }

    public getContent(): Observable<SafeHtml> {
        const headers = new HttpHeaders({ 'Content-Type':  'text/plain' });
        return this.httpClient.get(this.path, {
            headers,
            responseType: 'text'
        }).pipe(
            map((html: string) => this.sanitizer.bypassSecurityTrustHtml(html))
        );
    }
}
