
export class Aux{
    

   build(container,id){
       let frag = fetch(`frags/${id}.html`);
       frag.then((response) => response.text())
            .then((data) => { 
                console.log(data)
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
       // console.log(custom)
       let obj = this.cria(custom.tipo);
       //custom.id ? obj.id = custom.id:"";
       obj.className = custom.nomeClasse;
       return obj;
   }
        
    arrayToList(custom){
        let container = this.cria('div');
        container.id = custom.id;
      
        let cont = 0;
        
        custom.arr.forEach(element => {
            custom.nomeClasse = custom.classe[cont];
            let div = this.criaCustom(custom)
            div.append(element);
            container.append(div);
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
      
        calc (e){
            this.mov = !this.mov;
            let scrollY;
          //  console.log(e.type);
          
              
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
                  //  console.log(scrollY + " -> " + dif)
          
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