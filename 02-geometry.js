import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';
import { FontLoader } from '../examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../examples/jsm/geometries/TextGeometry.js';

class App {
	constructor() {
		const divContainer = document.querySelector('#webgl-container')

		this._divConainer = divContainer;

		// antialias=true : 3D 모델의 계단 현상을지움
		const renderer = new THREE.WebGL1Renderer({antialias : true})
		renderer.setPixelRatio(window.devicePixelRatio); //
		divContainer.appendChild(renderer.domElement);

		this._renderer = renderer;

		const scene = new THREE.Scene();
		const axesHelper = new THREE.AxesHelper(5);
		scene.add(axesHelper);

		this._scene=scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();
		this._setupControls();

		window.onresize = this.resize.bind(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}

	_setupCamera() {
		const width = this._divConainer.clientWidth;
		const height = this._divConainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			100
		);

		camera.position.z = 15; // 2
		this._camera = camera;
	}

	_setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		this._scene.add(light);
	}

	async _setupModel() {

		// 1. basic geometrys
		// const geometry = new THREE.BoxGeometry(1,1,1);
		// const geometry = new THREE.CircleGeometry(1, 30, Math.PI*2, Math.PI/2);
		// const geometry = new THREE.ConeGeometry(1, 2, 16, 9, true, 0, Math.PI*2);
		// const geometry = new THREE.CylinderGeometry(.5,1,1,32,12,false, 0, Math.PI*2);
		// const geometry = new THREE.SphereGeometry(0.9, 32, 12, 0, Math.PI*2, 0, Math.PI/2);

		// const geometry = new THREE.RingGeometry();
		// const geometry = new THREE.PlaneGeometry();
		// const geometry = new THREE.TorusGeometry();
		// const geometry = new THREE.TorusKnotGeometry();

		// 2. shape
		// const shape = new THREE.Shape();
		// const x = -2.5;
		// const y = -5;
		// shape.moveTo(x+2.5, y+2.5);
		// shape.bezierCurveTo(x+2.5, y+2.5, x+2  , y    , x    , y    );
		// shape.bezierCurveTo(x-3  , y    , x-3  , y+3.5, x-3  , y+3.5);
		// shape.bezierCurveTo(x-3  , y+5.5, x-1.5, y+7.7, x+2.5, y+9.5);
		// shape.bezierCurveTo(x+6  , y+7.7, x+8  , y+4.5, x+8  , y+3.5);
		// shape.bezierCurveTo(x+8  , y+3.5, x+8  , y    , x+5  , y    );
		// shape.bezierCurveTo(x+3.5, y    , x+2.5, y+2.5, x+2.5, y+2.5);

		// const geometry = new THREE.ShapeGeometry(shape);


		// 3. tube
		// class CustomSinCurve extends THREE.Curve {
		// 	constructor(scale) {
		// 		super();
		// 		this.scale = scale;
		// 	}

		// 	getPoint(t) {
		// 		// 0 ~ 1까지 호출됨
		// 		console.log(t);
		// 		const tx = t * 3 - 1.5;
		// 		const ty = Math.sin(2 * Math.PI * t);
		// 		const tz = 0;
		// 		return new THREE.Vector3(tx,ty,tz).multiplyScalar(this.scale);
		// 	}
		// }

		// const path = new CustomSinCurve(4);
		// const geometry = new THREE.TubeGeometry(path);

		// 4. lathe
		// const points = [];
		// for(let i=0; i<10; ++i) {
		// 	points.push(new THREE.Vector2(
		// 		Math.sin(i*0.2)*3+3,
		// 		(i-5)*.8
		// 	));
		// }

		// const geometry = new THREE.LatheGeometry(points);

		// 5. Extrude
		// const shape = new THREE.Shape();
		// const x = -2.5;
		// const y = -5;
		// shape.moveTo(x+2.5, y+2.5);
		// shape.bezierCurveTo(x+2.5, y+2.5, x+2  , y    , x    , y    );
		// shape.bezierCurveTo(x-3  , y    , x-3  , y+3.5, x-3  , y+3.5);
		// shape.bezierCurveTo(x-3  , y+5.5, x-1.5, y+7.7, x+2.5, y+9.5);
		// shape.bezierCurveTo(x+6  , y+7.7, x+8  , y+4.5, x+8  , y+3.5);
		// shape.bezierCurveTo(x+8  , y+3.5, x+8  , y    , x+5  , y    );
		// shape.bezierCurveTo(x+3.5, y    , x+2.5, y+2.5, x+2.5, y+2.5);

		// const settings = {
		// 	step: 2,
		// 	depth: 4,
		// 	bevelEnabled: false, // bevel 처리 여부 (옆면)
		// 	bevelThickness: 1.6, // bevel 길이
		// 	bevelSize: 1.5, // 볼록한 정도=2
		// 	bevelSegments: 5, // bevel 단계수
		// }

		// const geometry = new THREE.ExtrudeGeometry(shape, settings);


		// 6. text
		const fontLoader = new FontLoader();
		async function loadFont(that) {
			const url = '../examples/fonts/helvetiker_regular.typeface.json';
			const font = await new Promise((resolve, reject) => {
				fontLoader.load(url, resolve, undefined, reject);
			});

			const geometry = new TextGeometry('my name taeksoo', {
				font: font,
				size: 5, // textmesh의 크기=100
				height: 1.5, // 깊이값=50
				curveSegments: 4, // 커브를 구성하는 정점의 개수=12
				// setting for ExtrudeGeometry
				bevelEnabled: true, // bevel 처리 여부
				bevelThickness: 0.7, // bevel 길이
				bevelSize: .7, // 볼록한 정도=2
				bevelSegments: 2, // bevel 단계수
			});

			return geometry;
		}

		const geometry = await loadFont(this);

		//
		const fillMaterial = new THREE.MeshPhongMaterial({color: 0x515151}); // Gray
		const cube = new THREE.Mesh(geometry, fillMaterial);

		const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00}); // Yellow

		const line = new THREE.LineSegments(
			new THREE.WireframeGeometry(geometry), lineMaterial
		)

		const group = new THREE.Group();
		group.add(cube);
		group.add(line);

		this._scene.add(group);
		this._cube = group;

	}

	__setupModel() {
		// rect
		// const shape = new THREE.Shape();
		// shape.moveTo(1,1); // 좌표이동
		// shape.lineTo(1,-1); // 좌표라인
		// shape.lineTo(-1,-1);
		// shape.lineTo(-1,1);
		// shape.closePath(); // 좌표 닫기

		// heart
		const shape = new THREE.Shape();
		const x = -2.5;
		const y = -5;
		shape.moveTo(x+2.5, y+2.5);
		shape.bezierCurveTo(x+2.5, y+2.5, x+2  , y    , x    , y    );
		shape.bezierCurveTo(x-3  , y    , x-3  , y+3.5, x-3  , y+3.5);
		shape.bezierCurveTo(x-3  , y+5.5, x-1.5, y+7.7, x+2.5, y+9.5);
		shape.bezierCurveTo(x+6  , y+7.7, x+8  , y+4.5, x+8  , y+3.5);
		shape.bezierCurveTo(x+8  , y+3.5, x+8  , y    , x+5  , y    );
		shape.bezierCurveTo(x+3.5, y    , x+2.5, y+2.5, x+2.5, y+2.5);

		const geometry = new THREE.BufferGeometry();
		const points = shape.getPoints();
		geometry.setFromPoints(points);

		const material = new THREE.LineBasicMaterial({color: 0xffff00});
		const line = new THREE.Line(geometry, material);

		this._scene.add(line);
	}

	___setupModel() {
		class CustomSinCurve extends THREE.Curve {
			constructor(scale) {
				super();
				this.scale = scale;
			}

			getPoint(t) {
				const tx = t * 3 - 1.5;
				const ty = Math.sin(2 * Math.PI * t);
				const tz = 0;
				return new THREE.Vector3(tx,ty,tz).multiplyScalar(this.scale);
			}
		}

		const path = new CustomSinCurve(4);

		const geomatry = new THREE.BufferGeometry();
		const points = path.getPoints(50); // 인자는 좌표의 개수
		geomatry.setFromPoints(points);

		const material = new THREE.LineBasicMaterial({color: 0xffff00});
		const line = new THREE.Line(geomatry, material);
		this._scene.add(line);
	}

	____setupModel() {
		const points = [];
		for(let i=0; i<10; ++i) {
			points.push(new THREE.Vector2(
				Math.sin(i*0.2)*3+3,
				(i-5)*.8
			));
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setFromPoints(points);

		const material = new THREE.LineBasicMaterial({color: 0xffff00});
		const line = new THREE.Line(geometry, material);

		this._scene.add(line);
	}

	_setupControls() {
		new OrbitControls(this._camera, this._divConainer);
	}

	resize() {
		const width = this._divConainer.clientWidth;
		const height = this._divConainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}

	update(time) {
		time *= 0.001 // second unit

		// this._cube.rotation.x = time;
		// this._cube.rotation.y = time;
	}
}

window.onload = function() {
	new App();
}
