const validate = (form) => {//
    const error = {};

    if (!/^[a-zA-Z\s]+$/.test(form.name)) {
        error.name = "El nombre solo debe incluir letras y espacios";
    }
    if (!/\.(jpeg|jpg|gif|png|svg)$/i.test(form.image)) {
        error.image = "URL de la image(jpeg, jpg, gif, png, svg)";
    }
    if (!/^(?!300$)([1-2]?[0-9]{1,2}|300)$/.test(form.hp)) {
        error.hp = "El hp del pokemon debe ser de numeros y menor a 300";
    }
    if (!/^(?!500$)([1-4]?[0-9]{1,2}|500)$/.test(form.attack)) {
        error.attack = "El attack del pokemon debe ser de numeros y menor a 500"
    }
    if (!/^(?!400$)([1-3]?[0-9]{1,2}|400)$/.test(form.defense)) {
        error.defense = "La defensa del pokemon debe ser de numeros y menor a 400"
    }
    if (!/^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/.test(form.height)) {
        error.height = "La altura del pokemon debe ser de numeros y menor a 200"
    }
    if (!form.types.length > 1 || form.types.length > 3) {
        error.types = "Elige entre 1 y 3 tipos de pokemones"
    }
    return error;
};
  
export default validate