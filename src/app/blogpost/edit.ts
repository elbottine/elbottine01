import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog.service';
import { BlogpostService } from './service';
import { Blogpost } from './model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from '../auth/auth.service';

@Component({
    template: `
<form #MyForm="ngForm">

<div class="container">
<div class="d-grid gap-5 my-5" *ngIf="model">

	<h1 class="">Evénement</h1>

	<div>
        <label for="title" class="form-label h3">Titre</label>        
		<input type="text" class="form-control" [placeholder]="'Entrer le titre ici...'" 
			*ngIf="model"
			id="title" name="title"
			[(ngModel)]="model.title"
			required />
	</div>

	<div>
        <label for="title" class="form-label h3">Photo principale</label>
        <app-upload-images [blogpostId]="id" [previews]="model.paths" [singleImage]=true></app-upload-images>
	</div>

	<div>
        <label for="title" class="form-label h3">Texte</label>
    	<angular-editor [placeholder]="'Entrer le texte ici...'" style="min-height: 500px;"
			*ngIf="model" 
			[(ngModel)]="model.text"
			id="text" name="text">
		</angular-editor>
	</div>

	<div>
        <label for="title" class="form-label h3">Photos</label>
        <app-upload-images [blogpostId]="id" [previews]="model.paths" [singleImage]=false></app-upload-images>
	</div>

    <div class="d-flex align-items-end">
        <div class="text-muted">{{model?.createdBy}} - {{model?.createdAtDate}}</div>
        <div class="ms-auto">
            <button class="btn btn-danger" [routerLink]="['/blogpost', 'read', id]" [disabled]="!id">Visualiser</button>		
            <button class="btn btn-primary" [disabled]="!model || !dirty || !MyForm.valid" (click)="apply()">Sauver</button>
            <button class="btn btn-danger" routerLink="/blogpost/search">Fermer</button>		
        </div>
    </div>

</div>
</div>

</form>
`})
export class BlogpostEditComponent implements OnInit {

    constructor(
        private blogpostService: BlogpostService,
        private dialogService: DialogService,
        private activatedRoute: ActivatedRoute,
        private accountService: AuthService
    ) { }

    private modelCopy: Blogpost;
    model: Blogpost;
    id: string = null;

    ngOnInit() {
        this.parseRouteParameters();
        this.get();
    }

    private parseRouteParameters() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }

    private get() {
        if (this.id) {
            this.blogpostService
                .get(this.id)
                .subscribe((b: Blogpost) => {
                    this.modelCopy = b.clone();
                    this.model = b;
                    this.id = b.id;
                });
        } else {
            const blogpost = new Blogpost();
            //blogpost.id = (new Date()).toISOString().replace(/[^0-9]/g, '');
            blogpost.createdBy = this.accountService.user.name;
            var date = new Date();
            blogpost.createdAt = new Date().toUTCString(); // .toLocaleDateString('fr-FR');
            this.modelCopy = blogpost.clone();
            this.model = blogpost;
        }
    }

    apply(): void {
        const model = this.model.clone();
        this.blogpostService.upsert(model).subscribe({
            next: (b) => {
                //this.dialogService.success('Blog sauvegardé');
                this.modelCopy = b.clone();
                this.model = b;
                this.id = b.id;
            },
            error: (error: any) => {
                error = error.error || error;
                const message = error.ExceptionMessage || error.message || error.Message;
                this.dialogService.error(message, 'Erreur technique');
            },
            complete: () => console.info('complete') 
        })
        // this.blogpostService.upsert(model).subscribe(
        //     (m) => {
        //         //this.dialogService.success('Blog sauvegardé');
        //         this.model = m;
        //         this.id = m.id;
        //     },
        //     (error: any) => {
        //         error = error.error || error;
        //         const message = error.ExceptionMessage || error.message || error.Message;
        //         this.dialogService.error(message, 'Erreur technique');
        //     }
        // );
    }

    deleteBlogpost(node: Blogpost, $event: any): void {
        $event.stopPropagation();
        this.dialogService.confirm('Information', 'Suprimer le blog ?')
            .then(result => result && this.delete(node));
    }


    private delete(node: Blogpost): void {
        this.blogpostService.delete(node.id)
            .subscribe(
                (_: any) => {
                    this.dialogService.success('Blog suprimée');
                }
            );
    }

    get dirty(): boolean {
        const m: any = this.model;
        const c: any = this.modelCopy;
        return Object.keys(this.model).some(p => m[p] !== c[p]);
    }

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        minHeight: '500px',       
       // placeholder: 'Enter text here...',
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [
            ['bold']
        ],
        customClasses: [
            {
                name: "quote",
                class: "quote",
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: "titleText",
                class: "titleText",
                tag: "h1",
            },
        ]
    };
}
