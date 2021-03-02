export class Dao{

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
    return JSON.parse(this.getLocal(id));
   }  

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

}

export default Dao;