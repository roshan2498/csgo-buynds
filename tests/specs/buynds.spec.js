'use strict';

// csgo-buynds buynds module tests

describe('buynds', function() {

    describe('BindBuilder', function() {

        describe('build(bindOptions)', function () {
            var bindBuilder, bindOptions, defaultKeyBind;

            beforeEach(function () {
                bindBuilder = new buynds.BindBuilder();
                bindOptions = new buynds.BindOptions();
                bindOptions.keyToBind = 'kp_5';
                defaultKeyBind = 'bind "kp_5" ';
            });

            it('should throw Error when keyToBind is empty string', function () {
                bindOptions.keyToBind = '';
                expect(function () { bindBuilder.build(bindOptions); }).
                toThrowError("bindOptions.keyToBind is required");
            });

            it('should build bind for specified keyToBind', function () {
                bindOptions.keyToBind = 'kp_slash';
                var expectedBind = 'bind "kp_slash" ""';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind for single primary weapon', function () {
                bindOptions.primaryWeapon = 'awp';
                var expectedBind = defaultKeyBind + '"buy awp;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind for comma-separated primary weapon', function () {
                bindOptions.primaryWeapon = 'ak47,m4a1';
                var expectedBind = defaultKeyBind + '"buy ak47; buy m4a1;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind for single secondary weapon', function () {
                bindOptions.secondaryWeapon = 'p250';
                var expectedBind = defaultKeyBind + '"buy p250;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind for comma-separated secondary weapon', function () {
                bindOptions.secondaryWeapon = 'glock,hkp2000';
                var expectedBind = defaultKeyBind + '"buy glock; buy hkp2000;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind for single gear item', function () {
                bindOptions.gear = ['vest'];
                var expectedBind = defaultKeyBind + '"buy vest;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind for list of gear items', function () {
                bindOptions.gear = ['vesthelm', 'defuser'];
                var expectedBind = defaultKeyBind + '"buy vesthelm; buy defuser;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind for single grenade', function () {
                bindOptions.grenades = ['decoy'];
                var expectedBind = defaultKeyBind + '"buy decoy;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind for single comma-separated grenade', function () {
                bindOptions.grenades = ['molotov,incgrenade'];
                var expectedBind = defaultKeyBind + '"buy molotov; buy incgrenade;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind for list of grenades', function () {
                bindOptions.grenades = ['smokegrenade', 'hegrenade', 'flashbang'];
                var expectedBind = defaultKeyBind + '"buy smokegrenade; buy hegrenade; buy flashbang;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });

            it('should build bind with items in the expected order', function () {
                // order: primary, secondary, gear, grenades
                bindOptions.primaryWeapon = 'sawedoff,mag7';
                bindOptions.secondaryWeapon = 'deagle';
                bindOptions.gear = ['vesthelm', 'vest', 'defuser'];
                bindOptions.grenades = ['hegrenade', 'molotov,incgrenade'];
                var expectedBind = defaultKeyBind + '"buy sawedoff; buy mag7; buy deagle; buy vesthelm; buy vest; ' +
                    'buy defuser; buy hegrenade; buy molotov; buy incgrenade;"';
                var result = bindBuilder.build(bindOptions);
                expect(result).toEqual(expectedBind);
            });
        });
    });

    describe('BindLoader', function() {

        describe('load(bindString)', function() {
            var bindLoader, bindString;

            var bindOptionsEqualityTester = function(first, second) {
                if (first instanceof buynds.BindOptions && second instanceof buynds.BindOptions) {
                    return first.keyToBind == second.keyToBind &&
                            first.primaryWeapon == second.primaryWeapon &&
                            first.secondaryWeapon == second.secondaryWeapon &&
                            angular.equals(first.gear, second.gear) &&
                            angular.equals(first.grenades, second.grenades);
                }
            };

            beforeEach(function() {
                bindLoader = new buynds.BindLoader();
                jasmine.addCustomEqualityTester(bindOptionsEqualityTester);
            });

            it('should throw Error when keyToBind is empty string', function() {
                bindString = '';
                expect(function() { bindLoader.load(bindString); }).
                toThrowError("bindString is required");
            });

            it('should load bind options for key bind with empty action', function() {
                bindString = 'bind "kp_enter" ""';
                var expectedBindOptions = new buynds.BindOptions();
                expectedBindOptions.keyToBind = 'kp_enter';
                var result = bindLoader.load(bindString);
                expect(result).toEqual(expectedBindOptions);
            });
        });
    });
});