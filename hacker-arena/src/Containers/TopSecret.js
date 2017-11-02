import React from 'react';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
// import '../Styles/TopSecret.css';
OBJLoader(THREE);


class TopSecret extends React.Component {
  componentDidMount(){
    this.THREE = THREE
    var renderer, scene, camera, banana, banana2;

var ww = 600,
	wh = 600;
function init(){

	renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene')});
	renderer.setSize(ww,wh);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50,ww/wh, 0.1, 10000 );
	camera.position.set(0,0,900);
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
	// let diffuse = THREE.ImageUtils.loadTexture( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/25480/Misc_WoodBarrelOldMold_2k_d.jpg" );
  // let specular = THREE.ImageUtils.loadTexture( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/25480/Misc_WoodBarrelOldMold_2k_s.jpg" );
  // let normal = THREE.ImageUtils.loadTexture( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/25480/Misc_WoodBarrelOldMold_2k_n.jpg" );

	// var material = new THREE.MeshPhongMaterial({
  //   map: diffuse,
  //   specular: 0xffffff,
  //   specularMap: specular,
  //   shininess: 10,
  //   normalMap: normal
  // });

	//Launch loading of the obj file, addBananaInScene is the callback when it's ready 
	loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/banana.obj', addBananaInScene);
	loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/banana.obj', addBanana2InScene);

};




var addBananaInScene = function(object){
	banana = object;
	//Move the banana in the scene
	banana.rotation.x = Math.PI/2;
	banana.position.y = -210;
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

var addBanana2InScene = function(object){
	banana2 = object;
	//Move the banana in the scene
	banana2.rotation.x = Math.PI/3;
	banana2.position.y = -100;
	banana2.position.z = 50;
	//Go through all children of the loaded object and search for a Mesh
	object.traverse( function ( child ) {
		//This allow us to check if the children is an instance of the Mesh constructor
		if(child instanceof THREE.Mesh){
			child.material.color = new THREE.Color("red");
			// child.material.transparent = true;
			// child.material.opacity = 0.2;
			//Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
			child.geometry.computeVertexNormals();
		}
	});

	//Add the 3D object in the scene
	scene.add(banana2);
	
	render2();
};

var render2 = function () {
	requestAnimationFrame(render2);
	//Turn the second banana 
	// console.log(banana2)
	banana2.rotation.x -= .1
	//Turn the banana
	// banana.rotation.z += .1;
	// banana.rotation.x += .1;
	// banana.rotation.y += .1;

	renderer.render(scene, camera);
};

var render = function () {
	requestAnimationFrame(render);
	//Turn the second banana 
	// console.log(banana2)
	// banana2.rotation.z = .1
	//Turn the banana
	banana.rotation.z += .1;
	// banana.rotation.x += .1;
	// banana.rotation.y += .1;

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