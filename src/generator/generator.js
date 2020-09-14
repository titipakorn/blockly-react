/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['test_react_field'] = function (block) {
  return "console.log('custom block');\n";
};

Blockly.JavaScript['test_react_date_field'] = function (block) {
  return 'console.log(' + block.getField('DATE').getText() + ');\n';
};

Blockly.JavaScript['robot_action_speak'] = function (block) {
  var code = '';
  var tts = Blockly.JavaScript.valueToCode(
    block,
    'TEXT_TO_SPEACH',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  code += 'var speak_req = new XMLHttpRequest();\n';
  code += 'var json_speak_content = \'{"SPEAK":"' + tts.replace(/'/g, '') + '"}\';\n';
  code += "var url = 'https://temi-cmd.firebaseio.com/ActionList/action_' + actionID + '.json';\n";
  code += "speak_req.open('PUT', url, true);\n";
  code += "speak_req.setRequestHeader('Content-Type', 'application/json');\n";
  code += 'speak_req.send(JSON.stringify(JSON.parse(json_speak_content)));\n';
  code += 'actionID += 1;\n\n\n';
  return code;
};
