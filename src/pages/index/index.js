import "bootstrap/dist/css/bootstrap.css";
import './index.css'
import jpg from '@/assets/img/1.jpg'
import png from '@/assets/img/2.png'
import data from './data.json'
const $ = require('jquery')

console.log('process.env.NODE_ENV::', process.env.NODE_ENV)


$('#btn').bind('click', function() {
	console.log('动态导入')
	import(/* webpackChunkName: "math2" */ './math.js').then(({cube}) => {
		console.log('hello import--------', cube(55))
	}).catch(error => {
		console.log('An error occurred while loading the component')
	});
})



// if (module.hot) {
//    module.hot.accept('./index2.js', function() {
//      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
//    })
//  }