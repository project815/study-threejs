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
		camera.position.z = 2;
		this._camera = camera;
	}
	_setupLight() {
		const color = 0xffffff;
		const infensity = 1;
		const light = new THREE.DirectionalLight(color, infensity);
		light.position.set(-1, 2, 4);
		this._scene.add(light);
	}

	_setupModel() {
		const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
		const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
		const cube = new THREE.Mesh(geometry, fillMaterial);

		const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
		const line = new THREE.LineSegments(
			new THREE.WireframeGeometry(geometry),
			//WireframeGeometry 모든 외곽선이
			lineMaterial
		);

		const group = new THREE.Group();
		group.add(cube);
		group.add(line);
		// const geometry = new THREE.BoxGeometry(1, 1, 1);
		// const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
		// const cube = new THREE.Mesh(geometry, material);

		this._scene.add(group);
		this._cube = group;
	}
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
