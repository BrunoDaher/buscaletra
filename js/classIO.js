
const swippe = {

  x : 0,
  y : 0,
  xfinal : 0,
  yfinal : 0,
  mov = false,

  calc = (e)=>{
    mov = !mov;
    let scrollY;
    console.log(e.type);
  
      
        if(e.type == 'touchstart'){                    
            xfinal=0;            
            y = e.changedTouches[0].clientY;
            x = e.changedTouches[0].clientX;
        }
        else if(e.type == 'touchend'){
            yfinal = e.changedTouches[0].clientY;
            xfinal = e.changedTouches[0].clientX;          
            let dif  = parseFloat(yfinal) - parseFloat(y);
            dif = Math.abs(dif);
            scrollY = (dif < 40?true:false );
            console.log(scrollY + " -> " + dif)
  
           // if(scrollY && dif > 120)
            if(scrollY){
                navigateSet(x > xfinal ? 1:-1);             
            }
        }
  }

}
function swippe(e){
  mov = !mov;
  let scrollY;
  console.log(e.type);

    
      if(e.type == 'touchstart'){                    
          xfinal=0;            
          y = e.changedTouches[0].clientY;
          x = e.changedTouches[0].clientX;
      }
      else if(e.type == 'touchend'){
          yfinal = e.changedTouches[0].clientY;
          xfinal = e.changedTouches[0].clientX;          
          let dif  = parseFloat(yfinal) - parseFloat(y);
          dif = Math.abs(dif);
          scrollY = (dif < 40?true:false );
          console.log(scrollY + " -> " + dif)

         // if(scrollY && dif > 120)
          if(scrollY){
              navigateSet(x > xfinal ? 1:-1);             
          }
      }
  
}