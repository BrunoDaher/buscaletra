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

    if(lista){
        Object.entries(lista).forEach(([key, item]) => {        
            let custom = {
                tipo:'div',          
                nomeClasse:'info',
                id:item.chave,
                handle:getLetraLocal,
                arr:[item.nomeMus,item.nomeArt],
                classe:['subMus','subArt']                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            }
        playItem.append(aux.arrayToList(custom));
        });
    }
    toggleDiv.classList.toggle('active');
    dismissModal(containerPesquisa);
  
 }

function dismissModal(container){
    container.classList.remove('active')
}

function showSearchBar(){    
    //this.classList.toggle('active');
    containerPesquisa.classList.toggle('active'); 
    dismissModal(containerPlaylist); 
} 

function setFavorite(){
    dao.saveMus();  
}
   
function getLetraLocal(){
    let storage = dao.getLocalMusicById();   

    console.log(Object.keys(storage)[0]);
     
    let lista = storage[this.id];
       
    //atualiza footer
    fotoArtista.src = lista.foto; 
    letraContainer.innerHTML = lista.letraMus;
        nomeMusica.innerText = lista.nomeMus;
       nomeArtista.innerText = lista.nomeArt ;
              inputMus.value = lista.nomeMus;
              listaDados.innerHTML = '';
}

function getMus() {
    listaDados.innerHTML='' 
    let localMusic = apiVagalume.getMusLocal(this.value);    
    localMusic.forEach(dado => {        
            let div = aux.cria('div');
            div.addEventListener('click',test); 
            div.id = dado.id;
            div.append(dado.desc);    
           listaDados.append(div);        
    });

    function test(){
        getLetraById(this.id);
    }
}

function getLetraById(busca) {  
       let letra = apiVagalume.getMusicById(busca);    
          letra.then((response) => response.json())
               .then((data) => {                           
                aux.addClass('#letra','active');                             
                //updateInfo(apiVagalume.modelMusica(data));
                dao.saveTemp(updateInfo(apiVagalume.modelMusica(data)));
    });    
}

function getArt() {
    let art = apiVagalume.getArt(this.value);    
       art.then((response) => response.json())
            .then((data) => {      
                console.log(data)          
             autoComp(data.response.docs);  
            // apiVagalume.getFoto(this.value);
 });    
}

function autoComp(art){
    listaDados.innerHTML =''
    art.forEach(dado => {   
        const div = aux.cria('div');      
        div.addEventListener('click',selectArt); 
        div.append(dado.band);    
        listaDados.append(div);
    }); 
}


function uptadeLetra(){
 
}

//reuso
//on navigate - update
function updateInfo(lista){
    
    //dismissModal(containerPesquisa);    
    
    //quando está gravando
    lista.foto = fotoArtista.id;    
    fotoArtista.src = lista.foto;       
     
    //atualiza footer
    letraContainer.innerHTML = lista.letraMus;
        nomeMusica.innerText = lista.nomeMus;
       nomeArtista.innerText = lista.nomeArt ;
              inputMus.value = lista.nomeMus;
              listaDados.innerHTML = '';
    
    return lista;

    
}

 function selectArt(){     
   // nomeArtista.innerText = this.innerHTML ;
    let artEscolhido = this.value ? this.value : inputArt.value = this.innerHTML;    
    apiVagalume.getArtInfo(artEscolhido); 
    fotoArtista.id = apiVagalume.getFoto(this.innerHTML);
    inputMus.disabled = false;
    this.parentNode.innerHTML = '';
}