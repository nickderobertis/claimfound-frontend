let packageObj = {
  "name": "webapp",
  "version": "1.0.0",
  "problems": [
    "peer dep missing: @angular/core@^7.2.15, required by angularx-social-login@1.2.7",
    "peer dep missing: zone.js@~0.9.1, required by @angular/core@8.2.14",
    "peer dep missing: zone.js@^0.8.29, required by angularx-social-login@1.2.7",
    "peer dep missing: jquery@1.9.1 - 3, required by bootstrap@4.3.1",
    "peer dep missing: popper.js@^1.14.7, required by bootstrap@4.3.1"
  ],
  "dependencies": {
    "@agm/core": {
      "version": "1.0.0",
      "from": "@agm/core@1.0.0",
      "resolved": "https://registry.npmjs.org/@agm/core/-/core-1.0.0.tgz"
    },
    "@angular-devkit/build-angular": {
      "version": "0.803.19",
      "from": "@angular-devkit/build-angular@0.803.19",
      "resolved": "https://registry.npmjs.org/@angular-devkit/build-angular/-/build-angular-0.803.19.tgz"
    },
    "@angular/animations": {
      "version": "8.2.14",
      "from": "@angular/animations@8.2.14",
      "resolved": "https://registry.npmjs.org/@angular/animations/-/animations-8.2.14.tgz"
    },
    "@angular/cdk": {
      "version": "8.2.3",
      "from": "@angular/cdk@8.2.3",
      "resolved": "https://registry.npmjs.org/@angular/cdk/-/cdk-8.2.3.tgz"
    },
    "@angular/cli": {
      "version": "8.3.19",
      "from": "@angular/cli@8.3.19",
      "resolved": "https://registry.npmjs.org/@angular/cli/-/cli-8.3.19.tgz"
    },
    "@angular/common": {
      "version": "8.2.14",
      "from": "@angular/common@8.2.14",
      "resolved": "https://registry.npmjs.org/@angular/common/-/common-8.2.14.tgz"
    },
    "@angular/compiler": {
      "version": "8.2.14",
      "from": "@angular/compiler@8.2.14",
      "resolved": "https://registry.npmjs.org/@angular/compiler/-/compiler-8.2.14.tgz"
    },
    "@angular/compiler-cli": {
      "version": "8.2.14",
      "from": "@angular/compiler-cli@8.2.14",
      "resolved": "https://registry.npmjs.org/@angular/compiler-cli/-/compiler-cli-8.2.14.tgz"
    },
    "@angular/core": {
      "required": {
        "_args": [
          [
            "@angular/core@8.2.14",
            "/front"
          ],
          [
            "@angular/core@8.2.14",
            "/front"
          ]
        ],
        "_from": "@angular/core@8.2.14",
        "_id": "@angular/core@8.2.14",
        "_integrity": "sha512-zeePkigi+hPh3rN7yoNENG/YUBUsIvUXdxx+AZq+QPaFeKEA2FBSrKn36ojHFrdJUjKzl0lPMEiGC2b6a6bo6g==",
        "_location": "/@angular/core",
        "_phantomChildren": {},
        "_requested": {
          "type": "version",
          "registry": true,
          "raw": "@angular/core@8.2.14",
          "name": "@angular/core",
          "escapedName": "@angular%2fcore",
          "scope": "@angular",
          "rawSpec": "8.2.14",
          "saveSpec": null,
          "fetchSpec": "8.2.14"
        },
        "_requiredBy": [
          "/"
        ],
        "_resolved": "https://registry.npmjs.org/@angular/core/-/core-8.2.14.tgz",
        "_spec": "8.2.14",
        "_where": "/front",
        "author": {
          "name": "angular"
        },
        "bugs": {
          "url": "https://github.com/angular/angular/issues"
        },
        "dependencies": {
          "tslib": {
            "_args": [
              [
                "tslib@1.10.0",
                "/front"
              ],
              [
                "tslib@1.10.0",
                "/front"
              ]
            ],
            "_from": "tslib@1.10.0",
            "_id": "tslib@1.10.0",
            "_integrity": "sha512-qOebF53frne81cf0S9B41ByenJ3/IuH8yJKngAX35CmiZySA0khhkovshKK+jGCaMnVomla7gVlIcc3EvKPbTQ==",
            "_location": "/tslib",
            "_phantomChildren": {},
            "_requested": {
              "type": "version",
              "registry": true,
              "raw": "tslib@1.10.0",
              "name": "tslib",
              "escapedName": "tslib",
              "rawSpec": "1.10.0",
              "saveSpec": "[Circular]",
              "fetchSpec": "1.10.0"
            },
            "_requiredBy": [
              "/",
              "/@agm/core",
              "/@angular-devkit/architect/rxjs",
              "/@angular-devkit/build-angular/rxjs",
              "/@angular-devkit/build-optimizer",
              "/@angular-devkit/build-webpack/rxjs",
              "/@angular-devkit/core/rxjs",
              "/@angular-devkit/schematics/rxjs",
              "/@angular/animations",
              "/@angular/cdk",
              "/@angular/common",
              "/@angular/compiler",
              "/@angular/compiler-cli",
              "/@angular/core",
              "/@angular/forms",
              "/@angular/material",
              "/@angular/platform-browser",
              "/@angular/platform-browser-dynamic",
              "/@angular/router",
              "/@ng-bootstrap/ng-bootstrap",
              "/@ngtools/webpack/rxjs",
              "/@schematics/update/rxjs",
              "/chrome-trace-event",
              "/rxjs",
              "/ts-simple-ast",
              "/tslint",
              "/tsutils"
            ],
            "_resolved": "https://registry.npmjs.org/tslib/-/tslib-1.10.0.tgz",
            "_spec": "1.10.0",
            "_where": "/front",
            "author": {
              "name": "Microsoft Corp."
            },
            "bugs": {
              "url": "https://github.com/Microsoft/TypeScript/issues"
            },
            "description": "Runtime library for TypeScript helper functions",
            "homepage": "http://typescriptlang.org/",
            "jsnext:main": "tslib.es6.js",
            "keywords": [
              "TypeScript",
              "Microsoft",
              "compiler",
              "language",
              "javascript",
              "tslib",
              "runtime"
            ],
            "license": "Apache-2.0",
            "main": "tslib.js",
            "module": "tslib.es6.js",
            "name": "tslib",
            "repository": {
              "type": "git",
              "url": "git+https://github.com/Microsoft/tslib.git"
            },
            "typings": "tslib.d.ts",
            "version": "1.10.0",
            "readme": "# tslib\r\n\r\nThis is a runtime library for [TypeScript](http://www.typescriptlang.org/) that contains all of the TypeScript helper functions.\r\n\r\nThis library is primarily used by the `--importHelpers` flag in TypeScript.\r\nWhen using `--importHelpers`, a module that uses helper functions like `__extends` and `__assign` in the following emitted file:\r\n\r\n```ts\r\nvar __assign = (this && this.__assign) || Object.assign || function(t) {\r\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n        s = arguments[i];\r\n        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n            t[p] = s[p];\r\n    }\r\n    return t;\r\n};\r\nexports.x = {};\r\nexports.y = __assign({}, exports.x);\r\n\r\n```\r\n\r\nwill instead be emitted as something like the following:\r\n\r\n```ts\r\nvar tslib_1 = require(\"tslib\");\r\nexports.x = {};\r\nexports.y = tslib_1.__assign({}, exports.x);\r\n```\r\n\r\nBecause this can avoid duplicate declarations of things like `__extends`, `__assign`, etc., this means delivering users smaller files on average, as well as less runtime overhead.\r\nFor optimized bundles with TypeScript, you should absolutely consider using `tslib` and `--importHelpers`.\r\n\r\n# Installing\r\n\r\nFor the latest stable version, run:\r\n\r\n## npm\r\n\r\n```sh\r\n# TypeScript 2.3.3 or later\r\nnpm install --save tslib\r\n\r\n# TypeScript 2.3.2 or earlier\r\nnpm install --save tslib@1.6.1\r\n```\r\n\r\n## bower\r\n\r\n```sh\r\n# TypeScript 2.3.3 or later\r\nbower install tslib\r\n\r\n# TypeScript 2.3.2 or earlier\r\nbower install tslib@1.6.1\r\n```\r\n\r\n## JSPM\r\n\r\n```sh\r\n# TypeScript 2.3.3 or later\r\njspm install tslib\r\n\r\n# TypeScript 2.3.2 or earlier\r\njspm install tslib@1.6.1\r\n```\r\n\r\n# Usage\r\n\r\nSet the `importHelpers` compiler option on the command line:\r\n\r\n```\r\ntsc --importHelpers file.ts\r\n```\r\n\r\nor in your tsconfig.json:\r\n\r\n```json\r\n{\r\n    \"compilerOptions\": {\r\n        \"importHelpers\": true\r\n    }\r\n}\r\n```\r\n\r\n#### For bower and JSPM users\r\n\r\nYou will need to add a `paths` mapping for `tslib`, e.g. For Bower users:\r\n\r\n```json\r\n{\r\n    \"compilerOptions\": {\r\n        \"module\": \"amd\",\r\n        \"importHelpers\": true,\r\n        \"baseUrl\": \"./\",\r\n        \"paths\": {\r\n            \"tslib\" : [\"bower_components/tslib/tslib.d.ts\"]\r\n        }\r\n    }\r\n}\r\n```\r\n\r\nFor JSPM users:\r\n\r\n```json\r\n{\r\n    \"compilerOptions\": {\r\n        \"module\": \"system\",\r\n        \"importHelpers\": true,\r\n        \"baseUrl\": \"./\",\r\n        \"paths\": {\r\n            \"tslib\" : [\"jspm_packages/npm/tslib@1.10.0/tslib.d.ts\"]\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n\r\n# Contribute\r\n\r\nThere are many ways to [contribute](https://github.com/Microsoft/TypeScript/blob/master/CONTRIBUTING.md) to TypeScript.\r\n\r\n* [Submit bugs](https://github.com/Microsoft/TypeScript/issues) and help us verify fixes as they are checked in.\r\n* Review the [source code changes](https://github.com/Microsoft/TypeScript/pulls).\r\n* Engage with other TypeScript users and developers on [StackOverflow](http://stackoverflow.com/questions/tagged/typescript).\r\n* Join the [#typescript](http://twitter.com/#!/search/realtime/%23typescript) discussion on Twitter.\r\n* [Contribute bug fixes](https://github.com/Microsoft/TypeScript/blob/master/CONTRIBUTING.md).\r\n* Read the language specification ([docx](http://go.microsoft.com/fwlink/?LinkId=267121), [pdf](http://go.microsoft.com/fwlink/?LinkId=267238)).\r\n\r\n# Documentation\r\n\r\n* [Quick tutorial](http://www.typescriptlang.org/Tutorial)\r\n* [Programming handbook](http://www.typescriptlang.org/Handbook)\r\n* [Language specification](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md)\r\n* [Homepage](http://www.typescriptlang.org/)\r\n",
            "readmeFilename": "README.md",
            "dependencies": {},
            "devDependencies": {},
            "optionalDependencies": {},
            "_dependencies": {},
            "path": "/front/node_modules/tslib",
            "error": "[Circular]",
            "extraneous": false,
            "_deduped": "tslib"
          }
        },
        "description": "Angular - the core framework",
        "es2015": "./fesm2015/core.js",
        "esm2015": "./esm2015/core.js",
        "esm5": "./esm5/core.js",
        "fesm2015": "./fesm2015/core.js",
        "fesm5": "./fesm5/core.js",
        "homepage": "https://github.com/angular/angular#readme",
        "license": "MIT",
        "main": "./bundles/core.umd.js",
        "module": "./fesm5/core.js",
        "name": "@angular/core",
        "ng-update": {
          "migrations": "./schematics/migrations.json",
          "packageGroup": [
            "@angular/core",
            "@angular/bazel",
            "@angular/common",
            "@angular/compiler",
            "@angular/compiler-cli",
            "@angular/animations",
            "@angular/elements",
            "@angular/platform-browser",
            "@angular/platform-browser-dynamic",
            "@angular/forms",
            "@angular/platform-server",
            "@angular/platform-webworker",
            "@angular/platform-webworker-dynamic",
            "@angular/upgrade",
            "@angular/router",
            "@angular/language-service",
            "@angular/service-worker"
          ]
        },
        "peerDependencies": {
          "rxjs": "^6.4.0",
          "zone.js": "~0.9.1"
        },
        "publishConfig": {
          "registry": "https://wombat-dressing-room.appspot.com"
        },
        "repository": {
          "type": "git",
          "url": "git+https://github.com/angular/angular.git"
        },
        "sideEffects": false,
        "typings": "./core.d.ts",
        "version": "8.2.14",
        "readme": "Angular\n=======\n\nThe sources for this package are in the main [Angular](https://github.com/angular/angular) repo. Please file issues and pull requests against that repo.\n\nLicense: MIT\n",
        "readmeFilename": "README.md",
        "devDependencies": {},
        "optionalDependencies": {},
        "_dependencies": {
          "tslib": "^1.9.0"
        },
        "path": "/front/node_modules/@angular/core",
        "error": "[Circular]",
        "extraneous": false,
        "peerMissing": [
          {
            "requiredBy": "angularx-social-login@1.2.7",
            "requires": "@angular/core@^7.2.15"
          }
        ]
      },
      "peerMissing": true
    },
    "@angular/forms": {
      "version": "8.2.14",
      "from": "@angular/forms@8.2.14",
      "resolved": "https://registry.npmjs.org/@angular/forms/-/forms-8.2.14.tgz"
    },
    "@angular/language-service": {
      "version": "8.2.14",
      "from": "@angular/language-service@8.2.14",
      "resolved": "https://registry.npmjs.org/@angular/language-service/-/language-service-8.2.14.tgz"
    },
    "@angular/material": {
      "version": "8.2.3",
      "from": "@angular/material@8.2.3",
      "resolved": "https://registry.npmjs.org/@angular/material/-/material-8.2.3.tgz"
    },
    "@angular/platform-browser": {
      "version": "8.2.14",
      "from": "@angular/platform-browser@8.2.14",
      "resolved": "https://registry.npmjs.org/@angular/platform-browser/-/platform-browser-8.2.14.tgz"
    },
    "@angular/platform-browser-dynamic": {
      "version": "8.2.14",
      "from": "@angular/platform-browser-dynamic@8.2.14",
      "resolved": "https://registry.npmjs.org/@angular/platform-browser-dynamic/-/platform-browser-dynamic-8.2.14.tgz"
    },
    "@angular/router": {
      "version": "8.2.14",
      "from": "@angular/router@8.2.14",
      "resolved": "https://registry.npmjs.org/@angular/router/-/router-8.2.14.tgz"
    },
    "@compodoc/compodoc": {
      "version": "1.1.8",
      "from": "@compodoc/compodoc@1.1.8",
      "resolved": "https://registry.npmjs.org/@compodoc/compodoc/-/compodoc-1.1.8.tgz"
    },
    "@ng-bootstrap/ng-bootstrap": {
      "version": "5.1.4",
      "from": "@ng-bootstrap/ng-bootstrap@5.1.4",
      "resolved": "https://registry.npmjs.org/@ng-bootstrap/ng-bootstrap/-/ng-bootstrap-5.1.4.tgz"
    },
    "@types/google.analytics": {
      "version": "0.0.40",
      "from": "@types/google.analytics@0.0.40",
      "resolved": "https://registry.npmjs.org/@types/google.analytics/-/google.analytics-0.0.40.tgz"
    },
    "@types/googlemaps": {
      "version": "3.39.3",
      "from": "@types/googlemaps@3.39.3",
      "resolved": "https://registry.npmjs.org/@types/googlemaps/-/googlemaps-3.39.3.tgz"
    },
    "@types/jasmine": {
      "version": "3.4.6",
      "from": "@types/jasmine@3.4.6",
      "resolved": "https://registry.npmjs.org/@types/jasmine/-/jasmine-3.4.6.tgz"
    },
    "@types/jasminewd2": {
      "version": "2.0.8",
      "from": "@types/jasminewd2@2.0.8",
      "resolved": "https://registry.npmjs.org/@types/jasminewd2/-/jasminewd2-2.0.8.tgz"
    },
    "@types/node": {
      "version": "12.12.9",
      "from": "@types/node@12.12.9",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-12.12.9.tgz"
    },
    "angular-font-awesome": {
      "version": "3.1.2",
      "from": "angular-font-awesome@3.1.2",
      "resolved": "https://registry.npmjs.org/angular-font-awesome/-/angular-font-awesome-3.1.2.tgz"
    },
    "angular2-signaturepad": {
      "version": "2.9.0",
      "from": "angular2-signaturepad@2.9.0",
      "resolved": "https://registry.npmjs.org/angular2-signaturepad/-/angular2-signaturepad-2.9.0.tgz"
    },
    "angularx-social-login": {
      "version": "1.2.7",
      "from": "angularx-social-login@1.2.7",
      "resolved": "https://registry.npmjs.org/angularx-social-login/-/angularx-social-login-1.2.7.tgz"
    },
    "bootstrap": {
      "version": "4.3.1",
      "from": "bootstrap@4.3.1",
      "resolved": "https://registry.npmjs.org/bootstrap/-/bootstrap-4.3.1.tgz"
    },
    "codelyzer": {
      "version": "5.2.0",
      "from": "codelyzer@5.2.0",
      "resolved": "https://registry.npmjs.org/codelyzer/-/codelyzer-5.2.0.tgz"
    },
    "core-js": {
      "version": "3.4.1",
      "from": "core-js@3.4.1",
      "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.4.1.tgz"
    },
    "font-awesome": {
      "version": "4.7.0",
      "from": "font-awesome@4.7.0",
      "resolved": "https://registry.npmjs.org/font-awesome/-/font-awesome-4.7.0.tgz"
    },
    "jasmine-core": {
      "version": "3.5.0",
      "from": "jasmine-core@3.5.0",
      "resolved": "https://registry.npmjs.org/jasmine-core/-/jasmine-core-3.5.0.tgz"
    },
    "jasmine-spec-reporter": {
      "version": "4.2.1",
      "from": "jasmine-spec-reporter@4.2.1",
      "resolved": "https://registry.npmjs.org/jasmine-spec-reporter/-/jasmine-spec-reporter-4.2.1.tgz"
    },
    "karma": {
      "version": "4.4.1",
      "from": "karma@4.4.1",
      "resolved": "https://registry.npmjs.org/karma/-/karma-4.4.1.tgz"
    },
    "karma-chrome-launcher": {
      "version": "3.1.0",
      "from": "karma-chrome-launcher@3.1.0",
      "resolved": "https://registry.npmjs.org/karma-chrome-launcher/-/karma-chrome-launcher-3.1.0.tgz"
    },
    "karma-coverage-istanbul-reporter": {
      "version": "2.1.0",
      "from": "karma-coverage-istanbul-reporter@2.1.0",
      "resolved": "https://registry.npmjs.org/karma-coverage-istanbul-reporter/-/karma-coverage-istanbul-reporter-2.1.0.tgz"
    },
    "karma-jasmine": {
      "version": "2.0.1",
      "from": "karma-jasmine@2.0.1",
      "resolved": "https://registry.npmjs.org/karma-jasmine/-/karma-jasmine-2.0.1.tgz"
    },
    "karma-jasmine-html-reporter": {
      "version": "1.4.2",
      "from": "karma-jasmine-html-reporter@1.4.2",
      "resolved": "https://registry.npmjs.org/karma-jasmine-html-reporter/-/karma-jasmine-html-reporter-1.4.2.tgz"
    },
    "ngx-bootstrap": {
      "version": "5.2.0",
      "from": "ngx-bootstrap@5.2.0",
      "resolved": "https://registry.npmjs.org/ngx-bootstrap/-/ngx-bootstrap-5.2.0.tgz"
    },
    "protractor": {
      "version": "5.4.2",
      "from": "protractor@5.4.2",
      "resolved": "https://registry.npmjs.org/protractor/-/protractor-5.4.2.tgz"
    },
    "rxjs": {
      "version": "6.5.3",
      "from": "rxjs@6.5.3",
      "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-6.5.3.tgz"
    },
    "ts-node": {
      "version": "8.5.2",
      "from": "ts-node@8.5.2",
      "resolved": "https://registry.npmjs.org/ts-node/-/ts-node-8.5.2.tgz"
    },
    "tslib": {
      "version": "1.10.0",
      "from": "tslib@1.10.0",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.10.0.tgz"
    },
    "tslint": {
      "version": "5.20.1",
      "from": "tslint@5.20.1",
      "resolved": "https://registry.npmjs.org/tslint/-/tslint-5.20.1.tgz"
    },
    "typescript": {
      "version": "3.5.3",
      "from": "typescript@3.5.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-3.5.3.tgz"
    },
    "uglify-js": {
      "version": "3.13.0",
      "from": "uglify-js@3.13.0",
      "resolved": "https://registry.npmjs.org/uglify-js/-/uglify-js-3.13.0.tgz"
    },
    "zone.js": {
      "required": {
        "_args": [
          [
            "zone.js@0.10.2",
            "/front"
          ],
          [
            "zone.js@0.10.2",
            "/front"
          ]
        ],
        "_from": "zone.js@0.10.2",
        "_id": "zone.js@0.10.2",
        "_integrity": "sha512-UAYfiuvxLN4oyuqhJwd21Uxb4CNawrq6fPS/05Su5L4G+1TN+HVDJMUHNMobVQDFJRir2cLAODXwluaOKB7HFg==",
        "_location": "/zone.js",
        "_phantomChildren": {},
        "_requested": {
          "type": "version",
          "registry": true,
          "raw": "zone.js@0.10.2",
          "name": "zone.js",
          "escapedName": "zone.js",
          "rawSpec": "0.10.2",
          "saveSpec": "[Circular]",
          "fetchSpec": "0.10.2"
        },
        "_requiredBy": [
          "/"
        ],
        "_resolved": "https://registry.npmjs.org/zone.js/-/zone.js-0.10.2.tgz",
        "_spec": "0.10.2",
        "_where": "/front",
        "author": {
          "name": "Brian Ford"
        },
        "browser": "dist/zone.js",
        "bugs": {
          "url": "https://github.com/angular/angular/issues"
        },
        "description": "Zones for JavaScript",
        "devDependencies": {
          "domino": "2.1.2",
          "mocha": "^3.1.2",
          "mock-require": "3.0.3",
          "promises-aplus-tests": "^2.1.2",
          "typescript": "~3.4.2"
        },
        "directories": {
          "lib": "lib",
          "test": "test"
        },
        "files": [
          "lib",
          "dist"
        ],
        "homepage": "https://github.com/angular/angular#readme",
        "license": "MIT",
        "main": "dist/zone-node.js",
        "name": "zone.js",
        "repository": {
          "type": "git",
          "url": "git://github.com/angular/angular.git",
          "directory": "packages/zone.js"
        },
        "scripts": {
          "electrontest": "cd test/extra && node electron.js",
          "promisefinallytest": "tsc -p . && mocha promise.finally.spec.js",
          "promisetest": "tsc -p . && node ./promise-test.js"
        },
        "typings": "dist/zone.js.d.ts",
        "unpkg": "dist/zone.js",
        "version": "0.10.2",
        "readme": "# Zone.js\n\n[![CDNJS](https://img.shields.io/cdnjs/v/zone.js.svg)](https://cdnjs.com/libraries/zone.js)\n\nImplements _Zones_ for JavaScript, inspired by [Dart](https://dart.dev/articles/archive/zones).\n\n> If you're using zone.js via unpkg (i.e. using `https://unpkg.com/zone.js`)\n> and you're using any of the following libraries, make sure you import them first\n\n> * 'newrelic' as it patches global.Promise before zone.js does\n> * 'async-listener' as it patches global.setTimeout, global.setInterval before zone.js does\n> * 'continuation-local-storage' as it uses async-listener\n\n# NEW Zone.js POST-v0.6.0\n\nSee the new API [here](./lib/zone.ts).\n\nRead up on [Zone Primer](https://docs.google.com/document/d/1F5Ug0jcrm031vhSMJEOgp1l-Is-Vf0UCNDY-LsQtAIY).\n\n## What's a Zone?\n\nA Zone is an execution context that persists across async tasks.\nYou can think of it as [thread-local storage](http://en.wikipedia.org/wiki/Thread-local_storage) for JavaScript VMs.\n\nSee this video from ng-conf 2014 for a detailed explanation:\n\n[![screenshot of the zone.js presentation and ng-conf 2014](./presentation.png)](//www.youtube.com/watch?v=3IqtmUscE_U&t=150)\n\n## See also\n* [async-listener](https://github.com/othiym23/async-listener) - a similar library for node\n* [Async stack traces in Chrome](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)\n* [strongloop/zone](https://github.com/strongloop/zone) (Deprecated)\n* [vizone](https://github.com/gilbox/vizone) - control flow visualizer that uses zone.js\n\n## Standard API support\n\nzone.js patched most standard web APIs (such as DOM events, `XMLHttpRequest`, ...) and nodejs APIs\n(`EventEmitter`, `fs`, ...), for more details, please see [STANDARD-APIS.md](STANDARD-APIS.md).\n\n## Nonstandard API support\n\nWe are adding support to some nonstandard APIs, such as MediaQuery and\nNotification. Please see [NON-STANDARD-APIS.md](NON-STANDARD-APIS.md) for more details.\n\n## Examples\n\nYou can find some samples to describe how to use zone.js in [SAMPLE.md](SAMPLE.md).\n\n## Modules\n\nzone.js patches the async APIs described above, but those patches will have some overhead.\nStarting from zone.js v0.8.9, you can choose which web API module you want to patch.\nFor more details, please\nsee [MODULE.md](MODULE.md).\n\n## Bundles\nThere are several bundles under `dist` folder.\n\n|Bundle|Summary|\n|---|---|\n|zone.js|the default bundle, contains the most used APIs such as `setTimeout/Promise/EventTarget...`, also this bundle supports all evergreen and legacy (IE/Legacy Firefox/Legacy Safari) Browsers|\n|zone-evergreen.js|the bundle for evergreen browsers, doesn't include the `patch` for `legacy` browsers such as `IE` or old versions of `Firefox/Safari`|\n|zone-legacy.js|the patch bundle for legacy browsers, only includes the `patch` for `legacy` browsers such as `IE` or old versions of `Firefox/Safari`. This bundle must be loaded after `zone-evergreen.js`, **`zone.js`=`zone-evergreen.js` + `zone-legacy.js`**|\n|zone-testing.js|the bundle for zone testing support, including `jasmine/mocha` support and `async/fakeAsync/sync` test utilities|\n|zone-externs.js|the API definitions for `closure compiler`|\n\nAnd here are the additional optional patches not included in the main zone.js bundles\n\n|Patch|Summary|\n|---|---|\n|webapis-media-query.js|patch for `MediaQuery APIs`|\n|webapis-notification.js|patch for `Notification APIs`|\n|webapis-rtc-peer-connection.js|patch for `RTCPeerConnection APIs`|\n|webapis-shadydom.js|patch for `Shady DOM APIs`|\n|zone-bluebird.js|patch for `Bluebird APIs`|\n|zone-error.js|patch for `Error Global Object`, supports remove `Zone StackTrace`|\n|zone-patch-canvas.js|patch for `Canvas API`|\n|zone-patch-cordova.js|patch for `Cordova API`|\n|zone-patch-electron.js|patch for `Electron API`|\n|zone-patch-fetch.js|patch for `Fetch API`|\n|zone-patch-jsonp.js|utility for `jsonp API`|\n|zone-patch-resize-observer.js|patch for `ResizeObserver API`|\n|zone-patch-rxjs.js|patch for `rxjs API`|\n|zone-patch-rxjs-fake-async.js|patch for `rxjs fakeasync test`|\n|zone-patch-socket-io.js|patch for `socket-io`|\n|zone-patch-user-media.js|patch for `UserMedia API`|\n\n## Promise A+ test passed\n[![Promises/A+ 1.1 compliant](https://promisesaplus.com/assets/logo-small.png)](https://promisesaplus.com/)\n\n## License\nMIT\n",
        "readmeFilename": "README.md",
        "dependencies": {},
        "optionalDependencies": {},
        "_dependencies": {},
        "path": "/front/node_modules/zone.js",
        "error": "[Circular]",
        "extraneous": false,
        "peerMissing": [
          {
            "requiredBy": "@angular/core@8.2.14",
            "requires": "zone.js@~0.9.1"
          },
          {
            "requiredBy": "angularx-social-login@1.2.7",
            "requires": "zone.js@^0.8.29"
          }
        ]
      },
      "peerMissing": true
    },
    "jquery": {
      "required": {
        "_id": "jquery@1.9.1 - 3",
        "name": "jquery",
        "version": "1.9.1 - 3",
        "peerMissing": [
          {
            "requiredBy": "bootstrap@4.3.1",
            "requires": "jquery@1.9.1 - 3"
          }
        ],
        "dependencies": {}
      },
      "peerMissing": true
    },
    "popper.js": {
      "required": {
        "_id": "popper.js@^1.14.7",
        "name": "popper.js",
        "version": "^1.14.7",
        "peerMissing": [
          {
            "requiredBy": "bootstrap@4.3.1",
            "requires": "popper.js@^1.14.7"
          }
        ],
        "dependencies": {}
      },
      "peerMissing": true
    }
  }
};
let frontendPackages = [];

for (let pkg in packageObj.dependencies) {
  let dep = packageObj.dependencies[pkg];
  let version = dep.version;

  let packageName = version ? `${pkg}@${version}` : pkg;

  frontendPackages.push(packageName);
}

export const FRONTENDPACKAGES = frontendPackages;
