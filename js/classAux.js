import Api from './classApiVagalume.js'
export class Aux{
    
 
    menuShow(seletor,classe){
        document.querySelector(seletor).addEventListener('click', event => {                        
            this.toggle('.' + classe,'active');
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

    swippe = {

        x : 0,
        y : 0,
        xfinal : 0,
        yfinal : 0,
        mov : false,
      
        calc (e){
            this.mov = !this.mov;
            let scrollY;
            console.log(e.type);
          
              
                if(e.type == 'touchstart'){                    
                    this.xfinal=0;            
                    this.y = e.changedTouches[0].clientY;
                    this.x = e.changedTouches[0].clientX;
                }
                else if(e.type == 'touchend'){
                    this.yfinal = e.changedTouches[0].clientY;
                    this. xfinal = e.changedTouches[0].clientX;          
                    let dif  = parseFloat( this.yfinal) - parseFloat( this.y);
                    dif = Math.abs(dif);
                    scrollY = (dif < 40?true:false );
                    console.log(scrollY + " -> " + dif)
          
                   // if(scrollY && dif > 120)
                    if(scrollY){
                       // navigateSet( this.x >  this.xfinal ? 1:-1);  
                       console.log(this.x >  this.xfinal ? 1:-1)           
                    }
                }
          }
        
        }
}

export default Aux;