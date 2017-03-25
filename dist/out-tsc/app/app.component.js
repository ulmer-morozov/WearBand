var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.lettersText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890$&#@";
        this.randomizeState = "randomizeState";
        this.presentationState = "presentationState";
        this.rotateState = "rotateState";
        this.materialState = "materialState";
        this.growState = "growState";
        this.populationState = "populationState";
        this.chooseLetterState = "chooseLetterState";
        this.normalMaterial = new THREE.MeshNormalMaterial();
        this.radius = 150;
        this.currentPresetIndex = 0;
        this.nextPreset = function () {
            _this.currentPresetIndex++;
            _this.currentPresetIndex = _this.currentPresetIndex % _this.presets.length;
            var selectedPreset = _this.presets[_this.currentPresetIndex];
            _this.copyPreset(selectedPreset, _this.preset);
            _this.redrawBand();
        };
        this.restorePreset = function () {
            _this.copyPreset(_this.savedPreset, _this.preset);
            _this.redrawBand();
            _this.setDefaultState();
        };
        this.updateCurrentPresetAngles = function () {
            _this.rotation = new THREE.Vector3(_this.toDegree(_this.preset.rotation.x), _this.toDegree(_this.preset.rotation.y), _this.toDegree(_this.preset.rotation.z));
            _this.stepRotation = new THREE.Vector3(_this.toDegree(_this.preset.stepRotation.x), _this.toDegree(_this.preset.stepRotation.y), _this.toDegree(_this.preset.stepRotation.z));
        };
        this.init = function () {
            var enableViewLimitations = false;
            var showHelpers = false;
            var width = window.innerWidth;
            var height = window.innerHeight;
            _this.scene = new THREE.Scene();
            if (showHelpers) {
                _this.scene.add(new THREE.AxisHelper(50));
            }
            var zoom = window.devicePixelRatio;
            var ratio = width / height;
            _this.camera = new THREE.PerspectiveCamera(25, ratio, 1, 5000);
            _this.camera.position.set(0, 0, 1200);
            _this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                canvas: _this.canvas
            });
            _this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            _this.renderer.setSize(zoom * width, zoom * height, false);
            _this.controls = new OrbitControls(_this.camera, _this.canvas);
            if (enableViewLimitations) {
            }
            var loader = new THREE.FontLoader();
            loader.load('./assets/fonts/Hanken_Book.json', function (response) {
                _this.font = response;
                var urls = [
                    'assets/images/cubemap/right.png',
                    'assets/images/cubemap/left.png',
                    'assets/images/cubemap/top.png',
                    'assets/images/cubemap/bottom.png',
                    'assets/images/cubemap/front.png',
                    'assets/images/cubemap/back.png'
                ];
                var textureCube = new THREE.CubeTextureLoader().load(urls, function (cubeTexture) {
                    _this.bandLeterMaterial = new THREE.MeshStandardMaterial({
                        color: 0xE5C100,
                        envMap: cubeTexture,
                        metalness: 1,
                        roughness: 0.5
                    });
                    _this.bandLeterMaterial.shading = THREE.SmoothShading;
                    _this.loadingFinished();
                });
            });
            var wallColor = 0xffffff;
            _this.wallMaterial = new THREE.MeshPhongMaterial({
                color: wallColor,
                reflectivity: 0,
                shininess: 1
            });
            var wallThickess = 10;
            var wallSideWidth = 4000;
            var halfSideWidth = wallSideWidth / 2;
            var halfSideThickness = wallThickess / 2;
            var spotLight = new THREE.SpotLight(0xffffff);
            spotLight.intensity = 0.4;
            spotLight.position.set(5, 5, 800);
            spotLight.penumbra = 1;
            spotLight.castShadow = false;
            spotLight.shadow.bias = 0.0001;
            spotLight.shadow.mapSize.width = 2048;
            spotLight.shadow.mapSize.height = 2048;
            _this.scene.add(spotLight);
            if (showHelpers) {
                spotLight.add(new THREE.SpotLightHelper(spotLight));
            }
            var pointLigh2 = new THREE.PointLight(0xffffff, 1.5);
            pointLigh2.matrixAutoUpdate = true;
            pointLigh2.castShadow = false;
            pointLigh2.position.set(-400, 0, 0);
            _this.scene.add(pointLigh2);
            if (showHelpers) {
                pointLigh2.add(new THREE.PointLightHelper(pointLigh2, 3));
            }
            var pointLight = new THREE.PointLight(0xffffff);
            pointLight.intensity = 0.9;
            pointLight.position.set(5, 5, 50);
            if (showHelpers) {
                pointLight.add(new THREE.PointLightHelper(pointLight, 3));
            }
        };
        this.loadingFinished = function () {
            var normalMaterial = new THREE.MeshNormalMaterial();
            var wireframeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
            _this.redrawBand();
            _this.render();
        };
        this.redrawBand = function (badQuality) {
            if (badQuality === void 0) { badQuality = false; }
            if (_this.bandObject)
                _this.scene.remove(_this.bandObject);
            _this.bandObject = _this.drawBand(_this.preset.symbol, _this.preset, new THREE.Vector3(0, 0, 0), badQuality);
        };
        this.drawBand = function (symbol, preset, meshCenter, badQuality) {
            if (badQuality === void 0) { badQuality = false; }
            var maxAngle = 2 * Math.PI;
            var angleStep;
            var bandGroup = new THREE.Group();
            var singleGeometry = new THREE.Geometry();
            var geo = new THREE.TorusGeometry(_this.radius - 20, 6, 6, 20, 2 * Math.PI);
            var mesh = new THREE.Mesh(geo, _this.bandLeterMaterial);
            if (preset.customStepAngle != undefined) {
                angleStep = preset.customStepAngle;
            }
            else {
                angleStep = maxAngle / preset.countInCircle;
            }
            var letter = _this.createLetter(symbol, badQuality);
            letter.rotation.set(preset.rotation.x, preset.rotation.y, preset.rotation.z);
            var letterWidth;
            if (preset.customLetterWidth != undefined && preset.customLetterWidth != 0) {
                letterWidth = preset.customLetterWidth;
            }
            else {
                letterWidth = 2 * _this.radius * Math.tan(angleStep / 2);
            }
            var bbox = new THREE.Box3().setFromObject(letter);
            var scaleKoef = letterWidth / bbox.getSize().x;
            letter.scale.set(scaleKoef, scaleKoef, scaleKoef);
            var additionalRotation = new THREE.Euler();
            var additionalScale = new THREE.Vector3();
            for (var angle = 0; angle <= maxAngle; angle += angleStep) {
                var letter_1 = _this.createLetter(symbol, badQuality);
                var secondPartGeneration = angle > maxAngle / 2;
                var positionX = (_this.radius) * Math.cos(angle) + meshCenter.x;
                var positionY = (_this.radius) * Math.sin(angle) + meshCenter.y;
                var positionZ = meshCenter.z;
                var rotationX = preset.rotation.x + additionalRotation.x;
                var rotationY = preset.rotation.y + additionalRotation.y;
                var rotationZ = preset.rotation.z + additionalRotation.z + angle - Math.PI / 2;
                var scaleX = scaleKoef + additionalScale.x;
                var scaleY = scaleKoef + additionalScale.y;
                var scaleZ = scaleKoef + additionalScale.z;
                letter_1.position.set(positionX, positionY, positionZ);
                letter_1.rotation.set(rotationX, rotationY, rotationZ);
                letter_1.scale.set(scaleX, scaleY, scaleZ);
                var scaleSign = preset.scaleReverse && secondPartGeneration ? -1 : 1;
                var rotationSign = preset.rotationReverse && secondPartGeneration ? -1 : 1;
                additionalRotation.set(additionalRotation.x + rotationSign * preset.stepRotation.x, additionalRotation.y + rotationSign * preset.stepRotation.y, additionalRotation.z + rotationSign * preset.stepRotation.z);
                additionalScale.set(additionalScale.x + scaleSign * preset.scaleStep.x, additionalScale.y + scaleSign * preset.scaleStep.y, additionalScale.z + scaleSign * preset.scaleStep.z);
                letter_1.updateMatrix();
                singleGeometry.merge(letter_1.geometry, letter_1.matrix);
            }
            var mesh = new THREE.Mesh(singleGeometry, _this.bandLeterMaterial);
            _this.scene.add(mesh);
            return mesh;
        };
        this.createLetter = function (symbol, badQuality) {
            var parameters = {
                font: _this.font,
                size: 50,
                height: 15,
                curveSegments: 5,
                bevelThickness: 5,
                bevelSize: 3,
                bevelEnabled: true
            };
            var textGeo = new THREE.TextGeometry(symbol, parameters);
            textGeo.center();
            var textMaterial;
            if (badQuality) {
                textMaterial = _this.normalMaterial;
            }
            else {
                textMaterial = _this.bandLeterMaterial;
            }
            var textGeoMesh = new THREE.Mesh(textGeo, textMaterial);
            return textGeoMesh;
        };
        this.render = function () {
            _this.renderer.render(_this.scene, _this.camera);
            requestAnimationFrame(_this.render);
        };
        this.setState = function (newState) {
            _this.currentState = newState;
            switch (newState) {
                case _this.randomizeState:
                    _this.copyPreset(_this.preset, _this.savedPreset);
                    return;
                case _this.rotateState:
                    return;
            }
        };
        this.setDefaultState = function () {
            _this.setState(_this.presentationState);
        };
        this.setSymbol = function (symbol) {
            _this.preset.symbol = symbol;
            _this.redrawBand();
            _this.setDefaultState();
        };
        this.setMaterial = function (color) {
            _this.bandLeterMaterial.color = new THREE.Color(color);
            _this.redrawBand();
            _this.setDefaultState();
        };
        this.onPopulationChange = function (newValue) {
            _this.preset.countInCircle = newValue;
            _this.preset.customLetterWidth = 0;
            _this.redrawBand();
        };
        this.onLetterWidthChange = function (newValue) {
            _this.preset.customLetterWidth = newValue;
            _this.redrawBand();
        };
        this.onRotationChange = function () {
            _this.preset.rotation.x = _this.toRadians(_this.rotation.x);
            _this.preset.rotation.y = _this.toRadians(_this.rotation.y);
            _this.preset.rotation.z = _this.toRadians(_this.rotation.z);
            _this.redrawBand();
        };
        this.onStepRotationChange = function () {
            _this.preset.stepRotation.x = _this.toRadians(_this.stepRotation.x);
            _this.preset.stepRotation.y = _this.toRadians(_this.stepRotation.y);
            _this.preset.stepRotation.z = _this.toRadians(_this.stepRotation.z);
            _this.redrawBand();
        };
        this.onGrowChange = function (newValue) {
            _this.preset.scaleStep.x = newValue;
            _this.preset.scaleStep.y = newValue;
            _this.redrawBand();
        };
        this.toRadians = function (degreeValue) {
            var result = Math.PI * degreeValue / 180;
            return result;
        };
        this.toDegree = function (radianValue) {
            var result = Math.round(180 * radianValue / Math.PI);
            return result;
        };
        this.clonePreset = function (sourcePreset) {
            var newPreset = {
                symbol: "A",
                rotation: new THREE.Euler(),
                stepRotation: new THREE.Euler(),
                rotationReverse: false,
                scaleStep: new THREE.Vector3(),
                scaleReverse: false,
                countInCircle: 64,
                customStepAngle: undefined,
                customLetterWidth: sourcePreset.customLetterWidth
            };
            _this.copyPreset(sourcePreset, newPreset);
            return newPreset;
        };
        this.copyPreset = function (sourcePreset, targetPreset) {
            targetPreset.symbol = sourcePreset.symbol;
            targetPreset.rotation.x = sourcePreset.rotation.x;
            targetPreset.rotation.y = sourcePreset.rotation.y;
            targetPreset.rotation.z = sourcePreset.rotation.z;
            targetPreset.stepRotation.x = sourcePreset.stepRotation.x;
            targetPreset.stepRotation.y = sourcePreset.stepRotation.y;
            targetPreset.stepRotation.z = sourcePreset.stepRotation.z;
            targetPreset.rotationReverse = sourcePreset.rotationReverse;
            targetPreset.scaleStep.x = sourcePreset.scaleStep.x;
            targetPreset.scaleStep.y = sourcePreset.scaleStep.y;
            targetPreset.scaleStep.z = sourcePreset.scaleStep.z;
            targetPreset.scaleReverse = sourcePreset.scaleReverse;
            targetPreset.countInCircle = sourcePreset.countInCircle;
            targetPreset.customStepAngle = sourcePreset.customStepAngle;
            targetPreset.customLetterWidth = sourcePreset.customLetterWidth;
        };
        this.getPresets = function () {
            var presets = [
                {
                    symbol: "$",
                    rotation: new THREE.Euler(0, 0, 0),
                    stepRotation: new THREE.Euler(0, 0, 0),
                    rotationReverse: true,
                    scaleStep: new THREE.Vector3(0, 0, 0),
                    scaleReverse: true,
                    countInCircle: 24,
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
                    customLetterWidth: 60
                }
            ];
            return presets;
        };
        this.colors = ["#E5C100", "#8A2BE2", "#FF69B4", "#2f4f4f", "#bebebe"];
        this.presets = this.getPresets();
        this.letters = Array.from(this.lettersText);
        this.showHelpers = true;
        this.currentPresetIndex = 7;
        this.preset = this.preset = this.clonePreset(this.presets[this.currentPresetIndex]);
        this.savedPreset = this.clonePreset(this.preset);
        this.currentState = this.presentationState;
        this.updateCurrentPresetAngles();
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.canvas = this.canvasRef.nativeElement;
        this.init();
    };
    return AppComponent;
}());
__decorate([
    ViewChild('canvas'),
    __metadata("design:type", ElementRef)
], AppComponent.prototype, "canvasRef", void 0);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=../../../src/app/app.component.js.map