import { SubscriptionService } from './../shared/services/subscription/subscription.service';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { PersonalComponent } from './personal/personal.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { RecipeCardComponent } from './shared/components/recipe-card/recipe-card.component';
import { CommentsSectionComponent } from './shared/components/comments-section/comments-section.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../shared/services/recipe/recipe.service';
import { CategoryService } from '../shared/services/category/category.service';
import { VotePipe } from "../pipes/vote.pipe";
import { SubscriptionPipe } from "../pipes/subscription.pipe";
import { VoteService } from '../shared/services/vote/vote.service';
import { CommentService } from '../shared/services/comment/comment.service';
import { ProfileService } from '../shared/services/profile/profile.service';

@NgModule({
    declarations: [
        DashboardComponent,
        HomeComponent,
        MainDashboardComponent,
        PersonalComponent,
        FavouriteComponent,
        RecipeComponent,
        ProfileComponent,
        SearchBarComponent,
        RecipeCardComponent,
        CommentsSectionComponent,
    ],
    providers: [
        RecipeService,
        CategoryService,
        SubscriptionService,
        VoteService,
        CommentService,
        ProfileService
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxEditorModule.forRoot({
            locals: {
                // menu
                bold: 'Bold',
                italic: 'Italic',
                code: 'Code',
                blockquote: 'Blockquote',
                underline: 'Underline',
                strike: 'Strike',
                bullet_list: 'Bullet List',
                ordered_list: 'Ordered List',
                heading: 'Heading',
                h1: 'Header 1',
                h2: 'Header 2',
                h3: 'Header 3',
                h4: 'Header 4',
                h5: 'Header 5',
                h6: 'Header 6',
                align_left: 'Left Align',
                align_center: 'Center Align',
                align_right: 'Right Align',
                align_justify: 'Justify',
                text_color: 'Text Color',
                background_color: 'Background Color',
                // popups, forms, others...
                url: 'URL',
                text: 'Text',
                openInNewTab: 'Open in new tab',
                insert: 'Insert',
                altText: 'Alt Text',
                title: 'Title',
                remove: 'Remove',
            },
        }),
        FormsModule,
        VotePipe,
        SubscriptionPipe
    ]
})
export class DashboardModule {}
