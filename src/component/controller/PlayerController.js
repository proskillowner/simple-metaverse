import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PlayerMoveController from "./PlayerMoveController";
import PlayerInputController from "./PlayerInputController";

class PlayerController {
	constructor() {
		const playerInputController = new PlayerInputController((keys) => {
			let moveState;
			if (keys.forward) {
				if (keys.shift) {
					moveState = PlayerMoveController.MoveState.run;
				} else {
					moveState = PlayerMoveController.MoveState.walk;
				}
			} else {
				moveState = PlayerMoveController.MoveState.idle;
			}

			this.playerMoveController.setMoveState(moveState);

			if (keys.left) {
				this.playerMoveController.rotateState = PlayerMoveController.RotateState.left;
			} else if (keys.right) {
				this.playerMoveController.rotateState = PlayerMoveController.RotateState.right;
			} else {
				this.playerMoveController.rotateState = PlayerMoveController.RotateState.none;
			}
		});

		const loader = new GLTFLoader();
		loader.load(
			"models/bot.glb",
			(gltf) => {
				this.playerMoveController = new PlayerMoveController(gltf);
				this.onPlayerCreate();
			},
			(xhr) => {
				console.log(xhr.loaded + "/" + xhr.total);
			},
			(error) => {
				console.log(error);
			},
		);
	}

	update(deltaTime) {
		this.playerMoveController.update(deltaTime);
	}

	getModel() {
		return this.playerMoveController.model;
	}
}

export default PlayerController;