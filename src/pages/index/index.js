import './index.css'
import jpg from '@/assets/img/1.jpg'
import png from '@/assets/img/2.png'
import data from './data.json'

import { cube } from './math.js';

console.log(cube(5))

import './index2.js'

console.log(jpg)
console.log(png)

console.log(data)

if (module.hot) {
   module.hot.accept('./index2.js', function() {
     console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
   })
 }