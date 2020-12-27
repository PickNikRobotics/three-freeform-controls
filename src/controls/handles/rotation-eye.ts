import * as THREE from "three";
import Rotation from "./rotation";
import { DEFAULT_COLOR_RING, DEFAULT_RING_RADIUS } from "../../utils/constants";

/**
 * @hidden
 */
export default class RotationEye extends Rotation {
  public camera: THREE.Camera | null = null;
  private controlsWorldOrientation = new THREE.Quaternion();
  private _temp1 = new THREE.Vector3();
  private _temp2 = new THREE.Vector3();
  private _temp3 = new THREE.Quaternion();
  private worldPosition = new THREE.Vector3();

  constructor(color = DEFAULT_COLOR_RING, radius = DEFAULT_RING_RADIUS) {
    super(color, radius);
  }

  updateMatrixWorld(force?: boolean): void {
    if (this.camera !== null) {
      this.parent?.matrixWorld.decompose(this._temp1, this.controlsWorldOrientation, this._temp2);
      this.matrixWorld.decompose(this.worldPosition, this._temp3, this._temp2);
      this.camera
        .getWorldQuaternion(this.quaternion)
        .premultiply(this.controlsWorldOrientation.invert());
      this.camera.getWorldPosition(this.up).sub(this.worldPosition);
    }
    super.updateMatrixWorld(force);
  }
}
