define(function() {
    var FallingCube = function(scene, options) {
        var self = this;
        
        var speed = Math.random() * 0.5;
        this.isFalling = true;

        var spacing = options.spacing;
        var geometry = new THREE.CubeGeometry(options.width, options.height, options.depth);
        var material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = Math.random() * (spacing * (spacing / 2)) - (spacing * (spacing / 4));
        this.mesh.position.y = Math.random() * (spacing * (spacing / 2)) - (spacing * (spacing / 4));
        this.mesh.position.z = Math.random() * (spacing * (spacing / 2)) - (spacing * (spacing / 4));
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        scene.add(this.mesh);

        var fall = function() {
            if (self.mesh.position.y < -200) {
                self.mesh.position.y = 200;
            } else {
                self.mesh.position.y-= speed;
            }
        };

        var reset = function() {
        };

        this.update = function() {
            if (self.isFalling) {
                fall();
            }
        };
    };

    return FallingCube;
});
