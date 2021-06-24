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
        
        const inputFonte = document.getElementById('fonte');
            inputFonte.addEventListener('change',setConfig);    
    
            const inputAlign = document.querySelectorAll('.align');
            setAlign();
            
        const listaDados = document.querySelector('#listaDados');
              listaDados.addEventListener('click',(e)=>{
                  if(e.target.id == listaDados.id){
                     btnShow.click();
                  }
                });

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


function setAlign(){   
   
    inputAlign.forEach(input => {
       input.addEventListener('click',setup);       
   });

    function setup(){       
        //desmarca todos do grupo
        aux.dismissClassGroup(inputAlign,'active');
        //marca a desejada    
        this.classList.toggle('active');
        document.querySelector('.letras').style.textAlign = this.id;   
    }

    document.querySelector('#left').click();
      //inputAlign.addEventListener('click',setAlign);  
}

function setConfig(){    
    document.querySelector('.letras').style.fontSize = inputFonte.value + 'vh';    
    //document.getElementById('fonte').value = inputFonte.value
    ////let fontSize = inputFonte.getValue();
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
        //console.log(id)
        //tempo em milisegundos
        aux.remove(id,100);
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

function showSearchBar(){    
    //this.classList.toggle('active');
    containerPesquisa.classList.toggle('active'); 
    dismissModal(containerPlaylist); 
} 

function setFavorite(){
    dao.saveMus();  
    dismissModal(containerPesquisa);
}
   
function getMus() {
    listaDados.innerHTML='' 
    //console.log(aux.normalizeInput(this.value))
    
    let localMusic = apiVagalume.getMusLocal(this.value);    
    localMusic.forEach(dado => {        
            let div = aux.cria('div');
            div.onclick = getLetra; 
            div.id = dado.id;
            div.append(dado.desc);    
           listaDados.append(div);        
    });

    function getLetra(){
        getLetraById(this.id);
        setTimeout(dismissModal(containerPesquisa),300);
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
        div.id = dado.band;    
        div.onclick =  selectArt; 
        div.append(dado.band);    
        listaDados.append(div);
    }); 
}

//reuso
//on navigate - update
function updateInfo(lista){ 
    lista.foto = fotoArtista.id;    
    fotoArtista.src = lista.foto;
     attLetra(lista);
    //setTimeout(()=>{dismissModal(containerPesquisa)},400);    
    return lista;
}

function getLetraLocal(id){             
     attLetra(dao.getLocalMusicById(id));    
     setTimeout(dismissModal(containerPlaylist),1300); 
}

function configs(){

}

function attLetra(lista){
    fotoArtista.src = lista.foto; 
    //lista.foto = lista.foto.replace('http://','https://');
   
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

    let artEscolhido = this.value ? this.value : aux.normalizeInput(this.id);
    inputArt.value = this.id;    
    console.log(aux.normalizeInput(this.id));
    apiVagalume.getArtInfo(artEscolhido); 
    fotoArtista.id = apiVagalume.getFoto(aux.normalizeInput(this.id));
    inputMus.disabled = false;
    this.parentNode.innerHTML = '';
}