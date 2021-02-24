export class Factory  {

    constructor(){
        
     }

    elemento = '';

    build = (type,name,classe)=>{                
        this.elemento = document.createElement(type);
        this.elemento.id = name;
        this.elemento.className = classe;
        return this;
    }
    

    getFromHtml(selector){
        let elem = document.querySelector(selector);
        //this.plotOn('#' + elem.parentElement.id);
        return this.build(elem.nodeName,elem.id,elem.className);
    }

    setAction(action,handler){
        this.elemento.addEventListener(action,handler);
    }

    self = ()=> {return this.elemento};

    text(texto){
        this.elemento.append(texto);
        console.log(this.elemento)
    }

    plotOn = (div)=>{                        
        document.querySelector(div).append(this.elemento);
    }

 
}


export default Factory;
