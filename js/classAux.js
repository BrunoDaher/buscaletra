import Api from './classApiVagalume.js'
export class Aux{

    api = new Api();
    

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

    addClass(seletor,nomeClasse){                
        document.querySelector(seletor).classList.add(nomeClasse);        
    }

    toggle(div,nomeClasse){              
        document.querySelector(div).classList.toggle(nomeClasse);
    }

    selfClean(seletor){
        let elem = document.querySelector(seletor);
        elem.innerHTML = '';            
        //elem.removeAttribute('disabled');
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

    inputClean(type,input){
        input.addEventListener(type, event => {     
        input.value = '';
        
        if(input.id=='buscaArtista'){
            document.querySelector('#buscaMusica').setAttribute('disabled','true');
        }
        this.toggle('main','active');                                     
        });
    }

   arrToList(arr,input){                            
    
    let lista = document.querySelector(`#${input.id}-List`);
    lista.innerHTML='';    
    let item = input.id=='buscaArtista'? 'band':'desc'
        arr.forEach(elem => {                           
            let div = this.cria('div');                                  
            div.id = elem.id;
            div.className = 'menuItem';
            const text = item?elem[item]:elem;
            if(text.includes(input.value) || text == input.value){
                div.append(text);                        
            
                div.addEventListener('click', ()=>{
                    //input.value = text;                                 
                    if(item=='band'){
                        this.loadInfo(input.value);                                               
                    }
                    else{                    
                        this.loadLyrics(elem.id,'letraId');                                               
                    }
                    lista.innerHTML=''
                });

                lista.append(div);
            }           
            });                    
            return lista;
        }
    infoGet(type,input){
        input.addEventListener(type, event => {
            if(this.inputValido(event.data)){                                                            
                let arr = this.apiVagalume.getInfo(input.id, input.value);   
                this.arrToList(arr,input);            
            }            
            else{                
                let v = input.value;
                if(event.data != null){
                    input.value = v.substr(0, v.length - 1);
                }
            }
        });
    }   

    inputValido(texto){
        let normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890 ";
        normal = normal + normal.toLowerCase();
        return normal.includes(texto) ? true:false;
    }

    loadInfo(value){        
        this.apiVagalume.getArtInfo(value); 
            document.querySelector('#buscaMusica').removeAttribute('disabled');
            document.querySelector('#buscaMusica').value='';
    }

    loadLyrics(musId,type){        
        const x = this.apiVagalume.getInfo(type,musId);

        x.then((response) => response.json())
        .then((data) => {                        
            let x = data.mus[0].text;
                document.querySelector('#letra').innerHTML = x;
                this.addClass('#letra','active');                    
                //document.querySelector('#nomeMusica').innerText = v ;
                document.querySelector('#nomeArtista').innerText = data.art.name ;
            });    
    }
   
}

export default Aux;