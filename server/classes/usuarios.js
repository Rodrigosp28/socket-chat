

class Usuario{

  constructor(){
    this.personas =[];
  }

  agregarPersona(id,nombre,sala){
    let persona = {
      id:id,
      nombre:nombre,
      sala: sala
    }

    //console.log(persona);

    this.personas.push(persona);

    return this.personas;

  }

  getPersona(id){
    let persona = this.personas.filter(persona=>{
      return persona.id === id
    })[0];

    return persona;

  }

  getPersonas(){
    return this.personas
  }

  getPersonaPorSala(sala){
    let personaSala = this.personas.filter(persona => {
      return persona.sala === sala;
    });

    return personaSala;
  }

  borrarPersona(id) {
    let personaBorrada = this.getPersona(id);
    this.personas = this.personas.filter(persona => {
      return persona.id != id
    });

    return personaBorrada;
  }



}

module.exports ={
  Usuario
}