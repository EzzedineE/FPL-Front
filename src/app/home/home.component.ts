import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CategorieService } from '../services/categorie.service';
import { livreService } from '../services/livre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formCategorie = new FormGroup({
    nomcategorie: new FormControl(''),
  });
  user = this.serviceUser.getuser();
  categorie: any;
  constructor(
    private Service: CategorieService,
    private serviceUser: AuthService
  ) {}

  ngOnInit(): void {
    this.Service.getCategorie().subscribe(
      (res: any) => {
        this.categorie = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addCategorie() {
    let mybody = this.formCategorie.value;
    this.Service.addCategorie(mybody).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
