import ApiVagalume from './classApiVagalume.js';
import Aux from './classAux.js';

const apiVagalume = new ApiVagalume();
//const builder =  new Builder();
const aux = new Aux();

//builder.loadFrag('menu','header');
//builder.inicio(menu);

init();

let x = 0;
let y = 0;
let xfinal = 0;
let yfinal = 0;
let mov = false;

function init (){
    let show = document.querySelector('#showPesq');
    show.addEventListener('click',showBar); 
    let letra = document.querySelector('#letra');    
    
    
    letra.addEventListener('touchstart',swippe,true);    
    letra.addEventListener('touchend',swippe,true);    
    letra.addEventListener('scroll',swippe,true);    
}

function swippe(e){
    mov = !mov;
    let scrollY;
        if(e.type == 'touchstart'){                    
            xfinal=0;            
            y = e.changedTouches[0].clientY;
            x = e.changedTouches[0].clientX;
        }
        else if(e.type == 'touchend'){
            yfinal = e.changedTouches[0].clientY;
            xfinal = e.changedTouches[0].clientX;
            
            scrollY = yfinal != y;

            //if(!scrollY){
                console.log(x > xfinal ? 'vai':'volta')             
            //}
        }
}

function showBar(){
    
    let div = document.querySelector('.container');
    div.classList.toggle('active');
    document.querySelector('footer')
}   
   
let inputArt = document.getElementById('buscaArtista');   
    inputArt.addEventListener('input',getArt);
    //inputArt.addEventListener('change',listMusics);
    
let inputMus = document.getElementById('buscaMusica');  
    inputMus.addEventListener('input',getMus);
   //inputMus.addEventListener('change',getMus);

function listMusics(){    
    document.querySelector('#nomeArtista').innerText = this.innerHTML ;
    let musicaEscolhida = this.value ? this.value : inputArt.value = this.innerHTML;
    apiVagalume.getArtInfo(musicaEscolhida); 
    document.querySelector('#buscaMusica').disabled = false;
    this.parentNode.innerHTML = '';
}

function getMus() {
    //this.value valor do campo
    const x = apiVagalume.getMusLocal(this.value);

    let lista = aux.cria('div');
    lista.id = 'buscaMusica-List';

    //cabe reduzir
    x.forEach(dado => {
        if(dado.desc.includes(this.value) || dado.band == this.value){ 
            const div = aux.cria('div');  
            div.className = 'muslist'; 
            div.id = dado.id;
            div.append(dado.desc);    
            lista.append(div);
        }   
    });

    aux.insertHtml('#listaDados',lista);
    refreshInputMus();    
}

function refreshInputMus(){  
    document.querySelectorAll('.muslist').forEach(element => {
        element.addEventListener('click',()=>{
            getLetra(element.id);
            element.parentNode.innerHTML = '';
        })
    });
}

function getArt() {
       //recupera lista
    const art = apiVagalume.getArt(this.value);
    let lista = aux.cria('div');
    lista.id = 'buscaArtista-List';

    art.forEach(dado => {                        
        if(dado.band.includes(this.value) || dado.band == this.value){
            const div = document.createElement('div');  
            div.className = `${this.placeholder}`; 
            div.append(dado.band);    
            lista.append(div);
        }
    }); 
    
    lista = aux.insertHtml('#listaDados',lista);

    document.querySelectorAll(`.${this.placeholder}`).forEach(element => {
        element.addEventListener('click',listMusics);
    });
}

function getLetra(busca) {
       let letra = apiVagalume.getMusicById(busca);    
          letra.then((response) => response.json())
               .then((data) => {
                document.querySelector('#letra').innerHTML = data.mus[0].text;
                aux.addClass('#letra','active');                    
                document.querySelector('#nomeMusica').innerText = data.mus[0].name ;
                document.querySelector('#nomeArtista').innerText = data.art.name ;
                showBar();

    });    
}