import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NouisliderModule } from 'ng2-nouislider';

// import { Ng2SliderComponent }  from 'ng2-slider-component/ng2-slider.component'
// import { SlideAbleDirective } from 'ng2-slideable-directive/slideable.directive';
// import { Ng2StyledDirective } from 'ng2-styled-directive/ng2-styled.directive';


@NgModule({
    declarations: [

        // SlideAbleDirective,
        // Ng2StyledDirective,
        // Ng2SliderComponent,
        // NouisliderModule,
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NouisliderModule,
        ReactiveFormsModule
    ],
    // exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
