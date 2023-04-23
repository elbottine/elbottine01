import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamComponent } from './team';
import { BlogpostModule } from "../blogpost/module";

const routes: Routes = [
    {
        path: 'team',
        component: TeamComponent
    }
];

@NgModule({
    declarations: [
        TeamComponent
    ],
    entryComponents: [
        TeamComponent
    ],
    exports: [
        RouterModule
    ],
    imports: [
        NgbModule,
        RouterModule,
        RouterModule.forChild(routes),
        BlogpostModule
    ]
})
export class TeamModule {}
