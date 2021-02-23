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

    arrToList = () =>{

    }

 
}


export default Factory;
