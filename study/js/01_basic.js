import * as THREE from "../../build/three.module.js";

class App {
	constructor() {
		const divContainer = document.querySelector("#webgl-container");
		//Id가 webgl-container인 태그를 찾아서 divContainer에 저장
		this._divContainer = divContainer;
		//divContainer를 클래스의 필드로 정의.
		//Why? divContainer를 this._divContainer로 정의하면 다른 메소드에서 참조할 수 있도록 하기 위함.

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		//Renderer객체는 THREE.js의 WebGLRenderer라는 클래스로 생성.
		//생성할 때 다양한 옵션을 설정할 수 있음.
		/* *ainialias: true는 부드러운 렌더링을 위한 옵션.*/

		renderer.setPixelRatio(window.devicePixelRatio);
		//setPixelRatio()는 렌더링할 때 사용할 해상도 비율을 설정.
		divContainer.appendChild(renderer.domElement);
		//renderer.domElement는 렌더러가 렌더링한 결과물을 담고 있는 canvas 엘리먼트.
		//appendChild()는 divContainer에 renderer.domElement를 추가.
		this._renderer = renderer;
		//Why? renderer를 this._renderer 정의하면 다른 메소드에서 참조할 수 있도록 하기 위함.

		const scene = new THREE.Scene();
		this._scene = scene;
		//Why? scene를 this._scene 정의하면 다른 메소드에서 참조할 수 있도록 하기 위함.

		this._setupCamera();
		this._setupLight();
		this._setupObject();
		//다음 세 개는 정의해야 함.

		/* 밑줄? (ex. _setupCamre)가 쓰이는 이유? 클래스 내부에서만 사용되는 private field, private method라는 의미 
        즉, 클래스 외부에서는 해당 필드와 메소드에 접근할 수 없음.*/
		window.onresize = this.onResize.bind(this);
		//resize 이벤트가 필요한 이유는 renderer나 카메라의 크기가 변경될 때마다 그 크기에 맞게 속성값을 재설정해야 하기 떄문.
		//resize.bind 를 사용하는 이유는?  this가 가리키는 객체가 이벤트 객체가 아닌 App 객체가 되도록 하기 위함.
		this.onResize();
		//resize method에서 상관없이 생성자에서 한 번 실행함. -> renderer, camera의 크기를 설정하기 위함.

		requestAnimationFrame(this.render.bind(this));
		//render method를 requestAnimationFrame api에 넘겨준다. 3D 공간을 렌더링하기 위함.
		//render method 실제 3차원 그래픽 장면을 만들어주는 method임.
		//render method를 bind를 통해 넘겨준 이유는? this가 가리키는 객체가 이벤트 객체가 아닌 App 객체가 되도록 하기 위함.

		/*
        this._setupCamera();
		this._setupLight();
		this._setupObject();

        this._onResize.bind(this);
        (this.render.bind(this));
       */
		//호출만 하고 정의하지 않은 목록
		console.log("생성자 호출");
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

	_setupObject() {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
		const cube = new THREE.Mesh(geometry, material);

		this._scene.add(cube);
		this._cube = cube;
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
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
		//이 코드를 통해 Render method가 반복적으로 호출되도록 함.
	}

	update(time) {
		time *= 0.001;
		this._cube.rotation.x = time;
		this._cube.rotation.y = time;
	}
}

window.onload = function () {
	new App();
	console.log("App 객체 생성");
};
