
export class Teclado{

  dados = document.getElementById('listaDados').childNodes;
 lcount = -1;
 
 constructor(){    
    document.addEventListener('keydown', (e) => {
      this.dados = document.getElementById('listaDados').childNodes;
      if(this.dados.length > 0){
        this.goKey(e.key)
      } 

      let v = document.getElementById('fonte').value;
      let x = parseFloat(v);
    
  
      switch (e.key) {
  
        case '4':
          document.getElementById('left').click();
          break;
        case '5':
          document.getElementById('center').click();
          break;
        case '6':
            document.getElementById('right').click();
          break;
                    
  
  
        case '1':
          document.getElementById('1').click();
          break;
           
         case '2':
           document.getElementById('2').click();
         break; 
        
        case '+':
          x = x + parseFloat(0.1);
          x = x.toFixed(2);          
          document.getElementById('fonte').setAttribute('value', x);
          document.querySelector('.letras').style.fontSize = x + 'vh'; 
        break; 
       
        case '-':
          x = x - parseFloat(0.1);
          x = x.toFixed(2);
          document.getElementById('fonte').setAttribute('value', x);
          document.querySelector('.letras').style.fontSize = x + 'vh'; 
        break; 
      }
    });
  }
  
  clean(){
    this.limpaSelecao();
    this.lcount = -1;
  }

  limpaSelecao(){
    this.dados.forEach(element => {
      element.classList.remove('active');        
     });
  }

  goKey(key){

    switch (key) {
      case 'ArrowRight':
        console.log(key);
      break;
      case 'Enter':
        this.dados[this.lcount].click();
        this.clean();
      break;

      case 'ArrowDown':                    
          this.limpaSelecao();
          console.log(this.dados.length)
          this.lcount = this.lcount + 1;    
          if(0 <= this.lcount &&  this.lcount < this.dados.length ){ 
            this.dados[this.lcount].classList.add('active');     
            }
            else{
              this.clean();
            }
      
            break;
      
      case 'ArrowUp':      
      //limpa selecoes
       this.limpaSelecao();
       this.lcount = this.lcount - 1;
           
        if(this.lcount < this.dados.length  &&  this.lcount >= 0){           
              this.dados[this.lcount].classList.add('active');
        }
           else
        {
           this.clean();
        }
      break;
      
      case 'Escape':  
        console.log('alo')
      break;
      default:
      break;
       
  };
}
}

export default Teclado;