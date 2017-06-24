import {
  Mesh,
  SphereBufferGeometry,
  SphereGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

/**
 * @class Sphere
 * @category components/meshes
 * @description Sphere class is used to create sphere objects by its radius property and other values that determines its detality.
 * <br/><br/>
 * It is similar to THREE.SphereGeometry, but it also contains all `Shape` properties, such as material, mass and vectors like position (pos) and rotation (rot).
 * <br/><br/>
 * Then it creates an `Three.js mesh` or a `Physijs mesh`, that is similar to `Three.js mesh`, but it also take into consideration collision calculations.
 * This mesh is a combination of `Three.js geometry` and `Physijs material` (The same as in three.js, but with friction and restitution).
 * @param {Object} [params] - The params.
 * @extends MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Creating a Sphere, and adding it to app</caption>
 * new Sphere({
 *   geometry: {
 *     radius: 2
 *   },
 *
 *   material: new THREE.MeshBasicMaterial({
 *     color: 0xffffff
 *   }),
 *
 *   position: {
 *     y: 100
 *   }
 * }).addTo(app);
 */
class Sphere extends MeshComponent {
  /**
   * Default values for parameters
   * @member {Object} module:components/meshes.Sphere#defaults
   * @static
   * @default <pre>
   * {
   *   geometry: {
   *     radius: 1,
   *     widthSegments: 8,
   *     heightSegments: 6
   * }
   * </pre>
   */
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      radius: 1,
      widthSegments: 8,
      heightSegments: 6
    }
  };

  /**
   * Instructions
   * @member {Object} module:components/meshes.Sphere#instructions
   * @static
   * @default <pre>
   * {
   *   geometry: ['radius', 'widthSegments', 'heightSegments']
   * }
   * </pre>
   */
  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['radius', 'widthSegments', 'heightSegments']
  };

  constructor(params = {}) {
    super(params, Sphere.defaults, Sphere.instructions);
  }

  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer ? SphereBufferGeometry : SphereGeometry;

    const geometry = new GConstruct(
      params.geometry.radius,
      params.geometry.widthSegments,
      params.geometry.heightSegments
    );

    return geometry;
  }
}

export {
  Sphere
};
