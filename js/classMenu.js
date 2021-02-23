import Aux from './classAux.js'
export class Menu extends Aux {    
    //a principio desnecessário declarar
        
    constructor(_classBuilder,_apiVagalume){
        super();
        this.builder = _classBuilder;
        this.apiVagalume = _apiVagalume                        
    }

    readMenu() {        
        this.headMenu = document.querySelectorAll('.headMenu');        

        this.inputBuscaArtista = document.querySelector('#buscaArtista');                
        this.autoCompArtList = document.querySelector('#artlist');
        
        this.inputBuscaMusica = document.querySelector('#buscaMusica');                
        this.autoCompMusList = document.querySelector('#muslist');
              
        this.menuInner = document.querySelector(".menuInner");
        this.menuShow('#menuShow');
    }

     menuInit(){    
        //create a array with the selector ".headMenu"            
        this.readMenu();
        
        if(this.headMenu){                               
            this.headMenu.forEach(item => this.menuAddAction(item));   
        }

        //add listener - busca artista
        //this.inputClean('click',this.inputBuscaArtista);
        //this.infoGet('input',this.inputBuscaArtista,this.apiVagalume);        
        
        //change
        this.inputBuscaArtista.addEventListener('change', ()=>{            
            //this.loadInfo(this.inputBuscaArtista.value,this.apiVagalume);
            //this.inputBuscaMusica.focus();  
        });
        
        //add listener - busca musica
        //this.inputClean('click',this.inputBuscaMusica);
        this.infoGet('input',this.inputBuscaMusica);        
        this.infoGet('change',this.inputBuscaMusica,this.apiVagalume);        
        //this.lyricLoad('change',this.inputBuscaMusica,this.apiVagalume,this.autoCompMusList,this.builder)                        

        //change inputMusica
        this.inputBuscaMusica.addEventListener('change',event =>{                               
            let art = this.inputBuscaArtista.value;
            let mus = this.inputBuscaMusica.value;
            let busca = {art:art,mus:mus};                        
            this.loadLyrics(busca,'letra');
        });
    }
   
    menuAddAction(item){        
        item.addEventListener('click', event => {
            this.menuClear(this.headMenu);         
            const target = item.getAttribute('_target');   
            item.classList.add('active');            
            //atualiza titulo aba navegador e titulo esolhido
            //document.querySelector('#currentItem').innerText = item.innerText;
            document.title = "BUSCA Letra - " +  item.innerText;            
            //carrega conteudo ajax
            this.builder.loadFrag(target,'main');            
            //toggle botão pressionado
            this.toggle('.menuInner','active');
            //document.querySelector('.menuInner').classList.toggle('active');
        })
    }
}

export default Menu;