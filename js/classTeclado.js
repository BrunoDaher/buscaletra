
export class Teclado{

  constructor(teclado){    
    let x = this.evento('Keydown');
    //console.log(x)
    window.onkeydown = this.goKey(this.evento);
  }
  
  goKey(key){
    switch (key) {
      case 'ArrowRight':
        console.log(key) 
      break;
      case 'ArrowLeft':         
      break;
      case 'ArrowDown':          
       const dados = document.getElementById('listaDados').childNodes;
       //dados.forEach(element => {
        //element.classList.remove('active');        
       //});

       //dados[count].classList.toggle('active');
       //
      break;
      case 'ArrowUp':      
  
      break;
      case 'Escape':  
        console.log('alo')
      break;
      default:
        break;
      } 
  };
  evento(event){
    
    //this é o evento do teclado, e não a classe    
    if (event.defaultPrevented) {
      return; // Should do nothing if the default action has been cancelled
    }
  
    let handled = false;
    let validKeys = ['Escape','+','-','ArrowRight','ArrowLeft','ArrowDown','ArrowUp','R'];
  
    if(validKeys.includes(event.key))
    {       
      const dados = document.getElementById('listaDados').childNodes;
    }  
  
    if (handled) {
      // Suppress "double action" if event handled
      event.preventDefault();
    }

    return event.key;
  } 
 
}

export default Teclado;