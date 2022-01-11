export class Categorie {
  _id: string;
  nomcategorie: string;
  livres: [];

  constructor(_id: string = '', nomcategorie: string = '', livres: [] = []) {
    (this._id = _id),
      (this.nomcategorie = nomcategorie),
      (this.livres = livres);
  }
}
