import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { RecorridoComponent } from './carrousel/recorrido/recorrido.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    CarrouselComponent,
    RecorridoComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'caminos', component: CarrouselComponent},
      { path: 'recorrido/:id', component: RecorridoComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
