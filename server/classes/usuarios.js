class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(laPersona => {
            return laPersona.id === id;
        })[0]; // Filter siempre devuelbe un array por eso cogemos la primera posición

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSalas(sala) {
        let personasEnSala = this.personas.filter(laPersona => {
            return laPersona.sala === sala;
        });
        return personasEnSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(laPersona => laPersona.id != id);

        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}