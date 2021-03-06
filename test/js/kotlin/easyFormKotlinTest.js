/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var easyFormBaseObject = require('../easyFormBase.js').prototype;
var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('(Kotlin) Testing of EasyForm', function () {

  easyFormBaseObject.constructor.apply(this, ['Groovy']);

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/kotlin/EasyFormTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Kotlin) EasyForm Actions ', function(){
    var inputs;

    it('EasyForm has button ', function () {
      cellIndex = 35;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      easyForm.$('button=run tag').click();
      beakerxPO.kernelIdleIcon.waitForEnabled();
    });

    it('tag should create EasyForm ', function () {
      cellIndex += 2;
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell_11 = beakerxPO.getCodeCellByIndex(cellIndex);
      var easyForm = codeCell_11.$('div.beaker-easyform-container');
      expect(easyForm.isEnabled()).toBeTruthy();
      inputs = easyForm.$$('input[type="text"]');
    });

    it('set text value for second field', function () {
      cellIndex -= 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, 'test text');
      expect(inputs[1].getValue()).toBe('test text');
    });

    it('onInit action should change text value ', function () {
      expect(inputs[0].getValue()).toBe('from onInit');
    });
  });

  describe('(Kotlin) IntSlider widget in EasyForm ', function(){
    it('EasyForm has IntSlider widget', function(){
      cellIndex += 2;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.slider-container')).toBeTruthy();
    });

    it('IntSlider has value 50 ', function(){
      cellIndex +=1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, '50');
    });
  });

});