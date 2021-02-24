import Aux from './classAux.js';
export class Builder extends Aux{
    
    constructor(){
        super();
    }

    inicio(_menu){  
        
        this.menu = _menu;               
        this.loadFrag('menu', 'header');     

    }

    loadFrag(url,divName){
        let path = "frags/";        
        fetch(path + url + ".html").
            then( response => {                
                    return response.ok ? response.text():false;            
                })
            .then( responseHtml =>  
                {   
                    this.loadHtml(responseHtml, divName, url); 
                })
            .catch(function (e) {        
                    console.log('Something went wrong. Descrição');
                    console.log(e);
            });            
        }

    loadHtml(responseHtml,divName,url){                                 
        document.querySelector(divName).innerHTML = responseHtml;
        if(url == 'menu'){
                this.menu.menuInit()
            }
            else{
                //toggle memnu
                let aux = new Aux();                
                aux.toggle("#" + url,"active");   
                //this.loadDiscog();       
            }
    }

}

export default Builder;