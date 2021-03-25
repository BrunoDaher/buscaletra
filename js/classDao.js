export class Dao{

  //get
  getLocal(id){
     return localStorage.getItem(id);
   }
   
  getSession(id){
     return sessionStorage.getItem(id);
   }
    
  getSessionJSON(id){
    return JSON.parse(this.getSession(id));
   }

  getLocalJSON(id){
    return this.getLocal(id)? JSON.parse(this.getLocal(id)):false;
   }  

   //save
  saveSession(id,data){
     sessionStorage.setItem(id,data);
   }

  saveLocal(id,data){
    localStorage.setItem(id,data);
  }

  saveLocalJSON(id,data){
    this.saveLocal(id,JSON.stringify(data));
  }

  saveSessionJSON(id,data){
    this.saveSession(id,JSON.stringify(data));
  }

 saveTemp(lista){
  let nomeArt = this.normalize(lista.nomeArt);
  let nomeMus = this.normalize(lista.nomeMus);
  lista.chave = nomeArt+nomeMus;
  this.saveLocalJSON('temp',lista);
 }

 getListaJSON(){
   return this.getLocalJSON('lista') ? this.getLocalJSON('lista'):false;
 }

 getLocalMusicById(id){
   let lista = this.getListaJSON()[id];
   return lista;
 }

 saveMus(){    
     let temp = this.getLocalJSON('temp');    
    //premissas
     let lista = this.getLocalJSON('lista') ? this.getLocalJSON('lista'):new Object();
     //sobreescreve
     lista[temp.id] = temp;      
     this.saveLocalJSON('lista',lista);           
  }

  delMus(id){
    let lista = this.getLocalJSON('lista') ? this.getLocalJSON('lista'):new Object();
    //sobreescreve
    delete lista[id];  
    console.log(lista)    
    this.saveLocalJSON('lista',lista);  
  }

  normalize(str){
    str = str.toLowerCase();
    str = str.replaceAll('.','');
    str = str.replaceAll(' ','-');  
    //removeacentos
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
   
    return str;
  }
  
}

export default Dao;