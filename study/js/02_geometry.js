import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

class App {
	constructor() {
		const divContainer = document.querySelector("#webgl-container");
		this._divContainer = divContainer;

		const renderer = new THREE.WebGLRenderer({ antialias: true });

		renderer.setPixelRatio(window.devicePixelRatio);
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer;

		const scene = new THREE.Scene();
		this._scene = scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();
		this._setupControl();

		window.onresize = this.onResize.bind(this);
		this.onResize();

		requestAnimationFrame(this.render.bind(this));
	}

	_setupControl() {
		new OrbitControls(this._camera, this._divContainer);
		//OrbitControls는 카메라를 마우스로 움직일 수 있게 해주는 클래스.
	}

	_setupCamera() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.z = 15;
		this._camera = camera;
	}
	_setupLight() {
		const color = 0xffffff;
		const infensity = 1;
		const light = new THREE.DirectionalLight(color, infensity);
		light.position.set(-1, 2, 4);
		this._scene.add(light);
	}
	/* 기본 geometry*/
	// _setupModel() {
	// 	//BoxGeometry
	// 	// const geometry = new THREE.BoxGeometry(1, 1, 1);

	// 	//CircleGeometry
	// 	// const geometry = new THREE.CircleGeometry(0.9, 16, 0, Math.PI);
	// 	//Math.PI는 180도를 의미함.
	// 	//Defuault : _(three o'clock position)_.
	// 	//시계방향으로 회전.

	// 	//ConeGeometry
	// 	// const geometry = new THREE.ConeGeometry(
	// 	// 	1,
	// 	// 	2,
	// 	// 	undefined,
	// 	// 	undefined,
	// 	// 	true,
	// 	// 	Math.PI * 0,
	// 	// 	Math.PI
	// 	// );

	// 	//CylinderGeometry
	// 	// const geometry = new THREE.CylinderGeometry(
	// 	// 	2,
	// 	// 	2,
	// 	// 	4,
	// 	// 	3,
	// 	// 	3,
	// 	// 	true,
	// 	// 	0,
	// 	// 	Math.PI
	// 	// );

	// 	//SphereGeometry
	// 	// const geometry = new THREE.SphereGeometry(
	// 	// 	0.5,
	// 	// 	16,
	// 	// 	16,
	// 	// 	0,
	// 	// 	Math.PI,
	// 	// 	0,
	// 	// 	Math.PI * 0.4
	// 	// );

	// 	//RingGeometry
	// 	// const geometry = new THREE.RingGeometry(0.3, 1, 7, 3, 0, Math.PI * 0.8);

	// 	//PlaneGeometry
	// 	// const geometry = new THREE.PlaneGeometry(2, 2, 2, 1);

	// 	//TorusGeometry
	// 	// const geometry = new THREE.TorusGeometry(1, 0.1, 24, 8, Math.PI * 1.5);

	// 	//TorusKnotGeometry
	// 	const geometry = new THREE.TorusKnotGeometry();

	// 	//지리정보 시스템, GIS에서 사용됨. 3차원 지형표현에 유용하게 사용되어짐.
	// 	const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
	// 	const cube = new THREE.Mesh(geometry, fillMaterial);

	// 	const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
	// 	const line = new THREE.LineSegments(
	// 		new THREE.WireframeGeometry(geometry),
	// 		//WireframeGeometry 모든 외곽선이
	// 		lineMaterial
	// 	);

	// 	const group = new THREE.Group();
	// 	group.add(cube);
	// 	group.add(line);
	// 	// const geometry = new THREE.BoxGeometry(1, 1, 1);
	// 	// const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
	// 	// const cube = new THREE.Mesh(geometry, material);

	// 	this._scene.add(group);
	// 	this._cube = group;
	// }
	/* custom geometry : square, heart*/
	// _setupModel() {
	// 	const shape = new THREE.Shape();
	// 	const x = -2.5,
	// 		y = -2.5;
	// 	shape.moveTo(x + 2.5, y + 2.5);
	// 	shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
	// 	shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
	// 	shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
	// 	shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
	// 	shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
	// 	shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

	// 	// shape.moveTo(1, 1);
	// 	// shape.lineTo(1, -1);
	// 	// shape.lineTo(-1, -1);
	// 	// shape.lineTo(-1, 1);
	// 	// shape.closePath();

	// 	const geometry = new THREE.ShapeGeometry(shape);

	// 	//지리정보 시스템, GIS에서 사용됨. 3차원 지형표현에 유용하게 사용되어짐.
	// 	const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
	// 	const cube = new THREE.Mesh(geometry, fillMaterial);

	// 	const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
	// 	const line = new THREE.LineSegments(
	// 		new THREE.WireframeGeometry(geometry),
	// 		//WireframeGeometry 모든 외곽선이
	// 		lineMaterial
	// 	);

	// 	const group = new THREE.Group();
	// 	group.add(cube);
	// 	group.add(line);

	// 	this._scene.add(group);
	// 	this._cube = group;
	// }
	/* custom geometry : curve*/
	// _setupModel() {
	// 	class CustomSinCurve extends THREE.Curve {
	// 		constructor(scale) {
	// 			super();
	// 			this.scale = scale;
	// 		}
	// 		getPoint(t) {
	// 			const tx = t * 3 - 1.5;
	// 			const ty = Math.sin(2 * Math.PI * t);
	// 			const tz = 0;
	// 			return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
	// 		}
	// 	}

	// 	const path = new CustomSinCurve(4);

	// 	const geometry = new THREE.BufferGeometry();
	// 	const points = path.getPoints(6);
	// 	geometry.setFromPoints(points);

	// 	const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
	// 	const line = new THREE.Line(geometry, material);

	// 	this._scene.add(line);
	// }
	/* custom geometry : curve mesh*/
	_setupModel() {}

	onResize() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time) {
		this._renderer.render(this._scene, this._camera);
		requestAnimationFrame(this.render.bind(this));
		this.update(time);
	}

	update(time) {
		time *= 0.001;
	}
}

window.onload = function () {
	new App();
	console.log("App 객체 생성");
};
