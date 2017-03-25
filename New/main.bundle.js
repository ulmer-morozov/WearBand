webpackJsonp([1,4],{

/***/ 290:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 290;


/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(399);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/ulmer-morozov/Documents/Repos/WearBand/src/main.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three_orbitcontrols_ts__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three_orbitcontrols_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three_orbitcontrols_ts__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
        this.normalMaterial = new __WEBPACK_IMPORTED_MODULE_1_three__["MeshNormalMaterial"]();
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
            _this.rotation = new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](_this.toDegree(_this.preset.rotation.x), _this.toDegree(_this.preset.rotation.y), _this.toDegree(_this.preset.rotation.z));
            _this.stepRotation = new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](_this.toDegree(_this.preset.stepRotation.x), _this.toDegree(_this.preset.stepRotation.y), _this.toDegree(_this.preset.stepRotation.z));
        };
        this.init = function () {
            var enableViewLimitations = false;
            var showHelpers = false;
            var width = window.innerWidth;
            var height = window.innerHeight;
            _this.scene = new __WEBPACK_IMPORTED_MODULE_1_three__["Scene"]();
            if (showHelpers) {
                _this.scene.add(new __WEBPACK_IMPORTED_MODULE_1_three__["AxisHelper"](50));
            }
            var zoom = window.devicePixelRatio;
            var ratio = width / height;
            _this.camera = new __WEBPACK_IMPORTED_MODULE_1_three__["PerspectiveCamera"](25, ratio, 1, 5000);
            _this.camera.position.set(0, 0, 1200);
            _this.renderer = new __WEBPACK_IMPORTED_MODULE_1_three__["WebGLRenderer"]({
                antialias: true,
                alpha: true,
                // clearAlpha: 0.5,
                canvas: _this.canvas
            });
            _this.renderer.shadowMap.type = __WEBPACK_IMPORTED_MODULE_1_three__["PCFSoftShadowMap"];
            _this.renderer.setSize(zoom * width, zoom * height, false);
            // this.renderer.setClearColor(0xfafafa, 1);
            // this.renderer.gammaInput = true;
            // this.renderer.gammaOutput = true;
            // this.renderer.shadowMap.enabled = true;
            // this.renderer.shadowMapDebug = true;
            // renderer.shadowMapSoft = true;
            // this.renderer.shadowMap.type = THREE.PCFShadowMap;
            // Управление мышкой
            _this.controls = new __WEBPACK_IMPORTED_MODULE_2_three_orbitcontrols_ts__["OrbitControls"](_this.camera, _this.canvas);
            if (enableViewLimitations) {
            }
            //load fonts
            var loader = new __WEBPACK_IMPORTED_MODULE_1_three__["FontLoader"]();
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
                var textureCube = new __WEBPACK_IMPORTED_MODULE_1_three__["CubeTextureLoader"]().load(urls, function (cubeTexture) {
                    _this.bandLeterMaterial = new __WEBPACK_IMPORTED_MODULE_1_three__["MeshStandardMaterial"]({
                        color: 0xE5C100,
                        envMap: cubeTexture,
                        metalness: 1,
                        roughness: 0.5
                    });
                    _this.bandLeterMaterial.shading = __WEBPACK_IMPORTED_MODULE_1_three__["SmoothShading"];
                    _this.loadingFinished();
                });
            });
            var wallColor = 0xffffff;
            _this.wallMaterial = new __WEBPACK_IMPORTED_MODULE_1_three__["MeshPhongMaterial"]({
                color: wallColor,
                reflectivity: 0,
                // specular: 0xFF0000,
                shininess: 1
            });
            var wallThickess = 10;
            var wallSideWidth = 4000;
            var halfSideWidth = wallSideWidth / 2;
            var halfSideThickness = wallThickess / 2;
            var spotLight = new __WEBPACK_IMPORTED_MODULE_1_three__["SpotLight"](0xffffff);
            spotLight.intensity = 0.4;
            spotLight.position.set(5, 5, 800);
            spotLight.penumbra = 1;
            spotLight.castShadow = false;
            spotLight.shadow.bias = 0.0001;
            spotLight.shadow.mapSize.width = 2048;
            spotLight.shadow.mapSize.height = 2048;
            _this.scene.add(spotLight);
            if (showHelpers) {
                spotLight.add(new __WEBPACK_IMPORTED_MODULE_1_three__["SpotLightHelper"](spotLight));
            }
            var pointLigh2 = new __WEBPACK_IMPORTED_MODULE_1_three__["PointLight"](0xffffff, 1.5);
            pointLigh2.matrixAutoUpdate = true;
            pointLigh2.castShadow = false;
            pointLigh2.position.set(-400, 0, 0);
            // pointLigh2.rotation.set(-Math.PI / 16, -Math.PI - 1 * Math.PI / 2, 0);
            _this.scene.add(pointLigh2);
            if (showHelpers) {
                pointLigh2.add(new __WEBPACK_IMPORTED_MODULE_1_three__["PointLightHelper"](pointLigh2, 3));
            }
            var pointLight = new __WEBPACK_IMPORTED_MODULE_1_three__["PointLight"](0xffffff);
            pointLight.intensity = 0.9;
            pointLight.position.set(5, 5, 50);
            // pointLight.castShadow = true;
            // spotLight.shadow.bias = 0.0001;
            // spotLight.shadow.mapSize.width = 2048;
            // spotLight.shadow.mapSize.height = 2048;
            // this.scene.add(pointLight);
            if (showHelpers) {
                pointLight.add(new __WEBPACK_IMPORTED_MODULE_1_three__["PointLightHelper"](pointLight, 3));
            }
        };
        this.loadingFinished = function () {
            var normalMaterial = new __WEBPACK_IMPORTED_MODULE_1_three__["MeshNormalMaterial"]();
            var wireframeMaterial = new __WEBPACK_IMPORTED_MODULE_1_three__["MeshNormalMaterial"]({ wireframe: true });
            // let cilinderG = new THREE.CylinderGeometry(this.radius, this.radius, 20, 20);
            // let cilinderMesh = new THREE.Mesh(cilinderG, wireframeMaterial);
            // cilinderMesh.rotation.x += Math.PI / 2;
            // this.scene.add(cilinderMesh);
            // this.camera.lookAt(cilinderMesh.position);
            // this.drawBand("R", this.preset, new THREE.Vector3(-100, 0, 400));
            // this.drawBand("E", this.preset, new THREE.Vector3(-50, 0, 200));
            _this.redrawBand();
            _this.render();
        };
        this.redrawBand = function (badQuality) {
            if (badQuality === void 0) { badQuality = false; }
            if (_this.bandObject)
                _this.scene.remove(_this.bandObject);
            _this.bandObject = _this.drawBand(_this.preset.symbol, _this.preset, new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0, 0, 0), badQuality);
        };
        this.drawBand = function (symbol, preset, meshCenter, badQuality) {
            if (badQuality === void 0) { badQuality = false; }
            var maxAngle = 2 * Math.PI;
            var angleStep;
            var bandGroup = new __WEBPACK_IMPORTED_MODULE_1_three__["Group"]();
            var singleGeometry = new __WEBPACK_IMPORTED_MODULE_1_three__["Geometry"]();
            var geo = new __WEBPACK_IMPORTED_MODULE_1_three__["TorusGeometry"](_this.radius - 20, 6, 6, 20, 2 * Math.PI);
            var mesh = new __WEBPACK_IMPORTED_MODULE_1_three__["Mesh"](geo, _this.bandLeterMaterial);
            // bandGroup.add(mesh);
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
                //посчитаем габариты
                letterWidth = preset.customLetterWidth;
            }
            else {
                letterWidth = 2 * _this.radius * Math.tan(angleStep / 2);
            }
            var bbox = new __WEBPACK_IMPORTED_MODULE_1_three__["Box3"]().setFromObject(letter);
            var scaleKoef = letterWidth / bbox.getSize().x;
            letter.scale.set(scaleKoef, scaleKoef, scaleKoef);
            // let letBBoxMesh = new THREE.BoxHelper(letter);
            // this.scene.add(letBBoxMesh);
            var additionalRotation = new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"]();
            var additionalScale = new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"]();
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
                // angle -= scaleSign * 2*preset.scaleStep.x;
                letter_1.updateMatrix(); // as needed
                singleGeometry.merge(letter_1.geometry, letter_1.matrix);
            }
            var mesh = new __WEBPACK_IMPORTED_MODULE_1_three__["Mesh"](singleGeometry, _this.bandLeterMaterial);
            _this.scene.add(mesh);
            // this.scene.add(bandGroup);
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
            var textGeo = new __WEBPACK_IMPORTED_MODULE_1_three__["TextGeometry"](symbol, parameters);
            textGeo.center();
            var textMaterial;
            if (badQuality) {
                textMaterial = _this.normalMaterial;
            }
            else {
                textMaterial = _this.bandLeterMaterial;
            }
            var textGeoMesh = new __WEBPACK_IMPORTED_MODULE_1_three__["Mesh"](textGeo, textMaterial);
            // textGeoMesh.castShadow = true;
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
                    //сохраним презет
                    _this.copyPreset(_this.preset, _this.savedPreset);
                    return;
                case _this.rotateState:
                    //обновим UI
                    // this.updateCurrentPresetAngles();
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
            _this.bandLeterMaterial.color = new __WEBPACK_IMPORTED_MODULE_1_three__["Color"](color);
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
                rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](),
                stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](),
                rotationReverse: false,
                scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](),
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
        };
        this.getPresets = function () {
            var presets = [
                {
                    symbol: "$",
                    rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, 0),
                    stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, 0),
                    rotationReverse: true,
                    scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0, 0, 0),
                    scaleReverse: true,
                    countInCircle: 24,
                    // customStepAngle: Math.PI / 32,
                    customLetterWidth: 0
                },
                {
                    symbol: "Z",
                    rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, Math.PI / 3),
                    stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, 0),
                    rotationReverse: true,
                    scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0, 0, 0),
                    scaleReverse: true,
                    countInCircle: 12,
                    // customStepAngle: Math.PI / 32,
                    customLetterWidth: 0
                },
                {
                    symbol: "B",
                    rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, Math.PI / 2),
                    stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, 0),
                    rotationReverse: true,
                    scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0, 0, 0),
                    scaleReverse: true,
                    countInCircle: 12,
                    // customStepAngle: Math.PI / 32,
                    customLetterWidth: 0
                },
                {
                    symbol: "A",
                    rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, Math.PI / 2),
                    stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, 0),
                    rotationReverse: true,
                    scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0, 0, 0),
                    scaleReverse: true,
                    countInCircle: 12,
                    // customStepAngle: Math.PI / 32,
                    customLetterWidth: 110
                },
                {
                    symbol: "F",
                    rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, Math.PI / 4),
                    stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, 0),
                    rotationReverse: true,
                    scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0.05, 0.05, 0.05),
                    scaleReverse: true,
                    countInCircle: 24,
                    // customStepAngle: Math.PI / 32,
                    customLetterWidth: 50
                },
                {
                    symbol: "D",
                    rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, 0),
                    stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, Math.PI / 64, 0),
                    rotationReverse: true,
                    scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0.0, 0.0, 0.0),
                    scaleReverse: true,
                    countInCircle: 48,
                    // customStepAngle: Math.PI / 32,
                    customLetterWidth: 30
                },
                {
                    symbol: "U",
                    rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, Math.PI / 2),
                    stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, 0 * Math.PI / 48),
                    rotationReverse: true,
                    scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0.015, 0.015, 0.00),
                    scaleReverse: false,
                    countInCircle: 32,
                    // customStepAngle: Math.PI / 32,
                    customLetterWidth: 30
                },
                {
                    symbol: "Y",
                    rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, Math.PI / 12, Math.PI / 2),
                    stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, Math.PI / 64, 0),
                    rotationReverse: true,
                    scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0.02, 0.02, 0.01),
                    scaleReverse: true,
                    countInCircle: 64,
                    // customStepAngle: Math.PI / 32,
                    customLetterWidth: 30
                },
                {
                    symbol: "B",
                    rotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](0, 0, 0),
                    stepRotation: new __WEBPACK_IMPORTED_MODULE_1_three__["Euler"](Math.PI / 4, 0, 0),
                    rotationReverse: false,
                    scaleStep: new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](0, 0, 0),
                    scaleReverse: true,
                    countInCircle: 24,
                    // customStepAngle: Math.PI / 32,
                    customLetterWidth: 60
                }
            ];
            return presets;
        };
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
    AppComponent.prototype.ngAfterViewInit = function () {
        this.canvas = this.canvasRef.nativeElement;
        this.init();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('canvas'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], AppComponent.prototype, "canvasRef", void 0);
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(459),
            styles: [__webpack_require__(458)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=/Users/ulmer-morozov/Documents/Repos/WearBand/src/app.component.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_nouislider__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_nouislider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_nouislider__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { Ng2SliderComponent }  from 'ng2-slider-component/ng2-slider.component'
// import { SlideAbleDirective } from 'ng2-slideable-directive/slideable.directive';
// import { Ng2StyledDirective } from 'ng2-styled-directive/ng2-styled.directive';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                // SlideAbleDirective,
                // Ng2StyledDirective,
                // Ng2SliderComponent,
                // NouisliderModule,
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5_ng2_nouislider__["NouisliderModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"]
            ],
            // exports: [],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/ulmer-morozov/Documents/Repos/WearBand/src/app.module.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/ulmer-morozov/Documents/Repos/WearBand/src/environment.js.map

/***/ }),

/***/ 458:
/***/ (function(module, exports) {

module.exports = "canvas {\n  height: 100vh;\n  width: 100vw;\n  display: block; }\n\n.controls {\n  position: fixed;\n  left: 50%;\n  bottom: 20pt;\n  width: 360pt;\n  margin-left: -180pt;\n  color: white;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  pointer-events: none; }\n  .controls .control-container {\n    width: 100%; }\n\n.tabs {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  pointer-events: auto; }\n\n.tab {\n  width: 60pt;\n  height: 60pt;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  position: relative;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 9pt;\n  background-color: #000000;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n\n.tab:hover {\n  background-color: #00ff00; }\n\n.tab.active {\n  background-color: #000000;\n  border: solid 4pt #00ff00;\n  box-sizing: border-box; }\n\n.tab a {\n  position: absolute;\n  bottom: 12pt;\n  left: 0;\n  right: 0;\n  text-align: center;\n  cursor: default; }\n\ni.tab-icon {\n  width: 32pt;\n  height: 28pt;\n  margin-bottom: 10pt;\n  background-position: center center;\n  background-repeat: no-repeat; }\n\n.panel {\n  pointer-events: auto;\n  margin-bottom: 10pt;\n  background-color: #000000;\n  text-align: center;\n  max-width: 220pt; }\n  .panel.choose-symbol {\n    width: 240pt;\n    max-width: none; }\n  .panel.population {\n    padding: 10pt; }\n  .panel.choose-rotation {\n    padding: 10pt; }\n  .panel.growing {\n    padding: 10pt; }\n  .panel.randomize {\n    padding: 10pt; }\n    .panel.randomize a.btn {\n      margin: 0; }\n\n.label {\n  font-size: 12pt;\n  margin-top: 26pt;\n  text-align: left; }\n  .label:first-of-type {\n    margin-top: 0; }\n\n.slider {\n  margin: 6pt 8pt; }\n\na.btn {\n  display: inline-block;\n  margin-top: 10pt;\n  font-size: 12pt;\n  padding: 6pt 11pt;\n  background-color: #00ff00;\n  cursor: default;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  a.btn.padded {\n    margin: 10pt; }\n  a.btn.inline {\n    margin: 0;\n    height: 100%; }\n  a.btn.btn:active {\n    background-color: darkgreen; }\n  a.btn.buy-btn {\n    position: fixed;\n    top: 15pt;\n    right: 15pt;\n    margin: 0;\n    background-color: #e1e1e1;\n    box-shadow: 1px 1px 0 0 #868686, inset 1px 1px 0 0 #d9d7d7; }\n    a.btn.buy-btn:hover {\n      background-color: whitesmoke; }\n    a.btn.buy-btn:active {\n      background-color: gray; }\n\n.letter-symbol {\n  width: 30pt;\n  height: 30pt;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 18pt;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  box-sizing: border-box;\n  border: solid 4pt transparent;\n  cursor: default; }\n  .letter-symbol:hover {\n    border: solid 4pt #00ff00; }\n\n.material-probes {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .material-probes .material-probe {\n    width: 30pt;\n    height: 30pt;\n    border: solid 6pt transparent;\n    box-sizing: border-box; }\n    .material-probes .material-probe .probe-icon {\n      height: 100%; }\n    .material-probes .material-probe:hover {\n      border-color: #00ff00; }\n\n.logo {\n  position: fixed;\n  top: 20pt;\n  left: 20pt; }\n\n.buy-window {\n  width: 200pt;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  padding: 20pt;\n  margin-left: -100pt;\n  margin-top: -60pt;\n  text-align: center;\n  background-color: #000000; }\n  .buy-window p {\n    text-align: left;\n    color: #00ff00; }\n\n.button-icon {\n  display: inline-block;\n  width: 10pt;\n  height: 10pt;\n  background-size: cover;\n  margin-right: 4pt; }\n\ni.icon-rotate {\n  background-image: url(\"assets/images/icons/icon_3drotate.svg\"); }\n\ni.icon-size {\n  background-image: url(\"assets/images/icons/icon_size.svg\"); }\n\ni.icon-color {\n  background-image: url(\"assets/images/icons/icon_color.svg\"); }\n\ni.icon-population {\n  background-image: url(\"assets/images/icons/icon_count.svg\"); }\n\ni.icon-random {\n  background-image: url(\"assets/images/icons/icon_random.svg\"); }\n\ni.icon-letters {\n  background-image: url(\"assets/images/icons/icon_textinput.svg\"); }\n\ni.icon-cart {\n  background-image: url(\"assets/images/icons/icon_shoppingcart.svg\"); }\n\n@media (max-width: 500px) {\n  .controls {\n    bottom: 0;\n    width: 99.96vw;\n    margin-left: -49.98vw; }\n  .tab {\n    width: 16.66vw;\n    height: 16.66vw;\n    font-size: 7pt; }\n  .tab a {\n    bottom: 6pt; }\n  .tab.active {\n    border-size: 2pt; }\n  i.tab-icon {\n    background-size: contain;\n    width: 20pt;\n    height: 14pt; }\n  .letter-symbol {\n    font-size: 14pt; }\n  .panel {\n    max-width: none; }\n    .panel.choose-symbol {\n      width: 100vw;\n      background-color: #000000; }\n  .letter-symbol {\n    width: 12.5vw;\n    height: 12.5vw;\n    font-size: 14pt; }\n  a.btn {\n    padding: 8pt 14pt; }\n  .logo {\n    position: fixed;\n    top: 15pt;\n    left: 15pt;\n    height: 15pt; }\n  .btn.buy-btn {\n    display: none; } }\n"

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

module.exports = "<canvas id=\"canvas3d\" width=\"200\" height=\"100\" #canvas></canvas>\n\n<div class=\"controls\">\n\n    <div class=\"control-container\">\n        <!-- Рандом и презеты -->\n        <div [hidden]=\"currentState != randomizeState\" class=\"randomize panel\">\n            <!-- <div (click)=\"setSymbol(letter)\" *ngFor=\"let letter of letters\" class=\"letter-symbol\">{{letter}}</div> -->\n\n            <a (click)=\"nextPreset()\" class=\"btn\">Preset</a>\n            <a (click)=\"restorePreset()\" class=\"btn\">Restore</a>\n\n            <a (click)=\"setDefaultState()\" class=\"btn\">Confirm</a>\n        </div>\n        <!-- Алфавит -->\n        <div [hidden]=\"currentState != chooseLetterState\" class=\"choose-symbol panel\">\n            <div (click)=\"setSymbol(letter)\" *ngFor=\"let letter of letters\" class=\"letter-symbol\">{{letter}}</div>\n            <a (click)=\"setDefaultState()\" class=\"btn padded\">Confirm</a>\n        </div>\n        <!-- Поворот -->\n        <div [hidden]=\"currentState != rotateState\" class=\"choose-rotation panel\">\n            <div class=\"label\">Rotation_Initial_{{rotation.z}}</div>\n            <nouislider [connect]=\"true\" [min]=\"-180\" [max]=\"180\" [step]=\"1\" [(ngModel)]=\"rotation.z\" (ngModelChange)=\"onRotationChange($event)\" class=\"slider\"></nouislider>\n\n            <div class=\"label\">Rotation_step_x_{{stepRotation.x}}</div>\n            <nouislider [connect]=\"true\" [min]=\"0\" [max]=\"20\" [step]=\"1\" [(ngModel)]=\"stepRotation.x\" (ngModelChange)=\"onStepRotationChange($event)\" class=\"slider\"></nouislider>\n\n            <div class=\"label\">Rotation_step_y_{{stepRotation.y}}</div>\n            <nouislider [connect]=\"true\" [min]=\"0\" [max]=\"20\" [step]=\"1\" [(ngModel)]=\"stepRotation.y\" (ngModelChange)=\"onStepRotationChange($event)\" class=\"slider\"></nouislider>\n\n            <div class=\"label\">Rotation_step_z_{{stepRotation.z}}</div>\n            <nouislider [connect]=\"true\" [min]=\"0\" [max]=\"20\" [step]=\"1\" [(ngModel)]=\"stepRotation.z\" (ngModelChange)=\"onStepRotationChange($event)\" class=\"slider\"></nouislider>\n\n            <a (click)=\"setDefaultState()\" class=\"btn\">Confirm</a>\n        </div>\n        <!-- Изменение размера -->\n        <div [hidden]=\"currentState != growState\" class=\"growing panel\">\n            <div class=\"label\">Growing_{{preset.scaleStep.x}}</div>\n            <nouislider [connect]=\"true\" [min]=\"0\" [max]=\"0.2\" [step]=\"0.01\" [(ngModel)]=\"preset.scaleStep.x\" (ngModelChange)=\"onGrowChange($event)\" class=\"slider\"></nouislider>\n            <a (click)=\"setDefaultState()\" class=\"btn\">Confirm</a>\n        </div>\n        <!-- Цвета -->\n        <div [hidden]=\"currentState != materialState\" class=\"choose-material panel\">\n            <div class=\"material-probes\">\n                <div (click)=\"setMaterial(color)\" *ngFor=\"let color of colors\" class=\"material-probe\">\n                    <div [style.background-color]=\"color\" class=\"probe-icon\"></div>\n                </div>\n            </div>\n            <a (click)=\"setDefaultState()\" class=\"btn padded\">Confirm</a>\n        </div>\n        <!-- Количество букв -->\n        <div [hidden]=\"currentState != populationState\" class=\"population panel\">\n            <div class=\"label\">Count_{{preset.countInCircle}}</div>\n            <nouislider [connect]=\"true\" [min]=\"8\" [max]=\"36\" [step]=\"1\" [(ngModel)]=\"preset.countInCircle\" (ngModelChange)=\"onPopulationChange($event)\" class=\"slider\"></nouislider>\n\n            <div class=\"label\">LetterWidth_<span [hidden]=\"preset.customLetterWidth==0\">{{preset.customLetterWidth}}</span><span [hidden]=\"preset.customLetterWidth!=0\">auto</span></div>\n            <nouislider [connect]=\"true\" [min]=\"10\" [max]=\"360\" [step]=\"1\" [(ngModel)]=\"preset.customLetterWidth\" (ngModelChange)=\"onLetterWidthChange($event)\" class=\"slider\"></nouislider>\n            <a (click)=\"setDefaultState()\" class=\"btn\">Confirm</a>\n        </div>\n    </div>\n\n    <div class=\"tabs\">\n        <div (click)=\"setState(randomizeState)\" [ngClass]=\"{'active': currentState == randomizeState}\" class=\"tab\">\n            <i class=\"tab-icon icon-random\"></i>\n            <a>Random</a>\n        </div>\n        <div (click)=\"setState(chooseLetterState)\" [ngClass]=\"{'active': currentState == chooseLetterState}\" class=\"tab\">\n            <i class=\"tab-icon icon-letters\"></i>\n            <a>Text</a>\n        </div>\n        <div (click)=\"setState(rotateState)\" [ngClass]=\"{'active': currentState == rotateState}\" class=\"tab\">\n            <i class=\"tab-icon icon-rotate\"></i>\n            <a>Rotate</a>\n        </div>\n        <div (click)=\"setState(growState)\" [ngClass]=\"{'active': currentState == growState}\" class=\"tab\">\n            <i class=\"tab-icon icon-size\"></i>\n            <a>Size</a>\n        </div>\n        <div (click)=\"setState(materialState)\" [ngClass]=\"{'active': currentState == materialState}\" class=\"tab\">\n            <i class=\"tab-icon icon-color\"></i>\n            <a>Color</a>\n        </div>\n        <div (click)=\"setState(populationState)\" [ngClass]=\"{'active': currentState == populationState}\" class=\"tab\">\n            <i class=\"tab-icon icon-population\"></i>\n            <a>Count</a>\n        </div>\n    </div>\n</div>\n\n<img src=\"assets/images/logo.svg\" class=\"logo\" />\n<a (click)=\"showBuyWindow = true\" class=\"btn buy-btn\"><i class=\"button-icon icon-cart\"></i>Add_to_cart</a>\n\n<div [hidden]=\"!showBuyWindow\" class=\"buy-window\">\n  <p>Sorry,this_is_only_the_concept.</p>\n  <p>Idea,code:_Dmitry_Ulmer-Morozov</p>\n  <p>Design:_Denis_Chichkin</p>\n  <a (click)=\"showBuyWindow=false\" class=\"btn\">Confirm</a>\n</div>\n"

/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(291);


/***/ })

},[473]);
//# sourceMappingURL=main.bundle.map