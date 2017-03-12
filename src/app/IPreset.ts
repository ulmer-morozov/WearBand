interface IPreset {
    symbol: string;
    rotation: THREE.Euler;

    stepRotation: THREE.Euler;
    rotationReverse: boolean;

    scaleStep: THREE.Vector3;
    scaleReverse: boolean;

    countInCircle: number;

    customStepAngle?: number;
    customLetterWidth?: number;
}
