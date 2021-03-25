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
        const letraContent = document.querySelector('#letra');   

    //elementos do Footer
        const nomeArtista = document.querySelector('#nomeArtista');
        const nomeMusica = document.querySelector('#nomeMusica');
        const fotoArtista = document.querySelector('#fotoArtista');
        

 init();

function init (){   
    btnShow.addEventListener('click',showSearchBar);    
    btnPlaylist.addEventListener('click',playList); 

    let letraContainer = document.querySelector('#letraContainer');
    
   letraContainer.addEventListener('touchstart',toutch,{passive: true});    
    letraContainer.addEventListener('touchend',toutch,{passive: true});    
    letraContainer.addEventListener('scroll',toutch,{passive: true});      
}

function toutch(e){    
const swipper = aux.swippe;
    function next(sentido){
        
        let idLetra = document.getElementById('letra').getAttribute('idLetra');        
        let lista = Object.keys(dao.getLocalJSON('lista'));
        let pos = lista.indexOf(idLetra);
      
         let doc = {
            pos:pos,
            prox:pos+1,
            max:lista.length
         }         

         pos = pos + sentido;
         doc.pos = pos;

         if(doc.pos < doc.max && doc.pos >= 0){                          
            getLetraLocal(lista[doc.pos]);          
         }
         
        //console.log(0 + "-> " + doc.pos + " -> "+ doc.max )
    }

    swipper.calc(e,next);
}

function playList (e){    
    let lista = dao.getLocalJSON('lista');

    
    let toggleDiv = document.querySelector(this.getAttribute('toggle'));
    playItem.innerHTML = ''

    let del = (id)=>{
        console.log(id)
        //tempo em milisegundos
        aux.remove(id,250);
        dao.delMus(id);
    }
  
    if(lista){
        Object.entries(lista).forEach(([key, item]) => {       
         
            let custom = {
                tipo:'div',          
                nomeClasse:'info',                
                id:item.id,                
                handle:[()=>{getLetraLocal(item.id)},()=>{del(item.id)}],               
                arr:[item.nomeMus,item.nomeArt],
                classes:['subMus','subArt']                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            }

            
            playItem.append(aux.arrayToList(custom));

        });
    }

    toggleDiv.classList.toggle('active');
    dismissModal(containerPesquisa);
  
 }

function dismissModal(container){
    container.classList.remove('active');
}

function excludeDiv(){
    
}

function showSearchBar(){    
    //this.classList.toggle('active');
    containerPesquisa.classList.toggle('active'); 
    dismissModal(containerPlaylist); 
} 

function setFavorite(){
    dao.saveMus();  
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
            let lista = updateInfo(apiVagalume.modelMusica(data));
            dao.saveTemp(lista);
    });    
}


function getArt() {
    let art = apiVagalume.getArt(this.value);    
        art.then((response) => response.json())
            .then((data) => {                              
            autoComp(data.response.docs);    
        });    
}

function autoComp(art){
    listaDados.innerHTML ='';    
    art.forEach(dado => {   
        const div = aux.cria('div');      
        div.addEventListener('click',selectArt); 
        div.append(dado.band);    
        listaDados.append(div);
    }); 
}

//reuso
//on navigate - update
function updateInfo(lista){ 
    lista.foto = fotoArtista.id;    
    fotoArtista.src = lista.foto;
     attFooter(lista);
    //setTimeout(()=>{dismissModal(containerPesquisa)},400);    
    return lista;
}

function getLetraLocal(id){     
    
     attFooter(dao.getLocalMusicById(id));
}

function attFooter(lista){
    fotoArtista.src = lista.foto; 
   
    letraContent.innerHTML='';
    letraContent.innerHTML = lista.letraMus;
   
    letraContent.setAttribute('idLetra',lista.id);
        nomeMusica.innerText = lista.nomeMus;
       nomeArtista.innerText = lista.nomeArt ;
              inputMus.value = lista.nomeMus;
              listaDados.innerHTML = '';
}

 function selectArt(){     
   // nomeArtista.innerText = this.innerHTML ;
    let artEscolhido = this.value ? this.value : inputArt.value = this.innerHTML;    
    apiVagalume.getArtInfo(artEscolhido); 
    fotoArtista.id = apiVagalume.getFoto(this.innerHTML);
    inputMus.disabled = false;
    this.parentNode.innerHTML = '';
}