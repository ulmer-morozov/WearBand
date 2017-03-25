import { Component, ViewChild, ElementRef} from '@angular/core';

import * as THREE from 'three';
// import {DefaultPresets} from './DefaultPresets';
import { OrbitControls } from 'three-orbitcontrols-ts';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('canvas') canvasRef: ElementRef;
    canvas: HTMLCanvasElement;

    private lettersText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890$&#@";

    private randomizeState = "randomizeState";
    private presentationState = "presentationState";
    private rotateState = "rotateState";
    private materialState = "materialState";
    private growState = "growState";
    private populationState = "populationState";
    private chooseLetterState = "chooseLetterState";

    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;

    private bandObject: THREE.Object3D;
    private font: THREE.Font;

    private wallMaterial: THREE.Material;
    private floorMaterial: THREE.Material;
    private stuffMaterial: THREE.Material;
    private bandLeterMaterial: THREE.MeshStandardMaterial;
    private normalMaterial = new THREE.MeshNormalMaterial();

    private radius = 150;

    private currentPresetIndex = 0;
    private presets: IPreset[];

    private showHelpers: boolean;
    private changePresetPromise: Promise<void>;

    public currentState: string;
    public preset: IPreset
    public savedPreset: IPreset
    public letters: string[];
    public colors: string[];

    public rotation: THREE.Vector3;
    public stepRotation: THREE.Vector3;

    constructor() {
        this.colors = ["#E5C100", "#8A2BE2", "#FF69B4", "#2f4f4f", "#bebebe"];

        //начальные значения
        this.presets = this.getPresets();

        this.letters = Array.from(this.lettersText);
        this.showHelpers = true;
        this.currentPresetIndex = 7;
        this.preset = this.preset = this.clonePreset(this.presets[this.currentPresetIndex]);
        this.savedPreset = this.clonePreset(this.preset);
        this.currentState = this.presentationState;

        this.updateCurrentPresetAngles();
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement;
        this.init();
    }

    nextPreset = (): void => {
        this.currentPresetIndex++;
        this.currentPresetIndex = this.currentPresetIndex % this.presets.length;
        let selectedPreset = this.presets[this.currentPresetIndex];
        this.copyPreset(selectedPreset, this.preset);
        this.redrawBand();
    }

    restorePreset = (): void => {
        this.copyPreset(this.savedPreset, this.preset);
        this.redrawBand();
        this.setDefaultState();
    }

    updateCurrentPresetAngles = (): void => {
        this.rotation = new THREE.Vector3
            (
            this.toDegree(this.preset.rotation.x),
            this.toDegree(this.preset.rotation.y),
            this.toDegree(this.preset.rotation.z)
            );
        this.stepRotation = new THREE.Vector3
            (
            this.toDegree(this.preset.stepRotation.x),
            this.toDegree(this.preset.stepRotation.y),
            this.toDegree(this.preset.stepRotation.z)
            );
    }

    init = (): void => {
        let enableViewLimitations = false;
        let showHelpers = false;

        let width = window.innerWidth;
        let height = window.innerHeight;

        this.scene = new THREE.Scene();

        if (showHelpers) {
            this.scene.add(new THREE.AxisHelper(50));
        }

        let zoom = window.devicePixelRatio;
        let ratio = width / height;

        this.camera = new THREE.PerspectiveCamera(25, ratio, 1, 5000);
        this.camera.position.set(0, 0, 1200);

        this.renderer = new THREE.WebGLRenderer
            ({
                antialias: true,
                alpha: true,
                // clearAlpha: 0.5,
                canvas: this.canvas
            });

        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.setSize(zoom * width, zoom * height, false);
        // this.renderer.setClearColor(0xfafafa, 1);

        // this.renderer.gammaInput = true;
        // this.renderer.gammaOutput = true;

        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMapDebug = true;

        // renderer.shadowMapSoft = true;
        // this.renderer.shadowMap.type = THREE.PCFShadowMap;

        // Управление мышкой
        this.controls = new OrbitControls(this.camera, this.canvas);

        if (enableViewLimitations) {
            // this.controls.enableZoom = false;
            // this.controls.enablePan = false;
            // this.controls.minPolarAngle = Math.PI / 2 - 2 * Math.PI / 2;
            // this.controls.maxPolarAngle = Math.PI / 2 + 2 * Math.PI / 2;
            // this.controls.minAzimuthAngle = - 2 * Math.PI / 2;
            // this.controls.maxAzimuthAngle = + 2 * Math.PI / 2;
        }

        //load fonts
        var loader = new THREE.FontLoader();

        loader.load('./assets/fonts/Hanken_Book.json', (response: any): void => {
            this.font = response;

            var urls = [
                'assets/images/cubemap/right.png',
                'assets/images/cubemap/left.png',
                'assets/images/cubemap/top.png',
                'assets/images/cubemap/bottom.png',
                'assets/images/cubemap/front.png',
                'assets/images/cubemap/back.png'
            ];

            var textureCube = new THREE.CubeTextureLoader().load(urls, (cubeTexture) => {

                this.bandLeterMaterial = new THREE.MeshStandardMaterial({
                    color: 0xE5C100,
                    envMap: cubeTexture,
                    metalness: 1,
                    roughness: 0.5
                });

                this.bandLeterMaterial.shading = THREE.SmoothShading;
                this.loadingFinished();
            });


        });

        let wallColor = 0xffffff;

        this.wallMaterial = new THREE.MeshPhongMaterial({
            color: wallColor,
            reflectivity: 0,
            // specular: 0xFF0000,
            shininess: 1
        });

        const wallThickess = 10;
        const wallSideWidth = 4000;

        const halfSideWidth = wallSideWidth / 2;
        const halfSideThickness = wallThickess / 2;

        let spotLight = new THREE.SpotLight(0xffffff);
        spotLight.intensity = 0.4;
        spotLight.position.set(5, 5, 800);
        spotLight.penumbra = 1;
        spotLight.castShadow = false;
        spotLight.shadow.bias = 0.0001;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        this.scene.add(spotLight);

        if (showHelpers) {
            spotLight.add(new THREE.SpotLightHelper(spotLight));
        }

        let pointLigh2 = new THREE.PointLight(0xffffff, 1.5);
        pointLigh2.matrixAutoUpdate = true;
        pointLigh2.castShadow = false;
        pointLigh2.position.set(-400, 0, 0);
        // pointLigh2.rotation.set(-Math.PI / 16, -Math.PI - 1 * Math.PI / 2, 0);
        this.scene.add(pointLigh2)

        if (showHelpers) {
            pointLigh2.add(new THREE.PointLightHelper(pointLigh2, 3));
        }

        let pointLight = new THREE.PointLight(0xffffff);
        pointLight.intensity = 0.9;
        pointLight.position.set(5, 5, 50);
        // pointLight.castShadow = true;
        // spotLight.shadow.bias = 0.0001;
        // spotLight.shadow.mapSize.width = 2048;
        // spotLight.shadow.mapSize.height = 2048;

        // this.scene.add(pointLight);

        if (showHelpers) {
            pointLight.add(new THREE.PointLightHelper(pointLight, 3));
        }
    }

    loadingFinished = () => {
        let normalMaterial = new THREE.MeshNormalMaterial();
        let wireframeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });

        // let cilinderG = new THREE.CylinderGeometry(this.radius, this.radius, 20, 20);
        // let cilinderMesh = new THREE.Mesh(cilinderG, wireframeMaterial);
        // cilinderMesh.rotation.x += Math.PI / 2;

        // this.scene.add(cilinderMesh);
        // this.camera.lookAt(cilinderMesh.position);

        // this.drawBand("R", this.preset, new THREE.Vector3(-100, 0, 400));
        // this.drawBand("E", this.preset, new THREE.Vector3(-50, 0, 200));

        this.redrawBand();
        this.render();
    }

    redrawBand = (badQuality: boolean = false): void => {
        if (this.bandObject)
            this.scene.remove(this.bandObject);

        this.bandObject = this.drawBand(this.preset.symbol, this.preset, new THREE.Vector3(0, 0, 0), badQuality);
    }

    drawBand = (symbol: string, preset: IPreset, meshCenter: THREE.Vector3, badQuality: boolean = false): THREE.Object3D => {
        const maxAngle = 2 * Math.PI;

        let angleStep;
        let bandGroup = new THREE.Group();
        let singleGeometry = new THREE.Geometry();


        var geo = new THREE.TorusGeometry(this.radius - 20, 6, 6, 20, 2 * Math.PI);
        var mesh = new THREE.Mesh(geo, this.bandLeterMaterial);
        // bandGroup.add(mesh);

        if (preset.customStepAngle != undefined) {
            angleStep = preset.customStepAngle;
        } else {
            angleStep = maxAngle / preset.countInCircle;
        }

        let letter = this.createLetter(symbol, badQuality);
        letter.rotation.set(preset.rotation.x, preset.rotation.y, preset.rotation.z);

        let letterWidth;

        if (preset.customLetterWidth != undefined && preset.customLetterWidth != 0) {
            //посчитаем габариты
            letterWidth = preset.customLetterWidth
        } else {
            letterWidth = 2 * this.radius * Math.tan(angleStep / 2);
        }

        let bbox = new THREE.Box3().setFromObject(letter);
        let scaleKoef = letterWidth / bbox.getSize().x;

        letter.scale.set(scaleKoef, scaleKoef, scaleKoef);

        // let letBBoxMesh = new THREE.BoxHelper(letter);
        // this.scene.add(letBBoxMesh);

        var additionalRotation = new THREE.Euler();
        var additionalScale = new THREE.Vector3();

        for (let angle = 0; angle <= maxAngle; angle += angleStep) {
            let letter = this.createLetter(symbol, badQuality);
            let secondPartGeneration = angle > maxAngle / 2;

            let positionX = (this.radius) * Math.cos(angle) + meshCenter.x;
            let positionY = (this.radius) * Math.sin(angle) + meshCenter.y;
            let positionZ = meshCenter.z;

            let rotationX = preset.rotation.x + additionalRotation.x;
            let rotationY = preset.rotation.y + additionalRotation.y;
            let rotationZ = preset.rotation.z + additionalRotation.z + angle - Math.PI / 2;

            let scaleX = scaleKoef + additionalScale.x;
            let scaleY = scaleKoef + additionalScale.y;
            let scaleZ = scaleKoef + additionalScale.z;

            letter.position.set(positionX, positionY, positionZ);
            letter.rotation.set(rotationX, rotationY, rotationZ);
            letter.scale.set(scaleX, scaleY, scaleZ);

            let scaleSign = preset.scaleReverse && secondPartGeneration ? -1 : 1;
            let rotationSign = preset.rotationReverse && secondPartGeneration ? -1 : 1;

            additionalRotation.set
                (
                additionalRotation.x + rotationSign * preset.stepRotation.x,
                additionalRotation.y + rotationSign * preset.stepRotation.y,
                additionalRotation.z + rotationSign * preset.stepRotation.z,
            );

            additionalScale.set
                (
                additionalScale.x + scaleSign * preset.scaleStep.x,
                additionalScale.y + scaleSign * preset.scaleStep.y,
                additionalScale.z + scaleSign * preset.scaleStep.z,
            );

            // angle -= scaleSign * 2*preset.scaleStep.x;

            letter.updateMatrix(); // as needed
            singleGeometry.merge(letter.geometry as THREE.Geometry, letter.matrix);

            // bandGroup.add(letter);
        }

        var mesh = new THREE.Mesh(singleGeometry, this.bandLeterMaterial);
        this.scene.add(mesh);

        // this.scene.add(bandGroup);
        return mesh;
    }

    createLetter = (symbol: string, badQuality: boolean): THREE.Mesh => {
        let parameters: THREE.TextGeometryParameters = {
            font: this.font,
            size: 50,
            height: 15,
            curveSegments: 5,
            bevelThickness: 5,
            bevelSize: 3,
            bevelEnabled: true
        };

        let textGeo = new THREE.TextGeometry(symbol, parameters);
        textGeo.center();

        let textMaterial: THREE.Material;

        if (badQuality) {
            textMaterial = this.normalMaterial;
        } else {
            textMaterial = this.bandLeterMaterial;
        }
        let textGeoMesh = new THREE.Mesh(textGeo, textMaterial);

        // textGeoMesh.castShadow = true;
        return textGeoMesh;
    }

    render = (): void => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render);
    }

    setState = (newState: string): void => {
        this.currentState = newState;

        switch (newState) {
            case this.randomizeState:
                //сохраним презет
                this.copyPreset(this.preset, this.savedPreset);
                return;

            case this.rotateState:
                //обновим UI
                // this.updateCurrentPresetAngles();
                return;

        }
    }

    setDefaultState = (): void => {
        this.setState(this.presentationState);
    }

    setSymbol = (symbol: string): void => {
        this.preset.symbol = symbol;
        this.redrawBand();
        this.setDefaultState();
    }

    setMaterial = (color: string): void => {
        this.bandLeterMaterial.color = new THREE.Color(color);
        this.redrawBand();
        this.setDefaultState();
    }

    onPopulationChange = (newValue: number): void => {
        this.preset.countInCircle = newValue;
        this.preset.customLetterWidth = 0;
        this.redrawBand();
    }

    onLetterWidthChange = (newValue: number): void => {
        this.preset.customLetterWidth = newValue;
        this.redrawBand();
    }

    onRotationChange = (): void => {
        this.preset.rotation.x = this.toRadians(this.rotation.x);
        this.preset.rotation.y = this.toRadians(this.rotation.y);
        this.preset.rotation.z = this.toRadians(this.rotation.z);
        this.redrawBand();
    }

    onStepRotationChange = (): void => {
        this.preset.stepRotation.x = this.toRadians(this.stepRotation.x);
        this.preset.stepRotation.y = this.toRadians(this.stepRotation.y);
        this.preset.stepRotation.z = this.toRadians(this.stepRotation.z);
        this.redrawBand();
    }

    onGrowChange = (newValue: number): void => {
        this.preset.scaleStep.x = newValue;
        this.preset.scaleStep.y = newValue;
        this.redrawBand();
    }

    toRadians = (degreeValue: number): number => {
        let result = Math.PI * degreeValue / 180;
        return result;
    }

    toDegree = (radianValue: number): number => {
        let result = Math.round(180 * radianValue / Math.PI);
        return result;
    }

    clonePreset = (sourcePreset: IPreset): IPreset => {
        let newPreset = {
            symbol: "A",
            rotation: new THREE.Euler(),
            stepRotation: new THREE.Euler(),
            rotationReverse: false,
            scaleStep: new THREE.Vector3(),
            scaleReverse: false,
            countInCircle: 64,
            customStepAngle: undefined,
            customLetterWidth: sourcePreset.customLetterWidth
        }
        this.copyPreset(sourcePreset, newPreset);
        return newPreset;
    }

    copyPreset = (sourcePreset: IPreset, targetPreset: IPreset): void => {
        targetPreset.symbol = sourcePreset.symbol;
        //
        targetPreset.rotation.x = sourcePreset.rotation.x;
        targetPreset.rotation.y = sourcePreset.rotation.y;
        targetPreset.rotation.z = sourcePreset.rotation.z;
        //
        targetPreset.stepRotation.x = sourcePreset.stepRotation.x;
        targetPreset.stepRotation.y = sourcePreset.stepRotation.y;
        targetPreset.stepRotation.z = sourcePreset.stepRotation.z;
        //
        targetPreset.rotationReverse = sourcePreset.rotationReverse;
        targetPreset.scaleStep.x = sourcePreset.scaleStep.x;
        targetPreset.scaleStep.y = sourcePreset.scaleStep.y;
        targetPreset.scaleStep.z = sourcePreset.scaleStep.z;
        //
        targetPreset.scaleReverse = sourcePreset.scaleReverse;
        targetPreset.countInCircle = sourcePreset.countInCircle;
        targetPreset.customStepAngle = sourcePreset.customStepAngle;
        targetPreset.customLetterWidth = sourcePreset.customLetterWidth;
    }

    getPresets = (): IPreset[] => {
        let presets = [
            {
                symbol: "$",
                rotation: new THREE.Euler(0, 0, 0),
                stepRotation: new THREE.Euler(0, 0, 0),
                rotationReverse: true,

                scaleStep: new THREE.Vector3(0, 0, 0),
                scaleReverse: true,

                countInCircle: 24,
                // customStepAngle: Math.PI / 32,
                customLetterWidth: 0
            },
            {
                symbol: "Z",
                rotation: new THREE.Euler(0, 0, Math.PI / 3),
                stepRotation: new THREE.Euler(0, 0, 0),
                rotationReverse: true,

                scaleStep: new THREE.Vector3(0, 0, 0),
                scaleReverse: true,

                countInCircle: 12,
                // customStepAngle: Math.PI / 32,
                customLetterWidth: 0
            },
            {
                symbol: "B",
                rotation: new THREE.Euler(0, 0, Math.PI / 2),
                stepRotation: new THREE.Euler(0, 0, 0),
                rotationReverse: true,

                scaleStep: new THREE.Vector3(0, 0, 0),
                scaleReverse: true,

                countInCircle: 12,
                // customStepAngle: Math.PI / 32,
                customLetterWidth: 0
            },
            {
                symbol: "A",
                rotation: new THREE.Euler(0, 0, Math.PI / 2),
                stepRotation: new THREE.Euler(0, 0, 0),
                rotationReverse: true,

                scaleStep: new THREE.Vector3(0, 0, 0),
                scaleReverse: true,

                countInCircle: 12,
                // customStepAngle: Math.PI / 32,
                customLetterWidth: 110
            },
            {
                symbol: "F",
                rotation: new THREE.Euler(0, 0, Math.PI / 4),
                stepRotation: new THREE.Euler(0, 0, 0),
                rotationReverse: true,

                scaleStep: new THREE.Vector3(0.05, 0.05, 0.05),
                scaleReverse: true,

                countInCircle: 24,
                // customStepAngle: Math.PI / 32,
                customLetterWidth: 50
            },
            {
                symbol: "D",
                rotation: new THREE.Euler(0, 0, 0),
                stepRotation: new THREE.Euler(0, Math.PI / 64, 0),
                rotationReverse: true,

                scaleStep: new THREE.Vector3(0.0, 0.0, 0.0),
                scaleReverse: true,

                countInCircle: 48,
                // customStepAngle: Math.PI / 32,
                customLetterWidth: 30
            },
            {
                symbol: "U",
                rotation: new THREE.Euler(0, 0, Math.PI / 2),
                stepRotation: new THREE.Euler(0, 0, 0 * Math.PI / 48),
                rotationReverse: true,

                scaleStep: new THREE.Vector3(0.015, 0.015, 0.00),
                scaleReverse: false,

                countInCircle: 32,
                // customStepAngle: Math.PI / 32,
                customLetterWidth: 30
            },
            {
                symbol: "Y",

                rotation: new THREE.Euler(0, Math.PI / 12, Math.PI / 2),
                stepRotation: new THREE.Euler(0, Math.PI / 64, 0),
                rotationReverse: true,

                scaleStep: new THREE.Vector3(0.02, 0.02, 0.01),
                scaleReverse: true,

                countInCircle: 64,
                // customStepAngle: Math.PI / 32,
                customLetterWidth: 30
            },
            {
                symbol: "B",
                rotation: new THREE.Euler(0, 0, 0),
                stepRotation: new THREE.Euler(Math.PI / 4, 0, 0),
                rotationReverse: false,

                scaleStep: new THREE.Vector3(0, 0, 0),
                scaleReverse: true,

                countInCircle: 24,
                // customStepAngle: Math.PI / 32,
                customLetterWidth: 60
            }
        ];

        return presets;
    }
}
