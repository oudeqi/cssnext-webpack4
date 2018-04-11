import "bootstrap/dist/css/bootstrap.css";
import '@/pages/index/index.css'
import jpg from '@/images/1.jpg'
import png from '@/images/2.png'
import data from '@/pages/index/data.json'
const $ = require('jquery')

console.log('process.env.NODE_ENV::', process.env.NODE_ENV)


$('#btn').bind('click', function() {
	console.log('动态导入')
	import(/* webpackChunkName: "math2" */ '@/pages/index/math.js').then(({cube}) => {
		console.log('hello import--------', cube(55))
	}).catch(error => {
		console.log('An error occurred while loading the component')
	});
})


// if (module.hot) {
//    module.hot.accept('./index2.js', function() {
//      console.log('zxc');
//    })
//  }

// function timeout(val) {
//   return new Promise((resolve) => {
//     setTimeout(() => { resolve(val) }, 1000);
//   });
// }

// async function asyncPrint() {
//   for(let i=0; i<10; i++){
//   	await timeout(i).then(res => {console.log(res)})
//   }
// }

// asyncPrint()

console.log('zxczxczxczxc')
console.log('vv')