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
        this.menuInner = document.querySelector(".menuInner");
        this.menuShow('#menuShow');
    }

     menuInit(){    
        //create a array with the selector ".headMenu"            
        this.readMenu();        
        if(this.headMenu){                               
            this.headMenu.forEach(item => this.menuAddAction(item));   
        }
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