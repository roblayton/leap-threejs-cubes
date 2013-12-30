define(function() {
	var ThreeController = function(container, options) {
        options = options || {};
        var self = this;
		var scene, camera, renderer, indexA, indexB, indexC;
        var callback = options.callbacks.onRender;

		// Scene
		scene = new THREE.Scene();
		// ------

        // Camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 5;
		// ------

        // Renderer
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
		// ------

        // Stuff
        // Index finger
        var indexFingerData = [
            {
                width: 1,
                height: 2,
                depth: 1,
                color: 0xff0000,
                x: 0
            }
        ];

        var indexFinger = [];

        for (var i = 0, len = indexFingerData.length; i < len; i++) {
            var geometry = new THREE.CubeGeometry(indexFingerData[i].width, indexFingerData[i].height, indexFingerData[i].depth);
            var material = new THREE.MeshBasicMaterial({
                color: indexFingerData[i].color
            });

            var mesh = new THREE.Mesh(geometry, material);
            //mesh.rotation.z = (Math.PI / 180) * 90;
            mesh.position.x = indexFingerData[i].x;
            scene.add(mesh);

            indexFinger.push(mesh);
        }
        // ------
        
        // Update
        var update = function() {
            //indexFinger[0].rotation.z += 0.1;
        };

        this.render = function() {
            requestAnimationFrame(self.render);
            renderer.render(scene, camera);

            update();

            if (callback) {
                callback();
            }
        };

	};

	return ThreeController;
});

