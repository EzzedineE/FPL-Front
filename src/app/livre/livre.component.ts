import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CategorieService } from '../services/categorie.service';
import { livreService } from '../services/livre.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css'],
})
export class LivreComponent implements OnInit {
  User = this.serviceUser.getuser();
  sourcePath =
    'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf';
  fileName = 'sample.pdf';
  livre: any;
  contenue: any;
  uploadData = new FormData();
  id: string;
  selectedFile: File;
  imgURL: any;
  users: any;
  categorie: any;
  formlivre = new FormGroup({
    titre: new FormControl(''),
    auteur: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(
    private services: livreService,
    private Service: CategorieService,
    private route: ActivatedRoute,
    private serviceUser: AuthService
  ) {}

  ngOnInit(): void {
    this.getLivres();
    this.getStatitics();
  }

  getStatitics() {
    this.serviceUser.statistics().subscribe((res) => {
      this.users = res;
    });
  }

  downloadfile(livre: any) {
    if (this.User.type == 'abonne') {
      this.serviceUser.dowloadFile(this.User._id).subscribe((res: any) => {
        console.log(res.length);
        if (res.length <= 5) {
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute(
            'href',
            ' http://localhost:3000/static/' + livre.contenue
          );
          link.setAttribute('download', livre.contenue);
          document.body.appendChild(link);
          link.click();
          link.remove();

          this.services
            .saveDownload({
              livreid: livre._id,
              userid: this.User._id,
            })
            .subscribe((res) => {
              console.log(res);
            });
        } else {
          alert('vous avez deja telecharger 5 livre');
        }
      });
    }
  }

  getLivres() {
    let catego = this.route.snapshot.params['id'];
    this.Service.getOneCategorie(catego).subscribe(
      (res: any) => {
        this.categorie = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  add() {
    let catego = this.route.snapshot.params['id'];
    const newlivre = this.formlivre.value;
    let formData = new FormData();
    formData.append('contenue', this.selectedFile);
    formData.append('titre', newlivre.titre);
    formData.append('description', newlivre.description);
    formData.append('auteur', newlivre.auteur);
    this.services.addlivre(catego, formData).subscribe(
      (res) => {
        this.getLivres();
        this.formlivre = new FormGroup({
          titre: new FormControl(''),
          auteur: new FormControl(''),
          description: new FormControl(''),
        });
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
}
