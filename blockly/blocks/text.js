/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
"use strict";

goog.provide("Blockly.Blocks.texts");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.texts.HUE = 160;

/**
 * Common HSV hue for all blocks in this category.
 */

Blockly.Blocks["text"] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
      .appendField(this.newQuote_(true))
      .appendField(new Blockly.FieldTextInput(""), "TEXT")
      .appendField(this.newQuote_(false));
    this.setOutput(true, Blockly.Types.TEXT.output);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function () {
      var parent = thisBlock.getParent();
      return (
        (parent && parent.getInputsInline() && parent.tooltip) ||
        Blockly.Msg.TEXT_TEXT_TOOLTIP
      );
    });
  },
  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @this Blockly.Block
   * @private
   */
  newQuote_: function (open) {
    if (open == this.RTL) {
      var file =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==";
    } else {
      var file =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC";
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  },
  /** @return {!string} Type of the block, text block always a string. */
  getBlockType: function () {
    return Blockly.Types.TEXT;
  },
};

Blockly.Blocks["text_char"] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
      .appendField(this.newQuote_(true))
      .appendField(new Blockly.FieldTextInput(""), "TEXT")
      .appendField(this.newQuote_(false));
    this.setOutput(true, Blockly.Types.TEXT.output);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function () {
      var parent = thisBlock.getParent();
      return (
        (parent && parent.getInputsInline() && parent.tooltip) ||
        Blockly.Msg.TEXT_TEXT_TOOLTIP
      );
    });
  },
  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @this Blockly.Block
   * @private
   */
  newQuote_: function (open) {
    if (open == this.RTL) {
      var file =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAIiSURBVEhLtZa9SxxBGMb3rkguECNo0JyCGAQ/ElAsEkUkaLSwEQJa2Ak2KQL+CVpJSCr/BRHSBME+kDZRQbQJKSxs/KpsNYG7/N7d2WPm5t37mCMP/Hjend33YXbmdvdy5XI5+h+qF9wBQ/AI/hpu4BLuIVsSrPC0VCpt45ni/GdsBLR+NfglTWd4o1oHL6d6oK/J0FTvwcmyD/KE7uChegVq8BgEi0ntYw8hzsubPRT1GA/VJPQnZeQEdxsPUi6Xk/6Z5MgNbjMeLJbgHfZYajtYfvit6jm0S2EHXxhvRfI0lqSwg8+5lV+mDpWsc6cUzozZgG1TB8lsoLxfnGDRLnxNytZUHXwHK7DEslzFI4Gq9doswATn3+LD8UgU/TE+x20XTV2t13BkP9LNsAieeKxPsSJ4S9GoRow74i7kQxArJLjAjKZN7YjxEyx+0EKCu+BFUrpixnuY94A0qnkCBkxdEbP9iR0mR0gWugmesUHHuKZVqFxrN9WF0C3cE+PfsSdQudZprMMcZGkKnOudgxqMM6tL3BPjHzGvxxtQGK0R+g1zliDFG6jiDagiVJ6yPtD6MoMfwAdQRehvbBC03hhtUP4JHeCqzEwHQOutYB+0wyZkitAfWC/YfSppMUuTukGpOC//ktSN0kiLNailZXAa65EWbcxIfjqOGPuC9YDT1Aj2gXwtYhF4jS2Afb4p7E9TnvoTXuDttYHfxqNBiqJ/djDBYl62JvsAAAAASUVORK5CYII=";
    } else {
      var file =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAIrSURBVEhLrZe/SxxBGIZ3Q7zTYKEGxYAECyVgcRamMYWixDKkSRHSpLQWrSwsUoidRfwDRIRUaYJWchC4QixOMBAIKEggimnSRYw/7nxmZzxmdr8x454vPPd+M7vfu3uzt3d7cb1ej+5BbTBD1vM4jt9Rn0UquElGa7XaD/xGryGSdgylk8CPuCPmdrEeqSGESQIOcZ+WHiQrFK4iTR/wMmvZr6dE7Uln40O99S3cK7YvY90QvMa9NG3jotj2HXsBjR672cf/QhexR+D0OQOBxzRWcJ/egNR3a3CR0M+4TxMg9SWIk4Zp8GkKpJ4G4iQ842xPcElvQepxkCa9S8D8J6wAUp+DNPkSMiL0GBsAqSdD+s5rZ3LW1I6401awAz0KUOpIw+DTEKT395I+43HjjtjxK3akR2Gyg9sImDJ1WifwV5dhsoO7YFCXrljfCnapR2Gyf5r6qDcJKZmxI7atm7Jg/Cf7lnF10NNkxpYKNjzhI7WH59F7cD7f9lJcQfbIYVolbAPv1EN3jVugseGuYlnU98ecGTrBMfzTZT4RPo8NqdoOVlexqMumNKJe7OA/cKjLptShXuzgC8h78TKygy9ZozVTNy07WKnKlf1m6rxKrlM6+BdUdZlbO8nrzZ1iMcAdeNvjk1f0fcFaQQxWvII8KkGSkQ60Uc8Md9EYNPrtIImnsMBb9P1iq7e/jqn9nN7QJ/qH0At9oL5TFOewD78ho/v6q5BSFF0DYEuCqIw20rsAAAAASUVORK5CYII=";
    }
    return new Blockly.FieldImage(file, 12, 12, "'");
  },
  /** @return {!string} Type of the block, text block always a string. */
  getBlockType: function () {
    return Blockly.Types.TEXT;
  },
};
