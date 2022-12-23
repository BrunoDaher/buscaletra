import ApiVagalume from './classApiVagalume.js';
import Aux from './classAux.js';
import Dao from './classDao.js';
import Teclado from './classTeclado.js';

//libs
const dao = new Dao();
const apiVagalume = new ApiVagalume(dao);
const aux = new Aux();
const teclado = new Teclado();

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
            inputFonte.addEventListener('change',fontConfig);    
    
        const inputAlign = document.querySelectorAll('.align');
        const inputColuna = document.querySelectorAll('.coluna');        
        
        setAlign();
        
        const listaDados = document.querySelector('#listaDados');
              listaDados.addEventListener('click',(e)=>{
                  
                //limpar campo da musica
            
                if(e.target.id == listaDados.id){
                     btnShow.click();
                     console.log('hideMenu')
                  }
                });

    //playlist
    const containerPlaylist = document.querySelector('#playlist');
             const playItem = document.querySelector("#playlistItem");  
          const btnPlaylist = document.querySelector('#btnPlaylist');

    //album
    const containerDiscog = document.querySelector('#discog');
         //   const btnDiscog = document.querySelector('#btnDiscog');
         const albName = document.querySelector("#artName");
    //letra
        const letraContent = document.querySelector('#letra');   

    //elementos do Footer
        const nomeArtista = document.querySelector('#nomeArtista');
        const nomeMusica = document.querySelector('#nomeMusica');
        const fotoArtista = document.querySelector('#fotoArtista');       

 init();

function init (){   


    //idioma
        let usrlang = navigator.language|| navigator.userLanguage;
        // document.getElementById('favorite').textContent=usrlang;

        let str = navigator.userAgent;
        console.log(str);
        

        if(str.includes('Mobile')){
            document.getElementById('fonteConfig').style.display = 'grid';

        }
        
        
        let x = {
            'pt':'https://flagicons.lipis.dev/flags/4x3/br.svg',
            'pt-BR':'https://flagicons.lipis.dev/flags/4x3/br.svg',
            'en-US':'https://flagicons.lipis.dev/flags/4x3/um.svg',
            'en-GB-oxendict':'https://flagicons.lipis.dev/flags/4x3/gb.svg',
            'en-GB':'https://flagicons.lipis.dev/flags/4x3/gb.svg'
        };

        let lng = document.getElementById('language');

        //alert(usrlang); //teste


        lng.setAttribute("src",x[usrlang]);


    btnShow.onclick = showSearchBar;    
    btnPlaylist.onclick = playList; 
    fotoArtista.onclick = artist;

    let letraContainer = document.querySelector('#letraContainer');
    
   letraContainer.addEventListener('touchstart',toutch,{passive: true});    
    letraContainer.addEventListener('touchend',toutch,{passive: true});    
    letraContainer.addEventListener('scroll',toutch,{passive: true});  

}

function artist(){
    //let attr = this.getAttribute('toggle')  ? this.getAttribute('toggle') :  ;

    if(!(this.src.includes('.ico'))){
        this.classList.toggle('active')

        dismissModal(containerPesquisa);
        dismissModal(containerPlaylist);
    //console.log(dao.getSessionJSON('artist').albums)
    // document.getElementById('artImg').src = fotoArtista.src;
    aux.toggle(".discog",'active')
    }
}

function setAlign(){   
   
    inputAlign.forEach(input => {
       input.addEventListener('click',setup);       
    });

    inputColuna.forEach(input => {
       input.addEventListener('click',
       function (){
        aux.dismissClassGroup(inputColuna,'active');
        this.classList.toggle('active');   
        document.querySelector('.letras').style.columnCount = this.id;   
       });       
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

function fontConfig(){    
    
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
    dismissModal(containerDiscog);
  
 }

function dismissModal(container){
    container.classList.remove('active');
}

function showSearchBar(){    
    //this.classList.toggle('active');
    containerPesquisa.classList.toggle('active'); 
    dismissModal(containerPlaylist); 
    dismissModal(containerDiscog);
} 

function setFavorite(){
    dao.saveMus();  
    dismissModal(containerPesquisa);
    dismissModal(containerDiscog)
}
   
function getMus() {
  
    listaDados.innerHTML='' 
    //console.log(aux.normalizeInput(this.value))
  
  //
  let x = this ? this.value : '';

    let localMusic = apiVagalume.getMusLocal(x);    
    localMusic.forEach(dado => {        
            let div = aux.cria('div');
            div.onclick = getLetra; 
            div.id = dado.id;
            div.append(dado.desc);    
           listaDados.append(div);        
    });

    function getLetra(){
        getLetraById(this.id);
        setTimeout(
            ()=>{
              dismissModal(containerPesquisa),
              dismissModal(containerDiscog)
            }
            ,300);
    }
}

function getLetraById(busca) {  
    let letra = apiVagalume.getMusicById(busca);    
        letra.then((response) => response.json())
            .then((data) => {                           
            aux.addClass('#letra','active');            
           // console.log(data)                 
            //updateInfo(apiVagalume.modelMusica(data));
           // console.log("imprimindo dados da busca Music by ID");
            //console.log(data);
            let lista = updateInfo(modelMusica(data));

            console.log(lista)
            
            dao.saveTemp(lista);
    });    
}


function modelMusica(data){        

    
    let id = data.mus[0].id
    let letraMus =data.mus[0].text
    let nomeMus = data.mus[0].name
    let nomeArt = data.art.name;
    
    let alb = "";
    if (data.mus[0].alb){
        alb =  {url:data.mus[0].alb.img.replace('-W125',''), nome:data.mus[0].alb.name};
    }

    return {id,letraMus,nomeMus,nomeArt,alb}
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

//console.log(lista);

    fotoArtista.src = lista.alb.url ? lista.alb.url:lista.foto; 
    
    albName.innerText = lista.alb.nome ? lista.alb.nome : 'nada';
   
    document.getElementById('artImg').src = fotoArtista.src;
   //containerDiscog.style.backgroundImage = `url("${fotoArtista.src}")`;

    //console.log(lista.alb.url ? "sim":"nao");
    //lista.foto = lista.foto.replace('http://','https://');
   
    letraContent.innerHTML='';
    letraContent.innerHTML = lista.letraMus;
   
    letraContent.setAttribute('idLetra',lista.id);
        nomeMusica.innerText = lista.nomeMus;
       nomeArtista.innerText = lista.nomeArt ;
       inputArt.value = lista.nomeArt;
              inputMus.value = lista.nomeMus;
              listaDados.innerHTML = '';
}

 function selectArt(){     

   // nomeArtista.innerText = this.innerHTML ;

    let artEscolhido = this.value ? this.value : aux.normalizeInput(this.id);
    inputArt.value = this.id;    
    //console.log(aux.normalizeInput(this.id));
    apiVagalume.getArtInfo(artEscolhido); 
    //console.log(this)
    fotoArtista.id = apiVagalume.getFoto(aux.normalizeInput(this.id));
    
   // console.log(dao.getLocalJSON('temp') ? 'sim':'nao')
    //fotoArtista.id = dao.getLocalJSON('temp').alb.url;

    inputMus.disabled = false;
    
    this.parentNode.innerHTML = '';
    

    setTimeout(()=>{getMus();},800);
    inputMus.value='';
}