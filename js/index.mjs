import ApiVagalume from './classApiVagalume.js';
import Builder from './classBuilder.js';
import Menu from './classMenu.js';
import Factory from './classFactory.js';

const apiVagalume = new ApiVagalume();
const builder =  new Builder();
const menu = new Menu(builder,apiVagalume);

builder.loadFrag('menu','header');
builder.inicio(menu);

//let inputA = new Factory('input','inp1','inpFactory');
 let fact = new Factory();
 
    let inputArt = fact.build('input','buscaArtista','inputPesquisa');   
        inputArt.self().placeholder = 'Artista';
        inputArt.self().tyoe = 'text';
        inputArt.plotOn('#testes');    

        
//acões        
        inputArt.setAction('input',getArt);
        //inputArt.setAction('change',getLetra);    



function listMusics(e){
    console.log(e.target.innerText);
}

function getArt() {
    
    //recupera lista
    const x = apiVagalume.getInfo('buscaArtista',this.value);

    let lista = menu.cria('div');
    lista.id = 'buscaArtista-List';

    x.forEach(dado => {                        
        if(dado.band.includes(this.value) || dado.band == this.value){
            let div = document.createElement('div');        
            div.className = 'menuItem';        
            div.append(dado.band);                    
            lista.append(div);
        }
    }); 
    
    menu.cloneHtml('#buscaArtista-List',lista);
    

}

function getMusica() {
    //this.value valor do campo
    const x = apiVagalume.getInfo('buscaMusica',this.value);
    x.forEach(dado => {        
        console.log(dado.desc + " - " + dado.id);           
    });
}

function getLetra() {
    //this.value valor do campo
    const info = apiVagalume.getInfo('buscaMusica',this.value);
    let id = info[0].id;    
    
    const letra = apiVagalume.getInfo('letraId',id);    
          letra.then((response) => response.json())
               .then((data) => {            
                //retorna Letra            
                let x = data.mus[0].text;   
                alert(x);
            });    
}

