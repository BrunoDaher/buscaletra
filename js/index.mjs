import ApiVagalume from './classApiVagalume.js';
import Aux from './classAux.js';
import Dao from './classDao.js';

//libs
const dao = new Dao();
const apiVagalume = new ApiVagalume(dao);
const aux = new Aux();

//componentes
    //Header
        const favButton = document.querySelector('#favorite');
            favButton.addEventListener('click',setFavorite)
        const btnShow = document.querySelector('#showPesq');
    
    //pesquisa
    const containerPesquisa = document.querySelector('#pesquisa');

        const inputArt = document.getElementById('buscaArtista');   
            inputArt.addEventListener('input',getArt);
            inputArt.addEventListener('click',aux.selfClean );
                
        const inputMus = document.getElementById('buscaMusica');  
            inputMus.addEventListener('input',getMus);
            inputMus.addEventListener('click',aux.selfClean);
            
        const listaDados = document.querySelector('#listaDados');

    //playlist
    const containerPlaylist = document.querySelector('#playlist');

        const playItem = document.querySelector("#playlistItem");  
        const btnPlaylist = document.querySelector('#btnPlaylist');
       

    //letra
        const letraContainer = document.querySelector('#letra');   

    //elementos do Footer
        const nomeArtista = document.querySelector('#nomeArtista');
        const nomeMusica = document.querySelector('#nomeMusica');
        const fotoArtista = document.querySelector('#fotoArtista');

init();

function init (){
   
    btnShow.addEventListener('click',showSearchBar);    
    btnPlaylist.addEventListener('click',playList);
    let swipper = aux.swippe;
    
    letraContainer.addEventListener('touchstart',swipper.calc,{passive: true});    
    letraContainer.addEventListener('touchend',swipper.calc,{passive: true});    
    letraContainer.addEventListener('scroll',swipper.calc,{passive: true});      
}

function playList (){
    
    let lista = dao.getLocalJSON('lista');
    let toggleDiv = document.querySelector(this.getAttribute('toggle'));

    playItem.innerHTML = ''

    Object.entries(lista).forEach(([key, item]) => {
        //console.log(item)
        let custom = {
            tipo:'div',          
            nomeClasse:'info',
            id:item.chave,            
            arr:[item.nomeMus,item.nomeArt],
            classe:['subMus','subArt']                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        }
       playItem.append(aux.arrayToList(custom));
    });

    toggleDiv.classList.toggle('active');
    dismissModal(containerPesquisa);
 }

function dismissModal(container){
    container.classList.remove('active')
}

function showSearchBar(){
    containerPesquisa.classList.toggle('active'); 
    dismissModal(containerPlaylist); 
} 

function setFavorite(){
    dao.saveMus();  
}
   
function getMus() {
    listaDados.innerHTML=''
    let localMusic = apiVagalume.getMusLocal(this.value);
    //itera lista
    localMusic.forEach(dado => {
        //valida
        //if(dado.desc.includes(this.value) || dado.band == this.value){ 
            let div = aux.cria('div');
            div.addEventListener('click',test); 
            div.id = dado.id;
            div.append(dado.desc);    
           listaDados.append(div);
        //}   
    });

    function test(){
        getLetra(this.id);
    }
}

function getLetra(busca) {  
       let letra = apiVagalume.getMusicById(busca);    
          letra.then((response) => response.json())
               .then((data) => {                           
                aux.addClass('#letra','active');  
                updateInfo(apiVagalume.modelMusica(data));
                                 
    });    
}

function getArt() {
    let art = apiVagalume.getArt(this.value);    
       art.then((response) => response.json())
            .then((data) => {                
             autoComp(data.response.docs,this);
             console.log(apiVagalume.getFoto(this.value))
 });    
}

function autoComp(art, input){
    listaDados.innerHTML =''
    art.forEach(dado => {    
        //let val = apiVagalume.normalizeInput(input.value);       
        //if(dado.band.includes(val) || dado.band == this.value){
            const div = aux.cria('div');  
            //div.className = `${input.placeholder}List`; 
            div.addEventListener('click',listArt); 
            div.append(dado.band);    
            listaDados.append(div);
        //}
    }); 
}

//reuso
//on navigate - update
function updateInfo(lista){
    dismissModal(containerPesquisa);
    let foto = fotoArtista.id;
     
    //atualiza footer
     fotoArtista.src = foto;
    letraContainer.innerHTML = lista.letraMus;
        nomeMusica.innerText = lista.nomeMus;
       nomeArtista.innerText = lista.nomeArt ;
              inputMus.value = lista.nomeMus;
              listaDados.innerHTML = '';
    
    lista.foto = foto;

    dao.saveTemp(lista);
}

 function listArt(){     
   // nomeArtista.innerText = this.innerHTML ;
    let artEscolhido = this.value ? this.value : inputArt.value = this.innerHTML;    
    apiVagalume.getArtInfo(artEscolhido); 
    fotoArtista.id = apiVagalume.getFoto(this.innerHTML);
    inputMus.disabled = false;
    this.parentNode.innerHTML = '';
}