import ApiVagalume from './classApiVagalume.js';
import Aux from './classAux.js';
import Dao from './classDao.js';

const dao = new Dao();
const apiVagalume = new ApiVagalume(dao);
//const builder =  new Builder();
const aux = new Aux();

//builder.loadFrag('menu','header');
//builder.inicio(menu)


let nomeArtista = document.querySelector('#nomeArtista');
let nomeMusica = document.querySelector('#nomeMusica');
let fotoArtista = document.querySelector('#fotoArtista');

let inputArt = document.getElementById('buscaArtista');   
    inputArt.addEventListener('input',getArt);
    inputArt.addEventListener('click',aux.selfClean );
    //inputArt.addEventListener('change',listMusics);
    
let inputMus = document.getElementById('buscaMusica');  
    inputMus.addEventListener('input',getMus);
   inputMus.addEventListener('click',aux.selfClean);
   let letraContainer = document.querySelector('#letra');   
   
init();


function init (){
    let show = document.querySelector('#showPesq');
    show.addEventListener('click',showBar); 
    let swipper = aux.swippe;
    letraContainer.addEventListener('touchstart',swipper.calc);    
    letraContainer.addEventListener('touchend',swipper.calc);    
    letraContainer.addEventListener('scroll',swipper.calc);    
}

function showBar(){    
    let div = document.querySelector('.container');
    div.classList.toggle('active');  
}   
   
function getMus() {

    //fetch lista vagalume
    const localMusic = apiVagalume.getMusLocal(this.value);

    //cria elemento
    let lista = aux.cria('div');
    lista.id = this.getAttribute('_listTarget');

    //itera lista
    localMusic.forEach(dado => {
        //valida
        //if(dado.desc.includes(this.value) || dado.band == this.value){ 
            const div = aux.cria('div');  
            div.className = 'muslist'; 
            div.id = dado.id;
            div.append(dado.desc);    
            lista.append(div);
        //}   
    });

     //preenche html datalist
    aux.insertHtml('#listaDados',lista);7


    
    //para cada elemento
    document.querySelectorAll('.muslist').forEach(element => {
        
        
        //add evento de click
        element.addEventListener('click',()=>{
            getLetra(element.id,this);            
            element.parentNode.innerHTML = '';
        })
    });
}


function getLetra(busca,input) {
       let letra = apiVagalume.getMusicById(busca);    
          letra.then((response) => response.json())
               .then((data) => {
                letraContainer.innerHTML = data.mus[0].text;
                aux.addClass('#letra','active');                    
                nomeMusica.innerText = data.mus[0].name ;
                nomeArtista.innerText = data.art.name ;
                input.value = data.mus[0].name
                showBar();
                fotoArtista.src = apiVagalume.getCurrentFoto(fotoArtista.src);
               // nomeArtista.innerText = data.mus[0].name;
                  
    });    
}

function getArt() {
    let art = apiVagalume.getArt(this.value);    
       art.then((response) => response.json())
            .then((data) => {
             autoComp(data.response.docs,this);
 });    
}

function autoComp(art, input){
    let lista = aux.cria('div');
    lista.id = input.getAttribute('_listaTarget');
    
    art.forEach(dado => {    
        let val = apiVagalume.normalizeInput(input.value);       
        //if(dado.band.includes(val) || dado.band == this.value){
            const div = aux.cria('div');  
            div.className = `${input.placeholder}List`; 
            div.append(dado.band);    
            lista.append(div);
        //}
    }); 
  
    //preenche datalist
    lista = aux.insertHtml(lista.id,lista);
    
    //para cada elemento
    document.querySelectorAll(`.${input.placeholder}List`).forEach(element => {
        //add evento de click
        element.addEventListener('click',listMusics);      
    });
}
function updateRodape(){
    
}

 function listMusics(){     
   // nomeArtista.innerText = this.innerHTML ;
    let musicaEscolhida = this.value ? this.value : inputArt.value = this.innerHTML;
    apiVagalume.getArtInfo(musicaEscolhida); 
    inputMus.disabled = false;
    this.parentNode.innerHTML = '';
}