import React from 'react';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
// import '../Styles/TopSecret.css';
OBJLoader(THREE);


class TopSecret extends React.Component {
  componentDidMount(){
    this.THREE = THREE
    var renderer, scene, camera, banana;

var ww = 400,
	wh = 400;
function init(){

	renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene')});
	renderer.setSize(ww,wh);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50,ww/wh, 0.1, 10000 );
	camera.position.set(0,0,500);
	scene.add(camera);

	//Add a light in the scene
	let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	directionalLight.position.set( 0, 0, 350 );
	directionalLight.lookAt(new THREE.Vector3(0,0,0));
	scene.add( directionalLight );

	//Load the obj file
	loadOBJ();
}

var loadOBJ = () => {

	//Manager from ThreeJs to track a loader and its status
	var manager = new THREE.LoadingManager();
	//Loader for Obj from Three.js
	var loader = new this.THREE.OBJLoader( manager );
  
	//Launch loading of the obj file, addBananaInScene is the callback when it's ready 
	loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/banana.obj', addBananaInScene);

};

var addBananaInScene = function(object){
	banana = object;
	//Move the banana in the scene
	banana.rotation.x = Math.PI/2;
	banana.position.y = -200;
	banana.position.z = 50;
	//Go through all children of the loaded object and search for a Mesh
	object.traverse( function ( child ) {
		//This allow us to check if the children is an instance of the Mesh constructor
		if(child instanceof THREE.Mesh){
			child.material.color = new THREE.Color(0X00FF00);
			//Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
			child.geometry.computeVertexNormals();
		}
	});
	//Add the 3D object in the scene
	scene.add(banana);
	render();
};


var render = function () {
	requestAnimationFrame(render);

	//Turn the banana
	banana.rotation.z += .01;

	renderer.render(scene, camera);
};

init();
  }
  render(){
    return(
      <canvas id="scene" style={{height: '400px !important', width: '400px !important'}}></canvas>
    )
  }
}

export default TopSecret;