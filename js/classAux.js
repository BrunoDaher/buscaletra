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
        //this.remClass(menu,'active');            
        });
    }
    arrToDatalist(arr,dataList,node,item){                            
        arr.forEach(elem => {             
            let div = this.cria(node);                                  
            div.id = elem.id;
            div.append(item?elem[item]:elem);                  
           dataList.append(div);
       });

       return dataList;
   }
    infoGet(type,input,node,item,apiVagalume){
        input.addEventListener(type, event => {
            
            let normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890 ";
            normal = normal + normal.toLowerCase();

            if(normal.includes(event.data)){                                            
                this.selfClean('#' + input.list.id);                                            
                input.list.classList.add('active');
                this.arrToDatalist(apiVagalume.getInfo(input.id, input.value),input.list,node,item);            
            }            
            else{                
                let v = input.value;
                if(event.data != null){
                    input.value = v.substr(0, v.length - 1);
                }
            }
        });
    }   

     albumLoad(type,input,apiVagalume,datalist,builder){
        
        input.addEventListener(type, function(event) {                                                                    
        //baixa dados do artista
        apiVagalume.getArtInfo(input.value); 
        
        //habilita campo de busca de musica
        document.querySelector('#buscaMusica').list.innerHTML='';
        document.querySelector('#buscaMusica').removeAttribute('disabled');
        document.querySelector('#buscaMusica').value=''

            setTimeout( ()=>{          
                datalist.innerHTML = "";            
                //builder.loadDiscog();                                        
                
                }, '200');             
        });
    }

    
    loadDiscog(){        
        let container = document.querySelector('#albuns');
        let discografia = JSON.parse(sessionStorage.getItem('artist')).albums.item;
        container.innerHTML = '';
        
        discografia.forEach(album => {                                     
            let div = this.criaComp('div','album',album.desc);            
            div.append(album.desc);
            container.append(div);                             
        });     
    }

    loadLyrics(id){        
        //let container = document.querySelector('#letra');
        
        
        //container.innerHTML = '';
        //console.log(container);
        
    }

     lyricLoad(type,input,apiVagalume,datalist,builder){
        input.addEventListener(type, event => {                                                                                    
            setTimeout( ()=>{          
                this.loadLyrics(input.value);
                //let discografia = JSON.parse(sessionStorage.getItem('artist')).albums.item;
                //console.log(discografia);
                }, '200');             
        });
    }
   
   
}

export default Aux;