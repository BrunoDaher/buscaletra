import ApiVagalume from './classApiVagalume.js';
import Builder from './classBuilder.js';
import Menu from './classMenu.js';

const apiVagalume = new ApiVagalume();
const builder =  new Builder();
const menu = new Menu(builder,apiVagalume);

builder.loadFrag('menu','header');
builder.inicio(menu);
