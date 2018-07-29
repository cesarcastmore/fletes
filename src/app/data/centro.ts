export class Centro {

  nombre: string;
  calle: string;
  numero: string;
  colonia: string;
  codigo_postal: string;
  municipio: string;
  empresa_id: string;
  estado: string;
  id: string;
  personal_id: string;

  location: any;

  pais: string;

  constructor() {

  }



  public createCentro(address_components: any[]) {
    this.calle = null;
    this.numero = null;
    this.colonia = null;
    this.codigo_postal = null;
    this.municipio = null;
    this.estado = null;
    this.municipio = null;
    this.pais = null;
    this.personal_id= null;

    console.log(address_components);

    for (let comp of address_components) {

      if (comp.types) {
        console.log("entrooooo");
        if (comp.types[0] == "street_number") {
          this.numero = comp.long_name;
        } else if (comp.types[0] == "route") {
          this.calle = comp.long_name;
        } else if (comp.types[0] == "political") {
          this.colonia = comp.long_name;
        } else if (comp.types[0] == "locality") {
          this.municipio = comp.long_name;
        } else if (comp.types[0] == "administrative_area_level_1") {
          this.estado = comp.long_name;
        } else if (comp.types[0] == "country") {
          this.pais = comp.long_name;
        } else if (comp.types[0] == "postal_code") {
          this.codigo_postal = comp.long_name;
        }
      }

    }
  }


}
