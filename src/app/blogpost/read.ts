import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog.service';
import { BlogpostService } from './service';
import { Blogpost } from './model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IAlbum, Lightbox } from 'ngx-lightbox';

@Component({
    template: `
<form #MyForm="ngForm" *ngIf="model">

<div class="container">
	<div class="col d-grid gap-3 my-3" *ngIf="model.id">
		<h2 class=" my-3">{{model.title}}</h2>
		<div class="card-text" [innerHTML]="model.text"></div>

        <div class="imgcontainer">
            <div class="gallery" *ngFor="let path of model.paths; let i=index">
                <img src="{{path}}" (click)="open(i)" />
            </div>
        </div>

        <!-- <div class="w-auto" style="min-height: 0px;background-color: #eee;">
            <img *ngFor="let path of model.paths" [src]="path" class="preview" style="width: 200px; height: 200px; object-fit: cover;" />
        </div>         -->

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
    styles: [`.form-control.ng-touched.ng-invalid{border-color: red;}`,
    `
	.imgcontainer {
	  max-width: 1170px;
	  width: 100%;
	  padding-right: 15px;
	  padding-left: 15px;
	  margin-right: auto;
	  margin-left: auto;
	}

	.imgcontainer .gallery img {
	  float: left;
	  //width: 20%;
	  //height: auto;
      max-width: 200px;
      max-height: 200px;
	 // border: 2px solid #fff;
	  -webkit-transition: -webkit-transform .15s ease;
	  -moz-transition: -moz-transform .15s ease;
	  -o-transition: -o-transform .15s ease;
	  -ms-transition: -ms-transform .15s ease;
	  transition: transform .15s ease;
	  position: relative;
	}
  `]
})
export class BlogpostReadComponent implements OnInit {

    constructor(
        private blogpostService: BlogpostService,
        private activatedRoute: ActivatedRoute,
        private accountService: AuthService,
        private _lightbox: Lightbox)
    { }

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


    
      open(index: number): void {
        // open lightbox
        var xxx = [<IAlbum> {
            src: this.model.paths[index],
            caption: '',
            thumb: this.model.paths[index]
        }];
        this._lightbox.open(xxx, 0);
      }
    
      close(): void {
        // close lightbox programmatically
        this._lightbox.close();
      }
      
}
