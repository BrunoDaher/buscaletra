const url =  "https://api.vagalume.com.br";
export class ApiVagalume {
    
    getArtMusic(art,mus){       
        art = this.validaInput(art);
        mus = this.validaInput(mus);
        let path = `${url}/search.php?apikey=660a4395f992ff67786584e238f501aa&art=${art}&mus=${mus}`;
        
        return fetch(path);
    }

    getInfo(key,busca){        
      switch (key) {
        case 'buscaArtista':              
            return this.getArt(busca);     
        break;        
        case 'buscaMusica':
            //return this.getMus();              
            return this.getMus(busca);
        break;    
        case 'letraId':                     
        return this.getMusicById(busca);                  
        case 'letra':            
        return this.getArtMusic(busca.art,busca.mus);
        break;   
        default:
        break;
      }        
    }
      
    getMus(busca){
        let mus = JSON.parse(sessionStorage.getItem('artist')).lyrics.item;   
        let slim = [];
        
        mus.forEach(element => {                                                
            if(element.desc.toLowerCase().startsWith(busca.toLowerCase()))
            {                                
                slim.push(element);                
            }
        });        
        return slim;        
    }

    albumBuilder(musid){
        let path = `${url}/search.php?apikey=660a4395f992ff67786584e238f501aa&musid=${musId}`;
        this.fetchApi(path);   
        
    }

     getMusicById(musId){          
        let path = `${url}/search.php?apikey=660a4395f992ff67786584e238f501aa&musid=${musId}`;
        return fetch(path);
        //return this.fetchApi(path);  
    }
    
     getArt(art){        
        let path = `${url}/search.art?apikey=660a4395f992ff67786584e238f501aa&q=${art}%20&limit=10`;
        this.fetchApi(path);    
        let ret = JSON.parse(sessionStorage.getItem('response'));
        return ret == null? []:JSON.parse(sessionStorage.getItem('response')).docs;
    }
    
    validaInput(str){
        str = str.toLowerCase();
        str = str.replaceAll('.','');
        str = str.replaceAll(' ','-');  

        return str;
    }

    getArtInfo(art){                
        art = this.validaInput(art);
        let path = `https://www.vagalume.com.br/${art}/index.js`;              
        this.fetchApi(path);        
    }
 
      fetchApi(path){            
        fetch(path)
        .then( response =>   {        
            return response.ok ? response.text() : false; 
         })
        .then( function response(responseHtml)
            { 
              let key = Object.keys(JSON.parse(responseHtml))[0];              
                let r = JSON.parse(responseHtml)[key];                 
                
                if(key)
                {
                    if(key == 'type'){
                        sessionStorage.setItem('letra','');                        
                        key='letra';
                        //return 
                        r = JSON.parse(responseHtml).mus[0].text;                                                                        
                    }                 
                    sessionStorage.setItem(key,JSON.stringify(r));                  
                    
                    if(key=='artist'){                                     
                        this.setDataList();
                    } 
                    

                }
            } )
        .catch(function (e) {       
            return 'erro' ;
            console.log(e);                
        });
    }

    
    setDataList(){
        //let datalist = document.querySelector('#muslist');
        let mus = JSON.parse(sessionStorage.getItem('artist')).lyrics.item;           
        //this.arrMus = [];        
        mus.forEach(elem => {                                           
            this.arrMus.push({'id':elem.id,'desc':elem.desc});                              
        });

        //console.log(this.arrMus)
    }

}

export default ApiVagalume;