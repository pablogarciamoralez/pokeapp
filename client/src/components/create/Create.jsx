import React from "react";
import { useState, useEffect } from "react";
import { postPokemon, getTypes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import '../create/create.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'

export default function PokemonCreate() {
  const dispatch = useDispatch();
  
  let stateTypes = useSelector((state) => state.arrayTypes);
  const [errors, setErrors] = useState({});
  const allPokemons = useSelector(state => state.allPokemons)

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  const regExp = {
    name: /^[a-zA-Z]{3,16}$/, // solo letras de  a 16 caracteres.
    image: /(http(s?):)([a-z\-_0-9\/\:\.])*\.(jpg|jpeg|png|gif)/i,
    hp: /^0*([1-9][0-9]{0,2})$/, //numeros del 1 al 9, de 1 a 3 cifras.
    attack: /^0*([1-9][0-9]{0,3})$/, 
    defense: /^0*([1-9][0-9]{0,2})$/, 
    speed: /^0*([1-9][0-9]{0,2})$/,
    height: /^0*([1-9][0-9]{0,2})$/,
    weight: /^0*([1-9][0-9]{0,2})$/,
  }

  const validate = (input) => {
    const errors = {};
    if (!regExp.name.test(input.name)) errors.name = 'El nombre debe contener entre 3 y 16 caracteres';
    if (allPokemons.find(e => e.name.toLowerCase()===input.name.toLowerCase())) errors.name = 'Ya existe ese pokemon'
    if (!regExp.image.test(input.image)) errors.image = 'Link no valido';
    if (input.hp > 250 || !regExp.hp.test(input.hp)) errors.hp = 'Hp solo puede ser un numero entero de entre 1 y 3 digitos. Valor mayor 250';
    if (input.attack > 1000 || !regExp.attack.test(input.attack)) errors.attack = 'Ataque solo puede ser un numero entero de entre 1 y 4 digitos. Valor mayor 100';
    if (input.defense > 250 || !regExp.defense.test(input.defense)) errors.defense = 'Defense solo puede ser un numero entero de entre 1 y 3 digitos. Valor mayor 250';
    if (input.speed > 250 || !regExp.speed.test(input.speed)) errors.speed = 'Speed solo puede ser un numero entero de entre 1 y 3 digitos. Valor mayor 1000';
    if (input.height > 250 || !regExp.height.test(input.height)) errors.height = 'Height solo puede ser un numero entero de entre 1 y 3 digitos. Valor mayor 250';
    if (input.weight > 250 || !regExp.weight.test(input.weight)) errors.weight = 'Weight solo puede ser un numero entero de entre 1 y 3 digitos. Valor mayor 250';
    if (!input.types.length) errors.types = 'El pokemon debe ser de al menos UN tipo'
    
    if (JSON.stringify(errors) === '{}') return {none: true}
    return errors;
  };

  function handleChange(e) {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const handleSelect = (e) => {
    const{value} = e.target
    if (input.types.includes(value))
      return alert('Ya seleccionaste ese tipo')
    setErrors(
      validate({    
        ...input,          
        types: [...input.types, e.target.value]
    }));

    input.types.length < 2 &&
    e.target.value !== 'none' && 
    !input.types.includes(e.target.value) &&
    setInput({
      ...input,
      types: [...input.types, e.target.value]
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postPokemon(input));
      
    alert('Pokemon creado con éxito')
    setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        types: [],
      });
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const onInputKeyUp = e => {
    console.log(e.target.value)
    if(e.target.value.length <= 1 && e.keyCode === 32 ) {
      return setInput({...input, [e.target.name]: ''})
    }
  }

  return (
    <div className="backgroundCreate">
      <header>
        <div className="headerContainerCreate">
          <h2 className="titleCreate">CREA TU POKEMON </h2>
          {<a href="/home" className="homeCreate">HOME</a>}
        </div>
      </header>

      <div>
        <div className='formCreate'>
        <h3 className="h3Create">NOMBRE</h3>
          <div className="fieldContainer">
            
            <input
              type="text"
              className="inputsCreate"
              value={input.name}
              name="name"
              onKeyUp={(e) => onInputKeyUp(e)}
              onChange={(e) => handleChange(e)}>
             </input>
            <p className="errors">{errors.name}</p>
          </div>
          
          <h3 className="h3Create">IMAGEN</h3>
          
          <input type="text" 
            placeholder="URL IMAGEN"
            name="image"
            onChange={(e) => handleChange(e)}
            value={input.image}
            onKeyUp={(e) => onInputKeyUp(e)}
            className="inputsCreate"
            />
            <p className="errors">{errors.image}</p>
          
          

          <h3 className="h3Create">STATS</h3>
          <div>
            
            
            <input
              placeholder="HIT POINS"
              className="inputsCreate"
              type="number"
              onKeyUp={(e) => onInputKeyUp(e)}
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}>
            </input>
            <p className="errors">{errors.hp}</p>
            
            

            <input
              placeholder="ATTACK"
              className="inputsCreate"
              type="number"
              onKeyUp={(e) => onInputKeyUp(e)}
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
              >
            </input>
            <p className="errors">{errors.attack}</p>
            

            <input
              placeholder="DEFENSE"
              className="inputsCreate"
              type="number"
              onKeyUp={(e) => onInputKeyUp(e)}
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
              >
            </input>
            <p className="errors">{errors.defense}</p>
            

            <input
              placeholder="SPEED"
              className="inputsCreate"
              type="number"
              onKeyUp={(e) => onInputKeyUp(e)}
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
              >
              </input>
            <p className="errors">{errors.speed}</p>
            

            
            <input
              placeholder="HEIGHT"
              className="inputsCreate"
              type="number"
              onKeyUp={(e) => onInputKeyUp(e)}
              step="any"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
              >
              </input>
            <p className="errors">{errors.height}</p>

            
            <input
              placeholder="WEIGHT"
              className="inputsCreate"
              type="number"
              onKeyUp={(e) => onInputKeyUp(e)}
              step="any"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
              >
              </input>
            <p className="errors">{errors.weight}</p>
          </div>
          
          <h3 className="h3Create">TYPES</h3>
          <div>
            
            <select name='select' className="inputsCreate" onChange={(e) => handleSelect(e)}>
              <option value="none" defaultValue title="">
                Select Type(s)
              </option>
              {stateTypes?.map((t) => (
                <option value={t.name} key={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="selectedTypesContainer">
          {input.types?.map((e, t) => (
            <div  key={e.id}>
              {/* <p key={e.id}>{e}</p> */}
              <div >
              <button className="stylesSelected" key={e.id} onClick={ () => {
                setErrors(validate({ ...input, types: input.types.filter(type => type !== e) }));
                setInput({ ...input, types: input.types.filter(type => type !== e) })
              }}
                > <p className="close">X</p>{e}</button>
              <p>{errors.types}</p>
              </div>
              
            </div>
          ))}
          </div>
          
          <form onSubmit={handleSubmit}>
            <button  type="submit" disabled={!errors.none} className="createButton">CREAR</button>
          </form>
        </div>

        <footer className="footerCreate">
        <p className="about">Desarrollado por Pablo García a partir de <a href="https://pokeapi.co/">POKEAPI</a> </p>
                                
                                <div className="social">
                                <a href="https://github.com/pablogarciamoralez"><FontAwesomeIcon icon={faGithub} /></a>
                                <a href="https://github.com/pablogarciamoralez"><FontAwesomeIcon icon={faLinkedin} /></a>
                                </div>
        </footer>
      </div>
    </div>
  );
}



