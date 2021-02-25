import Aux from './classAux.js';
export class Builder extends Aux{
    
    constructor(){
        super();
    }

    inicio(_menu){          
        //this.menu = _menu;               
        //this.loadFrag('menu', 'header');     
    }

    loadFrag(url,divName){
        let path = "frags/";        
        fetch(path + url + ".html").
            then( response => {                
                    return response.ok ? response.text():false;            
                })
            .then( responseHtml =>  
                {   
                   // this.loadHtml(responseHtml, divName, url); 
                })
            .catch(function (e) {        
                    console.log('Something went wrong. Descrição');
                    console.log(e);
            });            
        }

    loadHtml(responseHtml,divName,url){                                 
        document.querySelector(divName).innerHTML = responseHtml;
        let aux = new Aux();                
        aux.toggle("#" + url,"active");   
    }
    
}

export default Builder;