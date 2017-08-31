export default class Matrix4 {
    constructor(
        m11 = 1, m12 = 0, m13 = 0, m14 = 0,
        m21 = 0, m22 = 1, m23 = 0, m24 = 0,
        m31 = 0, m32 = 0, m33 = 1, m34 = 0,
        m41 = 0, m42 = 0, m43 = 0, m44 = 1,
    ) {
        this.data = { m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44 };
    }

    get isMatrix4() { return !!this; }

    setData(
        m11 = 1, m12 = 0, m13 = 0, m14 = 0,
        m21 = 0, m22 = 1, m23 = 0, m24 = 0,
        m31 = 0, m32 = 0, m33 = 1, m34 = 0,
        m41 = 0, m42 = 0, m43 = 0, m44 = 1,
    ) {
        this.data = { m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44 };
    }

    getData() {
        return this.data;
    }

    clone() {
        const { m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44 } = this.data;
        return new Matrix4(
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        );
    }

    identity() {
        this.data = new Matrix4().getData();
        return this;
    }

    static get Identity() {
        return new Matrix4();
    }

    static Translation(x, y, z) {
        return new Matrix4(
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1,
        );
    }

    static RotationX(theta) {
        const c = Math.cos(theta);
        const s = Math.sin(theta);

        return new Matrix4(
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1,
        );
    }

    static RotationY(theta) {
        const c = Math.cos(theta);
        const s = Math.sin(theta);

        return new Matrix4(
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1,
        );
    }

    static RotationZ(theta) {
        const c = Math.cos(theta);
        const s = Math.sin(theta);

        return new Matrix4(
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1,
        );
    }

    static RotationAxis(axis, theta) {
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        const t = 1 - c;
        const { x, y, z } = axis.getData();
        const tx = t * x;
        const ty = t * y;

        return new Matrix4(
            tx * x + c, tx * y - s * z, tx * z + s * y, 0,
            tx * y + s * z, ty * y + c, ty * z - s * x, 0,
            tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
            0, 0, 0, 1,
        );
    }

    makeRotationX(theta) {
        this.data = Matrix4.RotationX(theta).getData();
        return this;
    }
    makeRotationY(theta) {
        this.data = Matrix4.RotationY(theta).getData();
        return this;
    }
    makeRotationZ(theta) {
        this.data = Matrix4.RotationZ(theta).getData();
        return this;
    }
    makeRotationAxis(axis, theta) {
        this.data = Matrix4.RotationAxis(axis, theta).getData();
        return this;
    }
    makeTranslation(x, y, z) {
        this.data = Matrix4.Translation(x, y, z).getData();
        return this;
    }
    toArray() {
        const { m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44 } = this.data;
        return [m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44];
    }
    toString() {
        const { m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44 } = this.data;
        return `(${m11}, ${m12}, ${m13}, ${m14}, ${m21}, ${m22}, ${m23}, ${m24}, ${m31}, ${m32}, ${m33}, ${m34}, ${m41}, ${m42}, ${m43}, ${m44})`;
    }

    static CrossProduct(a, b) {
        const { m11: l11, m12: l12, m13: l13, m14: l14, m21: l21, m22: l22, m23: l23, m24: l24, m31: l31, m32: l32, m33: l33, m34: l34, m41: l41, m42: l42, m43: l43, m44: l44 } = a.getData();
        const { m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44 } = b.getData();
        return new Matrix4(
            l11 * m11 + l12 * m21 + l13 * m31 + l14 * m41, l21 * m11 + l22 * m21 + l23 * m31 + l24 * m41, l31 * m11 + l32 * m21 + l33 * m31 + l34 * m41, l41 * m11 + l42 * m21 + l43 * m31 + l44 * m41,
            l11 * m12 + l12 * m22 + l13 * m32 + l14 * m42, l21 * m12 + l22 * m22 + l23 * m32 + l24 * m42, l31 * m12 + l32 * m22 + l33 * m32 + l34 * m42, l41 * m12 + l42 * m22 + l43 * m32 + l44 * m42,
            l11 * m13 + l12 * m23 + l13 * m33 + l14 * m43, l21 * m13 + l22 * m23 + l23 * m33 + l24 * m43, l31 * m13 + l32 * m23 + l33 * m33 + l34 * m43, l41 * m13 + l42 * m23 + l43 * m33 + l44 * m43,
            l11 * m14 + l12 * m24 + l13 * m34 + l14 * m44, l21 * m14 + l22 * m24 + l23 * m34 + l24 * m44, l31 * m14 + l32 * m24 + l33 * m34 + l34 * m44, l41 * m14 + l42 * m24 + l43 * m34 + l44 * m44,
        );
    }

    makeCrossProduct(b) {
        this.data = Matrix4.CrossProduct(this, b).getData();
        return this;
    }
}
