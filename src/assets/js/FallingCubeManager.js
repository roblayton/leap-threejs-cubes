define(['proj/FallingCube'], function(FallingCube) {
    var FallingCubeManager = function(scene, options) {
		var cubes = [];

        var count = options.count;
		for (var i = 0, len = count; i < len; i++) {

            var fc = new FallingCube(scene, {
                width: options.width,
                height: options.height,
                depth: options.depth,
                color: options.color,
                spacing: options.spacing
            });

			cubes.push(fc);
		}

        this.update = function() {
            for (var i = 0, len = cubes.length; i < len; i++) {
                cubes[i].update();
            }
        };

    };

    return FallingCubeManager;
});
