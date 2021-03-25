
export class Aux{    
   build(container,id){
       let frag = fetch(`frags/${id}.html`);
       frag.then((response) => response.text())
            .then((data) => { 
            document.querySelector(container).innerHTML = data;
        });  
   }   

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

    remove(id,tempo){
        document.getElementById(id).classList.add('hide');
         
        setTimeout(()=>{
            document.getElementById(id).classList.add('exclui')},
        tempo);
    }

    toggle(div,nomeClasse){              
        document.querySelector(div).classList.toggle(nomeClasse);
    }
    
    selfClean(){
        this.value='';
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

    criaCustom(custom){       
       
       let obj = this.cria(custom.tipo);
       
       //custom.id ? obj.id = custom.id:"";
       obj.className = custom.nomeClasse;
     
        
       return obj;
   }



        
    arrayToList(custom){
        let container = this.cria('div');
        container.id = custom.id;
        container.className = custom.nomeClasse;
      
        let cont = 0;
        
        custom.arr.forEach(element => {
            custom.nomeClasse = custom.classes[cont];
            
            let div = this.criaCustom(custom)
            div.append(element);            
            container.append(div);   
                       
            let turn = false;
            let x;
            let xFinal;
            let event = (e)=>{

                turn = e.type=='touchstart' ? true:false;            
                if(turn){
                    x = e.changedTouches[0].clientX;
                }            
                else
                {
                  xFinal = e.changedTouches[0].clientX;
                   custom.handle[xFinal > x ? 1:0] ();
                   x = 0;
                   xFinal = 0;
                }                
            }
           
            container.addEventListener('touchstart',event,{passive: true});                
            container.addEventListener('touchend',event,{passive: true});                       
            cont++;
            
        });

        return container;
    }

    normalizeInput(str){
        str = str.toLowerCase();
        str = str.replaceAll('.','');
        str = str.replaceAll(' ','-');  
        //removeacentos
        str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
       
        return str;
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
      
        calc (e,handler){
            this.mov = !this.mov;
            let scrollY;            
                if(e.type == 'touchstart'){                    
                    this.xfinal=0;            
                    this.y = e.changedTouches[0].clientY;
                    this.x = e.changedTouches[0].clientX;
                }
                else if(e.type == 'touchend'){
                    this.yfinal = e.changedTouches[0].clientY;
                    this. xfinal = e.changedTouches[0].clientX;          
                    let deltaY  = parseFloat( this.yfinal) - parseFloat( this.y);                             
                    let deltaX = Math.abs(parseFloat( this.xfinal) - parseFloat( this.x));                               
                    scrollY = deltaY < 40 ? true:false;
                    if(scrollY && deltaX > 0){
                    
                    handler(this.x >  this.xfinal ? 1:-1);                                  
                      // console.log(this.x >  this.xfinal ? 1:-1)           
                    } 

                    return scrollY;
                }
          }
        
        }
}

export default Aux;