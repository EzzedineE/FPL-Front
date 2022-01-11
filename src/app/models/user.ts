export class User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  type: string;
  role: string;

  constructor(
    _id: string = '',
    nom: string = '',
    prenom: string = '',
    email: string = '',
    password: string = '',
    type: string = '',
    role: string = 'user'
  ) {
    (this._id = _id),
      (this.nom = nom),
      (this.prenom = prenom),
      (this.email = email),
      (this.password = password),
      (this.role = role);
    this.type = type;
  }
}
