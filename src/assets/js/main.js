require(['core/utils/FpsTracker', 'dom/primitives/Container', 'proj/ThreeController', 'threejs'], function(FpsTracker, Container, ThreeController) {
	var Master = function() {

		var container, controller, fps;

        var cube;
		var init = function() {
			// Fps
			fps = new FpsTracker();

			container = new Container({
				insert: {
					type: 'parent',
					target: document.body
				}
			});

			controller = new ThreeController(container.el, {
				callbacks: {
					onRender: function() {
						fps.update();
					}
				}
			});

            // Call render
            controller.render();
		};

		init();

	}; // End
	var master = new Master();
});

