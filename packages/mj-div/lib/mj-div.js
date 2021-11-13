import React, { Component } from 'react';
import { node } from 'prop-types'

import { registerDependencies, BodyComponent, registerComponent } from 'mjml-custom';

registerDependencies({
  // Tell the validator which tags are allowed as our component's children
  'mj-div': [/^.*^/],
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['mj-div'],
  'mj-wrapper': ['mj-div'],
  'mj-section': ['mj-div'],
  'mj-column': ['mj-div'],
  'mj-bg': ['mj-div'],
  'mj-link': ['mj-div'],
  'mj-flex': ['mj-div'],
});


class MjDiv extends MjmlCore.BodyComponent {
  static allowedAttributes = {
    display: 'enum(inline-block,inline,block)',
    'max-width': 'unit(px,%)',
    width: 'unit(px,%)',
    height: 'unit(px)',
    margin: 'unit(px,%){1,4}',
    'out-padding': 'unit(px,%){1,4}',
    padding: 'unit(px,%){1,4}',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    border: 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-right': 'string',
    'border-top': 'string',
    'border-radius': 'string',
    align: 'enum(left,right,center)',
    'vertical-align': 'enum(top,bottom,middle)',
    'white-space': 'enum(normal,nowrap,pre,pre-wrap,pre-line,break-spaces)',
    'background-color': 'color',
    // deal with mj-column lost tr/td
    'insize-column': 'enum(true,false)',
  }

  static defaultAttributes = {
    'max-width': '600px',
    align: 'left',
    padding: '10px 25px',
    margin: '0 auto',
    'vertical-align': 'top',
  }

  static rawElement = true;

  getStyles() {
    let height = this.getAttribute('height');
    const isFillHeight = height !== undefined && height.indexOf('%') >= 0;
    return {
      div: {
        display: this.getAttribute('display'),
        'max-width': this.getAttribute('max-width'),
        width: this.getAttribute('width'),
        margin: this.getAttribute('margin'),
        'vertical-align': this.getAttribute('vertical-align'),
        ...(isFillHeight ? { height: '100%' } : {}),
      },
      table: {
        width: '100%',
        padding: this.getAttribute('out-padding'),
        ...(isFillHeight ? { height: '100%' } : {}),
      },
      td: {
        width: '100%',
        height: this.getAttribute('height'),
        padding: this.getAttribute('padding'),
        'padding-bottom': this.getAttribute('padding-bottom'),
        'padding-left': this.getAttribute('padding-left'),
        'padding-right': this.getAttribute('padding-right'),
        'padding-top': this.getAttribute('padding-top'),
        'vertical-align': this.getAttribute('vertical-align'),
        border: this.getAttribute('border'),
        'border-bottom': this.getAttribute('border-bottom'),
        'border-left': this.getAttribute('border-left'),
        'border-right': this.getAttribute('border-right'),
        'border-top': this.getAttribute('border-top'),
        'border-radius': this.getAttribute('border-radius'),
        'background-color': this.getAttribute('background-color'),
        'line-height': '0',
        'font-size': '0',
        'white-space': this.getAttribute('white-space'),
      }
    }
  }

  // 子元素渲染器
  childrenRenderer(component) {
    if (component.constructor.isRawElement() || component.childrenWidthoutWrap) {
      return component.render();
    }

    const className = component.getAttribute('css-class');
    return `
            <table 
            ${this.htmlAttributes({
      class: className ? `outsize-${className}-table` : '',
      border: 0,
      cellpadding: 0,
      cellspacing: 0,
      role: 'presentation',
      width: '100%',
      style: {
        width: '100%',
      },
    })}>
            <tbody>
              <tr>
                <td
                  ${component.htmlAttributes({
      align: component.getAttribute('align'),
      'vertical-align': component.getAttribute('vertical-align'),
      class: className ? `outsize-${className}-td` : '',
      style: {
        width: component.getAttribute('width') || '100%',
        'background-color': component.getAttribute('container-background-color'),
        'font-size': '0px',
        padding: component.getAttribute('padding'),
        'padding-top': component.getAttribute('padding-top'),
        'padding-right': component.getAttribute('padding-right'),
        'padding-bottom': component.getAttribute('padding-bottom'),
        'padding-left': component.getAttribute('padding-left'),
      },
    })}
                >
                  ${component.render()}
                </td>
              </tr>
            </tbody>
          </table>
          `;
  }

  render() {
    const cssClass = this.getAttribute('css-class') || '';
    const isInsizeColumn = this.getAttribute('insize-column') === true;

    return `
    ${isInsizeColumn ? '<tr><td>' : ''}
    <div
    ${this.htmlAttributes({
      class: `mj-div ${cssClass}`,
      style: 'div',
    })}
    >
      <table  
        ${this.htmlAttributes({
      border: 0,
      cellpadding: 0,
      cellspacing: 0,
      role: 'presentation',
      width: '100%',
      style: 'table',
    })}
      >
        <tbody>
          <tr>
            <td ${this.htmlAttributes({
      class: `mj-div-td ${cssClass ? `${cssClass}-td` : ''}`,
      align: this.getAttribute('align'),
      style: 'td',
    })}>
                ${this.renderChildren(this.props.children, {
      renderer: this.childrenRenderer.bind(this),
    })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    ${isInsizeColumn ? '</tr></td>' : ''}
    `;
  }
}

registerComponent(MjDiv);

export default class extends Component {
  static propTypes = {
    children: node.isRequired,
  }
  render() {
    const { children, ...rest } = this.props;
    return React.createElement('mj-div', rest, children);
  }
};
