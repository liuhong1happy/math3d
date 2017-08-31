export default class Vector3 {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.data = { x, y, z, w };
    }
    get isVector3() {
        return !!this;
    }
    getData() {
        return this.data;
    }
    normalize() {
        if (this.length === 0) return this;
        return this.multiplyScalar(1 / this.length);
    }
    multiplyScalar(v) {
        const { x, y, z } = this.data;
        if (this.length === 0) return this;
        this.data = { x: x * v, y: y * v, z: z * v };
        return this;
    }
    get length() {
        const { x, y, z } = this.data;
        return Math.sqrt(x * x + y * y + z * z);
    }
    static get AxisX() {
        return new Vector3(1, 0, 0);
    }
    static get AxisY() {
        return new Vector3(0, 1, 0);
    }

    static get AxisZ() {
        return new Vector3(0, 0, 1);
    }
    setFromRotationMatrix(matrix) {
        const { m11, m12, m13, m21, m22, m23, m31, m32, m33 } = matrix.getData();
        const trace = m11 + m22 + m33;
        let s;
        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1.0);
            this.data.w = 0.25 / s;
            this.data.x = (m32 - m23) * s;
            this.data.y = (m13 - m31) * s;
            this.data.z = (m21 - m12) * s;
        } else if (m11 > m22 && m11 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this.data.w = (m32 - m23) / s;
            this.data.x = 0.25 * s;
            this.data.y = (m12 + m21) / s;
            this.data.z = (m13 + m31) / s;
        } else if (m22 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this.data.w = (m13 - m31) / s;
            this.data.x = (m12 + m21) / s;
            this.data.y = 0.25 * s;
            this.data.z = (m23 + m32) / s;
        } else {
            s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this.data.w = (m21 - m12) / s;
            this.data.x = (m13 + m31) / s;
            this.data.y = (m23 + m32) / s;
            this.data.z = 0.25 * s;
        }
        return this;
    }
}
