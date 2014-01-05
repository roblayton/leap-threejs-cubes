define(['proj/FallingCubeManager', 'core/utils/Mapper', 'threejs', 'TweenMax', 'Leap'], function(FallingCubeManager, Mapper) {
	var ThreeController = function(container, options) {
		options = options || {};
		var self = this;
		var callback = options.callbacks.onRender;

		// Scene
		var scene = new THREE.Scene();
		// ------

		// Camera
		var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.lookAt(scene.position);
		camera.position.set(0, 0, 290);

		var startFrame = null;
		var camRadius = 290;
		var rotateY = 90;
		var rotateX = 0;
		var curY = 0;
		var fov = camera.fov;

		var active = false;
		// ------
        
		// Renderer
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);
		// ------

		// Canvas
		var canvas = container.getElementsByTagName('canvas')[0];
		var width = canvas.width;
		var height = canvas.height;

		// Cubes
		var fcm = new FallingCubeManager(scene, {
			count: 80,
			spacing: 20,
			width: 10,
			height: 10,
			depth: 10,
            color: 0x333333
		});

		var light = new THREE.AmbientLight(0x333333);
        light.color.setHSL(0.1, 0.5, 0.3);
		scene.add(light);

		light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
		scene.add(light);

        light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set( - 1, - 1, - 1).normalize();

        light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 500, 0);
        light.castShadow = true;
        light.shadowMapWidth = 2048;
        light.shadowMapHeight = 2048;
        var d = 200;
        light.shadowCameraLeft = - d;
        light.shadowCameraRight = d;
        light.shadowCameraTop = d * 2;
        light.shadowCameraBottom = - d * 2;

        light.shadowCameraNear = 100;
        light.shadowCameraFar = 600;
                //light.shadowCameraVisible = true;
        //
		Leap.loop(function(frame) {
			if (frame.valid) {
				//if (!startFrame) {
				//startFrame = frame;
				//}
				if (!active) {

					fcm.update();

					if (frame.hands.length > 0 && frame.pointables.length <= 1) {
						startFrame = frame;
						active = true;
					}

				} else {
					var t = startFrame.translation(frame);

					// Limit y-axis betwee 0 and 180 degrees
					curY = Mapper.map(t[1], - 300, 300, 0, 179);

					// Assign rotation coordinates
					rotateX = t[0];
					rotateY = - curY;

					var zoom = Math.max(0, t[2] + 200);
					var zoomFactor = 1 / (1 + (zoom / 150));
					// Adjust 3D spherical coordinates of the camera
					var newX = camRadius * Math.sin(rotateY * Math.PI / 180) * Math.cos(rotateX * Math.PI / 180);
					var newZ = camRadius * Math.sin(rotateY * Math.PI / 180) * Math.sin(rotateX * Math.PI / 180);
					var newY = camRadius * Math.cos(rotateY * Math.PI / 180);

					TweenMax.to(camera.position, 1, {
						x: newX,
						y: newY,
						z: newZ
					});
					//TweenMax.to(light.position, 1, {x: newX, y: newY, z: newZ});
					camera.fov = fov * zoomFactor;
					if (frame.hands.length ==- 0 || frame.pointables.length > 1) {
						active = false;
					}
				}
			}

			camera.updateProjectionMatrix();
			camera.lookAt(scene.position);
			renderer.render(scene, camera);

			if (callback) {
				callback();
			}
		});

		// Update
		var update = function() {
			//indexFinger[0].rotation.z += 0.1;
		};

		//this.render = function() {
		//requestAnimationFrame(self.render);
		//renderer.render(scene, camera);
		//update();
		//if (callback) {
		//callback();
		//}
		//};
	};

	return ThreeController;
});

