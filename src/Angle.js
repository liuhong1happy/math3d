export const AngleMode = {
    DEGREE: 'degree',
    RADIAN: 'radian',
};

export default class Angle {
    constructor(v, mode = AngleMode.DEGREE) {
        this.set(v, mode);
    }
    set(v, mode = AngleMode) {
        switch (mode) {
        case AngleMode.DEGREE:
            {
                this.degree = v;
                this.radian = Angle.DegToRad(v);
            }
            break;
        case AngleMode.RADIAN:
            {
                this.degree = Angle.RadToDeg(v);
                this.radian = v;
            }
            break;
        default:
            break;
        }
        return this;
    }

    static DegToRad(deg) {
        return Math.PI * deg / 180;
    }
    static RadToDeg(rad) {
        return rad * 180 / Math.PI;
    }
}
