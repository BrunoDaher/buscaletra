import ApiVagalume from './classApiVagalume.js';
import Builder from './classBuilder.js';
import Menu from './classMenu.js';

const apiVagalume = new ApiVagalume();
const builder =  new Builder();
const menu = new Menu(builder,apiVagalume);

builder.loadFrag('menu','header');
builder.inicio(menu);

let inputArt = document.getElementById('buscaArtista');   
    inputArt.addEventListener('input',getArt);
    //inputArt.addEventListener('change',listMusics);
    
let inputMus = document.getElementById('buscaMusica');  
    inputMus.addEventListener('input',getMus);
 // inputMus.addEventListener('change',()=>{list});

function listMusics(){
    //inputArt.value = element.target.innerHTML    
    document.querySelector('#nomeArtista').innerText = this.innerHTML ;
    let musicaEscolhida = this.value ? this.value : inputArt.value = this.innerHTML;
    apiVagalume.getArtInfo(musicaEscolhida); 
    document.querySelector('#buscaMusica').disabled = false;
    this.parentNode.innerHTML = '';
}

function getMus() {
    //this.value valor do campo
    const x = apiVagalume.getMusLocal(this.value);

    let lista = menu.cria('div');
    lista.id = 'buscaMusica-List';

    //cabe reduzir
    x.forEach(dado => {
        if(dado.desc.includes(this.value) || dado.band == this.value){ 
            const div = menu.cria('div');  
            div.className = 'muslist'; 
            div.id = dado.id;
            div.append(dado.desc);    
            lista.append(div);
        }   
    });

    menu.insertHtml('#listaDados',lista);
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
    let lista = menu.cria('div');
    lista.id = 'buscaArtista-List';

    art.forEach(dado => {                        
        if(dado.band.includes(this.value) || dado.band == this.value){
            const div = document.createElement('div');  
            div.className = `${this.placeholder}`; 
            div.append(dado.band);    
            lista.append(div);
        }
    }); 
    
    lista = menu.insertHtml('#listaDados',lista);

    document.querySelectorAll(`.${this.placeholder}`).forEach(element => {
        element.addEventListener('click',listMusics);
    });
}

function getLetra(busca) {
       let letra = apiVagalume.getMusicById(busca);    
          letra.then((response) => response.json())
               .then((data) => {
                document.querySelector('#letra').innerHTML = data.mus[0].text;
                menu.addClass('#letra','active');                    
                document.querySelector('#nomeMusica').innerText = data.mus[0].name ;
                document.querySelector('#nomeArtista').innerText = data.art.name ;

    });    
}