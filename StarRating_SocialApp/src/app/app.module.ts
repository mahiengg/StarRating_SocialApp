import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { ShellComponent } from "./shell/shell.component";
import { HomeComponent } from "./home/home.component";

import { AppRoutingModule } from "./app-routing.module";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [AppComponent, ShellComponent, HomeComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
