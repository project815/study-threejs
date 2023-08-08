import "../css/cordinate.css";
import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

// import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
// import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(10, 15, -22);

orbit.update();

const planeMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(20, 20),
	new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		visible: false,
	})
);
planeMesh.rotateX(-Math.PI / 2);
scene.add(planeMesh);

const grid = new THREE.GridHelper(20, 20);
scene.add(grid);

const highlightMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(1, 1),
	new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		transparent: true,
	})
);
highlightMesh.rotateX(-Math.PI / 2);
highlightMesh.position.set(0.5, 0, 0.5);
scene.add(highlightMesh);

const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let intersects;

window.addEventListener("mousemove", function (e) {
	mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
	mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mousePosition, camera);
	intersects = raycaster.intersectObject(planeMesh);
	if (intersects.length > 0) {
		const intersect = intersects[0];
		const highlightPos = new THREE.Vector3()
			.copy(intersect.point)
			.floor()
			.addScalar(0.5);
		highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);

		const objectExist = objects.find(function (object) {
			return (
				object.position.x === highlightMesh.position.x &&
				object.position.z === highlightMesh.position.z
			);
		});

		if (!objectExist) highlightMesh.material.color.setHex(0xffffff);
		else highlightMesh.material.color.setHex(0xff0000);
	}
});

const sphereMesh = new THREE.Mesh(
	new THREE.SphereGeometry(0.4, 4, 2),
	new THREE.MeshBasicMaterial({
		wireframe: true,
		color: 0xffea00,
	})
);

const objects = [];
let clicks = 1;

window.addEventListener("mousedown", function () {
	const objectExist = objects.find(function (object) {
		return (
			object.position.x === highlightMesh.position.x &&
			object.position.z === highlightMesh.position.z
		);
	});

	const newMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(1, 1),
		new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide,
			transparent: true,
		})
	);
	newMesh.rotateX(-Math.PI / 2);
	newMesh.position.copy(highlightMesh.position);
	if (clicks == 1) {
		newMesh.material.color.setHex(0xaaff00);
		clicks += 1;
	} else if (clicks == 2) {
		newMesh.material.color.setHex(0xff0000);
		clicks += 1;
	}
	scene.add(newMesh);

	let x = newMesh.position.x;
	let y = newMesh.position.y;
	let z = newMesh.position.z;

	console.log("Current location: " + x + ", " + y + ", " + z);

	if (!objectExist) {
		if (intersects.length > 0) {
			// const sphereClone = sphereMesh.clone();
			// sphereClone.position.copy(highlightMesh.position);
			// scene.add(sphereClone);
			// objects.push(sphereClone);
			// highlightMesh.material.color.setHex(0xFF0000);
			// console.log("Item pushed @ " + sphereClone.position.x +", "+ sphereClone.position.y +", "+ sphereClone.position.z);
			// console.log(objects)
			highlightMesh.material.color.setHex(0xffffff);
		}
	} else {
		console.log("Item is here");
	}
	console.log(scene.children.length);
});

function animate(time) {
	highlightMesh.material.opacity = 1 + Math.sin(time / 120);
	objects.forEach(function (object) {
		object.rotation.x = time / 1000;
		object.rotation.z = time / 1000;
		object.position.y = 0.5 + 0.5 * Math.abs(Math.sin(time / 1000));
	});
	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

// import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// // npm install parcel -g
// // npm install three
// // parcel ./index.html -> boots server to run locally

// const renderer = new THREE.WebGL1Renderer();
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );

// const orbit = new OrbitControls(camera, renderer.domElement);
// camera.position.set(10,15,-22);

// orbit.update()

// // Create the plane
// const planeMesh = new THREE.Mesh(
//     new THREE.PlaneGeometry(20, 20),
//     new THREE.MeshBasicMaterial(
//         {
//             side: THREE.DoubleSide,
//             visible: false,
//         }
//     )
// );
// planeMesh.rotateX(-Math.PI / 2);
// scene.add(planeMesh);
// planeMesh.name = 'ground';

// // Create the grid on the plane
// const grid = new THREE.GridHelper(20,20);
// scene.add(grid);

// // Create Highlight Square
// const highlightMesh = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1),
//     new THREE.MeshBasicMaterial(
//         {
//             side: THREE.DoubleSide,
//         }
//     )
// );
// highlightMesh.rotateX(-Math.PI / 2);
// highlightMesh.position.set(0.5, 0, 0.5)
// scene.add(highlightMesh);

// // Dealing with Ray castor??
// const mousePosition = new THREE.Vector2();
// const raycaster = new THREE.Raycaster();
// let intersects;

// window.addEventListener('mousemove', function(e) {
//     mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
//     mousePosition.y = -(e.clienty / window.innerHeight) * 2 + 1;
//     raycaster.setFromCamera(mousePosition, camera);
//     intersects = raycaster.intersectObject(planeMesh)
//     if(intersects.length > 0) {
//         const intersect = intersects[0];
//         const highlightPos = new THREE.Vectory3().copy(intersect.point).floor().addScalar(0.5);
//         highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);

//         const objectExist = objects.find(function(object) {
//             return (object.position.x === highlightMesh.position.x) && (object.position.z === highlightMesh.position.z)
//         });

//         if(!objectExist) {
//             highlightMesh.material.color.setHex(0xFFFFFF);
//         } else {
//             highlightMesh.material.color.setHex(0xFF0000);
//         }
//     }
//     // intersects = raycaster.intersectObjects(scene.children);
//     // intersects.forEach(function(intersect) {
//     //     if(intersect.object.name === 'ground') {
//     //         const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
//     //         highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);
//     //     }
//     // });
// });

// function animate() {
//     renderer.render(scene, camera);
// }

// renderer.setAnimationLoop(animate);

// window.addEventListener('resize', function() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight)
// });
