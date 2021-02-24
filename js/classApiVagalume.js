const url =  "https://api.vagalume.com.br";
export class ApiVagalume {
    
    getArtMusic(art,mus){       
        art = this.normalizeInput(art);
        mus = this.normalizeInput(mus);
        let path = `${url}/search.php?apikey=660a4395f992ff67786584e238f501aa&art=${art}&mus=${mus}`;
        
        return fetch(path);
    }
    getMusLocal(busca){
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
  
     getMusicById(musId){          
        const path = `${url}/search.php?apikey=660a4395f992ff67786584e238f501aa&musid=${musId}`;
        return fetch(path);
     }
    
     getArt(art){        
        art = this.normalizeInput(art);
        let path = `${url}/search.art?apikey=660a4395f992ff67786584e238f501aa&q=${art}%20&limit=10`;
        this.fetchApi(path);    
        let ret = JSON.parse(sessionStorage.getItem('response'));
        return ret == null? []:JSON.parse(sessionStorage.getItem('response')).docs;
    }
    
    normalizeInput(str){
        str = str.toLowerCase();
        str = str.replaceAll('.','');
        str = str.replaceAll(' ','-');  
        return str;
    }

    getArtInfo(art){                
        art = this.normalizeInput(art);
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
              key ? sessionStorage.setItem(key,JSON.stringify(r)):"";        
               
            } )
        .catch(function (e) {       
            return 'erro' ;
            console.log(e);                
        });
    }

 }

export default ApiVagalume;