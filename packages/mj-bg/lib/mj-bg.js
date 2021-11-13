import React, { Component } from 'react';
import { node } from 'prop-types'

import { registerDependencies, BodyComponent, registerComponent } from 'mjml-custom';

function makeBackgroundString(arr) {
  return arr.join(' ');
}

registerDependencies({
  // Tell the validator which tags are allowed as our component's children
  'mj-bg': [
    'mj-section',
    'mj-image',
    'mj-text',
    'mj-table',
    'mj-raw',
    'mj-link',
  ],
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['mj-bg'],
  'mj-wrapper': ['mj-bg'],
  'mj-column': ['mj-bg'],
  'mj-link': ['mj-bg'],
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
class MjBg extends BodyComponent {
  static allowedAttributes = {
    display: 'enum(inline-block,inline,block)',
    'max-width': 'unit(px,%)',
    width: 'unit(px,%)',
    height: 'unit(px,%)',
    padding: 'unit(px,%){1,4}',
    'inner-padding': 'unit(px,%){1,4}',
    'border-radius': 'string',
    border: 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-right': 'string',
    'border-top': 'string',
    direction: 'enum(ltr,rtl)',
    'text-align': 'enum(left,center,right)',
    'align': 'enum(left,center,right)',
    'background-url': 'string',
    'background-repeat': 'enum(repeat,no-repeat)',
    'background-size': 'string',
    'background-position': 'string',
    'background-position-x': 'string',
    'background-position-y': 'string',
    'background-color': 'color',
    'outsize-section': 'enum(true,false)',
    'inner-width': 'unit(px,%)',
    'inner-height': 'unit(px,%)',
  }

  static defaultAttributes = {
    display: 'inline-block',
    'max-width': '600px',
    'background-repeat': 'repeat',
    'background-size': 'auto',
    'background-position': 'top center',
    direction: 'ltr',
    padding: '0',
    'text-align': 'center',
  }

  getStyles() {
    const hasBackgroundUrl = this.hasBackgroundUrl()

    const background = this.getAttribute('background-url')
      ? {
        'background-image': `url(${this.getAttribute('background-url')})`,
        background: this.getBackground(),
        // background size, repeat and position has to be seperate since yahoo does not support shorthand background css property
        'background-position': this.getBackgroundString(),
        'background-repeat': this.getAttribute('background-repeat'),
        'background-size': this.getAttribute('background-size'),
      }
      : {
        background: this.getAttribute('background-color'),
        'background-color': this.getAttribute('background-color'),
      }

    const isOutsizeSection = this.getAttribute('outsize-section') == true;

    return {
      outDiv: {
        'max-width': this.getAttribute('max-width'),
        width: this.getAttribute('width'),
        height: this.getAttribute('height'),
        margin: '0 auto',
      },
      outTd: {
        padding: this.getAttribute('padding'),
        'text-align': this.getAttribute('text-align'),
        'font-size': '0px',
        'line-height': '0px',
      },
      table: {
        ...background,
        width: '100%',
        'border-radius': this.getAttribute('border-radius'),
      },
      td: {
        'border-radius': this.getAttribute('border-radius'),
        border: this.getAttribute('border'),
        'border-bottom': this.getAttribute('border-bottom'),
        'border-left': this.getAttribute('border-left'),
        'border-right': this.getAttribute('border-right'),
        'border-top': this.getAttribute('border-top'),
        direction: this.getAttribute('direction'),
        'line-height': '0px',
        'font-size': '0px',
        padding: this.getAttribute('inner-padding'),
        'text-align': this.getAttribute('text-align'),
      },
      div: {
        ...background,
        display: this.getAttribute('display'),
        'max-width': this.getAttribute('max-width'),
        width: isOutsizeSection ? this.getAttribute('inner-width') : this.getAttribute('width'),
        height: isOutsizeSection ? this.getAttribute('inner-height') : this.getAttribute('height'),
        'border-radius': this.getAttribute('border-radius'),
        ...(hasBackgroundUrl ? {
          'line-height': '0',
          'font-size': '0',
        } : {}),
      },
    }
  }

  getBackground() {
    return makeBackgroundString([
      this.getAttribute('background-color'),
      ...(this.hasBackgroundUrl()
        ? [
          `url(${this.getAttribute('background-url')})`,
          this.getBackgroundString(),
          `/ ${this.getAttribute('background-size')}`,
          this.getAttribute('background-repeat'),
        ]
        : []),
    ])
  }

  getBackgroundString() {
    const { posX, posY } = this.getBackgroundPosition()
    return `${posX} ${posY}`
  }

  getBackgroundPosition() {
    const { x, y } = this.parseBackgroundPosition()

    return {
      posX: this.getAttribute('background-position-x') || x,
      posY: this.getAttribute('background-position-y') || y,
    }
  }

  parseBackgroundPosition() {
    const posSplit = this.getAttribute('background-position').split(' ')

    if (posSplit.length === 1) {
      const val = posSplit[0]
      // here we must determine if x or y was provided ; other will be center
      if (['top', 'bottom'].includes(val)) {
        return {
          x: 'center',
          y: val,
        }
      }

      return {
        x: val,
        y: 'center',
      }
    }

    if (posSplit.length === 2) {
      // x and y can be put in any order in background-position so we need to determine that based on values
      const val1 = posSplit[0]
      const val2 = posSplit[1]

      if (
        ['top', 'bottom'].includes(val1) ||
        (val1 === 'center' && ['left', 'right'].includes(val2))
      ) {
        return {
          x: val2,
          y: val1,
        }
      }

      return {
        x: val1,
        y: val2,
      }
    }

    // more than 2 values is not supported, let's treat as default value
    return { x: 'center', y: 'top' }
  }

  hasBackgroundUrl() {
    return this.getAttribute('background-url') != null
  }

  childrenRenderer(component) {
    if (component.constructor.isRawElement()) {
      return component.render();
    }

    const htmlAttributes = {
      align: component.getAttribute('align'),
      'vertical-align': component.getAttribute('vertical-align'),
      class: component.getAttribute('css-class'),
      style: {
        background: component.getAttribute('container-background-color'),
        'font-size': '0px',
        padding: component.getAttribute('padding'),
        'padding-top': component.getAttribute('padding-top'),
        'padding-right': component.getAttribute('padding-right'),
        'padding-bottom': component.getAttribute('padding-bottom'),
        'padding-left': component.getAttribute('padding-left'),
      },
    };

    return `
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
              <tbody>
                <tr>
                  <td
                    ${component.htmlAttributes(htmlAttributes)}
                  >
                    ${component.render()}
                  </td>
                </tr>
              </tbody>
            </table>
            `;
  }

  renderWrappedChildren() {
    const renderChildrenOpt = {
      renderer: this.childrenRenderer,
    };

    return this.renderChildren(this.props.children, renderChildrenOpt);
  }

  renderWithBackground(content) {
    const isPercentage = (str) => /^\d+(\.\d+)?%$/.test(str)

    let vSizeAttributes = {}
    let { posX: bgPosX, posY: bgPosY } = this.getBackgroundPosition()

    switch (bgPosX) {
      case 'left':
        bgPosX = '0%'
        break
      case 'center':
        bgPosX = '50%'
        break
      case 'right':
        bgPosX = '100%'
        break
      default:
        if (!isPercentage(bgPosX)) {
          bgPosX = '50%'
        }
        break
    }
    switch (bgPosY) {
      case 'top':
        bgPosY = '0%'
        break
      case 'center':
        bgPosY = '50%'
        break
      case 'bottom':
        bgPosY = '100%'
        break
      default:
        if (!isPercentage(bgPosY)) {
          bgPosY = '0%'
        }
        break
    }

    // this logic is different when using repeat or no-repeat
    let [[vOriginX, vPosX], [vOriginY, vPosY]] = ['x', 'y'].map(
      (coordinate) => {
        const isX = coordinate === 'x'
        const bgRepeat = this.getAttribute('background-repeat') === 'repeat'
        let pos = isX ? bgPosX : bgPosY
        let origin = isX ? bgPosX : bgPosY

        if (isPercentage(pos)) {
          // Should be percentage at this point
          const percentageValue = pos.match(/^(\d+(\.\d+)?)%$/)[1]
          const decimal = parseInt(percentageValue, 10) / 100

          if (bgRepeat) {
            pos = decimal
            origin = decimal
          } else {
            pos = (-50 + decimal * 100) / 100
            origin = (-50 + decimal * 100) / 100
          }
        } else if (bgRepeat) {
          // top (y) or center (x)
          origin = isX ? '0.5' : '0'
          pos = isX ? '0.5' : '0'
        } else {
          origin = isX ? '0' : '-0.5'
          pos = isX ? '0' : '-0.5'
        }

        return [origin, pos]
      },
      this,
    )

    // If background size is either cover or contain, we tell VML to keep the aspect
    // and fill the entire element.
    if (
      this.getAttribute('background-size') === 'cover' ||
      this.getAttribute('background-size') === 'contain'
    ) {
      vSizeAttributes = {
        size: '1,1',
        aspect:
          this.getAttribute('background-size') === 'cover'
            ? 'atleast'
            : 'atmost',
      }
    } else if (this.getAttribute('background-size') !== 'auto') {
      const bgSplit = this.getAttribute('background-size').split(' ')

      if (bgSplit.length === 1) {
        vSizeAttributes = {
          size: this.getAttribute('background-size'),
          aspect: 'atmost', // reproduces height auto
        }
      } else {
        vSizeAttributes = {
          size: bgSplit.join(','),
        }
      }
    }

    let vmlType =
      this.getAttribute('background-repeat') === 'no-repeat' ? 'frame' : 'tile'

    if (this.getAttribute('background-size') === 'auto') {
      vmlType = 'tile' // if no size provided, keep old behavior because outlook can't use original image size with "frame"
        ;[[vOriginX, vPosX], [vOriginY, vPosY]] = [
          [0.5, 0.5],
          [0, 0],
        ] // also ensure that images are still cropped the same way
    }

    return `
      <!--[if mso | IE]>
        <v:rect ${this.htmlAttributes({
      style: {
        width: this.getAttribute('width'),
        height: this.getAttribute('height'),
      },
      'xmlns:v': 'urn:schemas-microsoft-com:vml',
      fill: 'true',
      stroke: 'false',
    })}>
        <v:fill ${this.htmlAttributes({
      origin: `${vOriginX}, ${vOriginY}`,
      position: `${vPosX}, ${vPosY}`,
      src: this.getAttribute('background-url'),
      color: this.getAttribute('background-color'),
      type: vmlType,
      ...vSizeAttributes,
    })} />
        <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
      <![endif]-->
          ${content}
        <!--[if mso | IE]>
        </v:textbox>
      </v:rect>
    <![endif]-->
    `
  }

  renderBgWrap() {
    const isOutsizeSection = this.getAttribute('outsize-section') == true;
    let className = this.getAttribute('css-class') || '';
    if (className && isOutsizeSection) {
      className = `inner-${className}`;
    }

    return `
      <div ${this.htmlAttributes({
      class: `${isOutsizeSection ? 'inner-' : ''}mj-bg ${className}`,
      style: 'div',
    })}>
        <table
          ${this.htmlAttributes({
      width: '100%',
      align: 'center',
      background: this.getAttribute('background-url'),
      border: '0',
      cellpadding: '0',
      cellspacing: '0',
      role: 'presentation',
      style: 'table',
    })}
        >
          <tbody>
            <tr>
              <td
                ${this.htmlAttributes({
      class: `${isOutsizeSection ? 'inner-' : ''}mj-bg-td ${className ? `${className}-td` : ''}`,
      style: 'td',
    })}
              >
                  ${this.renderWrappedChildren()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  }

  render() {
    let bgWrap = this.renderBgWrap();

    if (this.getAttribute('outsize-section') == true) {
      const className = this.getAttribute('css-class') || '';
      const tdClass = className ? `outsize-${className}-td` : '';

      bgWrap = `
      <div
      ${this.htmlAttributes({
        class: `outsize-mj-bg ${className}`,
        style: 'outDiv'
      })}>
        <table
            ${this.htmlAttributes({
        width: '100%',
        align: 'center',
        border: '0',
        cellpadding: '0',
        cellspacing: '0',
        role: 'presentation',
      })}
          >
            <tbody>
              <tr>
                <td
                  ${this.htmlAttributes({
        class: `outsize-mj-bg-td ${tdClass}`,
        style: 'outTd',
      })}
                >
                ${bgWrap}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }

    return this.hasBackgroundUrl() ? this.renderWithBackground(bgWrap) : bgWrap;
  }
}

registerComponent(MjBg);

// export default MjBg;

export default class extends Component {
  static propTypes = {
    children: node.isRequired,
  }
  render() {
    const { children, ...rest } = this.props;
    return React.createElement('mj-bg', rest, children);
  }
};
