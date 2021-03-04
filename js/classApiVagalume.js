const url =  "https://api.vagalume.com.br";
export class ApiVagalume {

    constructor(_dao){
        this.apiKey = 'apiKey=660a4395f992ff67786584e238f501aa';
        this.dao = _dao;
    }
    
    getArtMusic(art,mus){       
        art = this.normalizeInput(art);
        mus = this.normalizeInput(mus);
        let path = `${url}/search.php?${this.apiKey}&art=${art}&mus=${mus}`;
        
        return fetch(path);
    }
    getMusLocal(busca){
        let mus = this.dao.getSessionJSON('artist').lyrics.item;   
        let slim = [];
        
        mus.forEach(element => {                                                
            if(element.desc.toLowerCase().startsWith(busca.toLowerCase()))
            {                                
                slim.push(element);                
            }
        });        
        return slim;        
    }

    getFoto(band){
        band = this.normalizeInput(band);
        return `${url}/${band}/images/profile.jpg`
    }

   getCurrentFoto(){
       //console.log(this.dao.getSessionJSON('artist').pic_small)
        return  `${url}${this.dao.getSessionJSON('artist').pic_small}`;
    }
  
    getMusicById(musId){          
        const path = `${url}/search.php?${this.apiKey}&musid=${musId}`;       
        return fetch(path);
     }
    
     getArt(art){        
        art = this.normalizeInput(art);      
        let path = `${url}/search.art?${this.apiKey}&q=${art}%20&limit=10`;      
        return fetch(path);  
    }

    modelMusica(data){
        let id = data.mus[0].id
        let letraMus =data.mus[0].text
        let nomeMus = data.mus[0].name
        let nomeArt = data.art.name
        return {id,letraMus,nomeMus,nomeArt}
    }

    normalizeInput(str){
        str = str.toLowerCase();
        str = str.replaceAll('.','');
        str = str.replaceAll(' ','-');  
        str = str.replaceAll('/','-');  
        //removeacentos
        str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
       
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