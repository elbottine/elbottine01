import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog.service';
import { BlogpostService } from './service';
import { Blogpost } from './model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    template: `
<form #MyForm="ngForm" *ngIf="model">

<div class="container">
	<div class="col d-grid gap-3 my-3" *ngIf="model.id">
		<h2 class=" my-3">{{model.title}}</h2>
		<div class="card-text" [innerHTML]="model.text"></div>

        <div class="w-auto" style="min-height: 0px;background-color: #eee;">
            <img *ngFor="let path of model.paths" [src]="path" class="preview" style="width: 200px; height: 200px; object-fit: cover;" />
        </div>        

        <div class="d-flex align-items-end">
            <div class="text-muted">{{model.createdBy}} - {{model.createdAtDate}}</div>
            <div class="ms-auto">
            <button class="btn btn-outline-primary" [routerLink]="['/blogpost', 'edit', model.id]" *ngIf="canEdit(model)">Modifier</button>
            </div>
        </div>        
    </div>
</div>

</form>
`,
    styles: [`.form-control.ng-touched.ng-invalid{border-color: red;}`],
})
export class BlogpostReadComponent implements OnInit {

    constructor(
        private blogpostService: BlogpostService,
        private activatedRoute: ActivatedRoute,
        private accountService: AuthService
    ) { }

    model: Blogpost;
    id: string;

    ngOnInit() {
        this.parseRouteParameters();
        this.get();
    }

    private parseRouteParameters() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }

    private get() {
        this.blogpostService
            .get(this.id)
            .subscribe((b: Blogpost) => {
                this.model = b;
            });
    }

    canEdit(blogpost: Blogpost) {
        return blogpost.id && this.accountService.isLogged;
    }
}
