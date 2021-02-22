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
        this.inputClean('click',this.inputBuscaArtista);
        this.infoGet('input',this.inputBuscaArtista,'option','band',this.apiVagalume);        
        this.albumLoad('change',this.inputBuscaArtista,this.apiVagalume,this.autoCompArtList,this.builder)                
        
        //add listener - busca musica
        this.inputClean('click',this.inputBuscaMusica);
        this.infoGet('input',this.inputBuscaMusica,'option','desc',this.apiVagalume);        
        //this.lyricLoad('change',this.inputBuscaMusica,this.apiVagalume,this.autoCompMusList,this.builder)                        

        this.inputBuscaMusica.addEventListener('change',event =>{            
            let v = this.inputBuscaMusica.value;            
            let musId;
            event.target.list.childNodes.forEach(element => {                                
                if(element.value == v){
                    musId = element.id;                    
                    //so falta plotar
                ;}      //document.querySelector('#letra').innerText = x;
                    //document.querySelector('#nomeLetra').innerText = v;
            });             

            const x = this.apiVagalume.getInfo('letra',musId);                        

            x.then((response) => response.json())
            .then((data) => {
                console.clear();
                let x = data.mus[0].text;
                
                document.querySelector('#letra').innerHTML = x;
                document.querySelector('#nomeMusica').innerText = v ;
                document.querySelector('#nomeArtista').innerText = data.art.name ;
                });     
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