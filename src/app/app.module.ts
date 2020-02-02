import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { COMPONENTS, MODULES } from './app.imports';

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
