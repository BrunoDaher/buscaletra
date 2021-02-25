function drag(e){
  mov = !mov;

  if(e.type == 'touchstart'){        
      xfinal=0;
      x = e.changedTouches[0].clientX;
  }
  else{
      xfinal = e.changedTouches[0].clientX;
      console.log(x > xfinal ? 'vai':'volta') 
      
      showBar();
  }
}