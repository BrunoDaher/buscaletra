import Api from './classApiVagalume.js'
export class Aux{

    menuShow(seletor){
        document.querySelector(seletor).addEventListener('click', event => {                        
            this.toggle('.menuInner','active');
        });
    }

    menuClear(seletor){
        seletor.forEach(item => item.classList.remove('active'));
    }

    remClass(seletor,classe){        
        seletor.classList.remove(classe);            
    }

    insertHtml = (div,el)=>{
        document.querySelector(div).innerHTML = el.innerHTML;
        return document.querySelector(div);
    }

    addClass(seletor,nomeClasse){                
        document.querySelector(seletor).classList.add(nomeClasse);        
    }

    toggle(div,nomeClasse){              
        document.querySelector(div).classList.toggle(nomeClasse);
    }

    selfClean(seletor){
        let elem = document.querySelector(seletor);
        elem.innerHTML = '';                    
        elem.value=''         
    }

   cria(tipo){
       let obj = document.createElement(tipo);
       return obj;
   }

   criaComp(tipo,nomeClasse,id){
       let obj = this.cria(tipo);
       id ? obj.id = id:"";
       obj.className = nomeClasse;
       return obj;
   }
    inputValido(texto){
        let normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890 ";
        normal = normal + normal.toLowerCase();
        return normal.includes(texto) ? true:false;
    }
}

export default Aux;