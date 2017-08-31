import Vector3 from './Vector3';
import Matrix4 from './Matrix4';

export default class Object3 {
    constructor() {
        this.position = new Vector3();
        this.matrix = new Matrix4();
        this.rotation = new Vector3();
    }

    get isObject3() {
        return !!this;
    }

    rotateAroundWorldAxis(axis, radians) {
        const rotationMatrix = new Matrix4();
        rotationMatrix.makeRotationAxis(axis.normalize(), radians);
        rotationMatrix.makeCrossProduct(this.matrix);
        this.matrix = rotationMatrix;
        this.rotation.setFromRotationMatrix(this.matrix);
        return this;
    }
}
