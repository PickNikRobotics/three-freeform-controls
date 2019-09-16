import * as THREE from "three";
import Octahedron from "../../primitives/octahedron";
import { PickGroup } from "./index";

export default class Pick extends PickGroup {
  private readonly octahedron: Octahedron;

  constructor() {
    super();
    this.octahedron = new Octahedron("white");
    this.add(this.octahedron);
  }

  public getInteractiveObjects(): THREE.Mesh[] {
    return [this.octahedron];
  }
}
