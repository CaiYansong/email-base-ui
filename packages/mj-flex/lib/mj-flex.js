import React, { Component } from 'react';
import { node } from 'prop-types'

import { registerDependencies, BodyComponent, registerComponent } from 'mjml-custom';

registerDependencies({
  // Tell the validator which tags are allowed as our component's children
  'mj-flex': [/^.*^/],
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['mj-flex'],
  'mj-wrapper': ['mj-flex'],
  'mj-section': ['mj-flex'],
  'mj-column': ['mj-flex'],
  'mj-bg': ['mj-flex'],
  'mj-link': ['mj-flex'],
  'mj-div': ['mj-flex'],
});

class MjFlex extends MjmlCore.BodyComponent {
  static allowedAttributes = {
    display: 'enum(inline-block,inline,block,list-item)',
    'max-width': 'unit(px,%)',
    width: 'unit(px,%)',
    height: 'unit(px,%)',
    align: 'enum(left,right,center,justify)',
    'background-color': 'color',
    margin: 'unit(px,%){1,4}',
    'out-padding': 'unit(px,%){1,4}',
    padding: 'unit(px,%){1,4}',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'vertical-align': 'enum(top,bottom,middle)',
    border: 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-radius': 'string',
    'border-right': 'string',
    'border-top': 'string',
    'white-space': 'enum(normal,nowrap,pre,pre-wrap,pre-line,break-spaces)',
    // 子元素排列方式。column：子元素被tr包裹。row：子元素被td包裹。
    'child-direction': 'enum(inline,column,row)',
  }

  static defaultAttributes = {
    'max-width': '600px',
    align: 'left',
    padding: '10px 25px',
    margin: '0 auto',
    'vertical-align': 'top',
  }

  childrenWidthoutWrap = true;

  getStyles() {
    // TODO: 高度逻辑
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
        ...(isFillHeight ? { height: '100%' } : {}),
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
      },
      fillTable: {
        ...(isFillHeight ? { height: '100%' } : {}),
        'line-height': '0',
        'font-size': '0',
      },
      fillTd: {
        height,
        'line-height': '0',
        'font-size': '0',
      }
    }
  }

  // 针对需要设置高度的情况，使用 table 模拟 content-box 实现
  renderFillTable(content) {
    const height = this.getAttribute('height');
    if (!height) {
      return content;
    }
    const cssClass = this.getAttribute('css-class');
    return `
    <table 
    ${this.htmlAttributes({
      class: `mj-flex-fill-table ${cssClass ? `${cssClass}-fill-table` : ''}`,
      border: 0,
      cellpadding: 0,
      cellspacing: 0,
      role: 'presentation',
      width: '100%',
      style: 'fillTable',
    })}
    >
    <tbody>
      <tr>
        <td
        ${this.htmlAttributes({
      class: `mj-flex-fill-td ${cssClass ? `${cssClass}-fill-td` : ''}`,
      style: 'fillTd',
    })}
         >
          ${content}
        </td>
      </tr>
    </tbody>
  </table>
    `
  }

  // 使用table强制进行布局
  childrenWrap(child) {
    let childStr = child;
    const childDir = this.getAttribute('child-direction');
    const cssClass = this.getAttribute('css-class');
    if (childDir === 'row') {
      childStr = `
        <table 
        ${this.htmlAttributes({
        class: `mj-flex-dir-table ${cssClass ? `${cssClass}-dir-table` : ''}`,
        border: 0,
        cellpadding: 0,
        cellspacing: 0,
        role: 'presentation',
        width: '100%',
        style: {
          'table-layout': 'fixed',
          width: '100%',
          height: '100%',
          'line-height': 0,
          'font-size': 0,
          'word-break': 'break-word',
          'white-space': 'normal',
        },
      })}
        >
          <tbody>
            <tr
            ${this.htmlAttributes({
        class: `mj-flex-dir-tr ${cssClass ? `${cssClass}-dir-tr` : ''}`,
      })}
            >
              ${child}
            </tr>
          </tbody>
        </table>
        `
    } else if (childDir === 'column') {
      childStr = `
        <table 
        ${this.htmlAttributes({
        class: `mj-flex-dir-table ${cssClass ? `${cssClass}-dir-table` : ''}`,
        border: 0,
        cellpadding: 0,
        cellspacing: 0,
        role: 'presentation',
        width: '100%',
        style: {
          width: '100%',
        },
      })}
      >
          <tbody
          ${this.htmlAttributes({
        class: `mj-flex-dir-tbody ${cssClass ? `${cssClass}-dir-tbody` : ''}`,
      })}>
          ${child}
          </tbody>
        </table>
        `
    }

    return this.renderFillTable(childStr);
  }

  // 处理子元素渲染
  handleChildren(component) {
    const isFillHeight = this.getAttribute('child-direction') === 'row';
    if (component.constructor.isRawElement() || component.childrenWidthoutWrap) {
      if (component.attributes.height === undefined && isFillHeight) {
        component.attributes.height = '100%';
      }
      return component.render();
    }

    const htmlAttributes = {
      align: component.getAttribute('align'),
      'vertical-align': component.getAttribute('vertical-align'),
      class: component.getAttribute('css-class'),
      style: {
        'background-color': component.getAttribute('container-background-color'),
        'font-size': '0px',
        padding: component.getAttribute('padding'),
        'padding-top': component.getAttribute('padding-top'),
        'padding-right': component.getAttribute('padding-right'),
        'padding-bottom': component.getAttribute('padding-bottom'),
        'padding-left': component.getAttribute('padding-left'),
      },
    };

    return `
            <table 
            ${this.htmlAttributes({
      class: component.getAttribute('css-class'),
      border: 0,
      cellpadding: 0,
      cellspacing: 0,
      role: 'presentation',
      width: '100%',
      style: {
        width: '100%',
        ...(isFillHeight ? { height: '100%' } : {}),
      },
    })}>
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

  // 子元素渲染器
  childrenRenderer(component) {
    const childDir = this.getAttribute('child-direction');
    let childStr = this.handleChildren(component);

    if (childDir === 'row') {
      let width = component.getAttribute('width');
      component.attributes.width = '100%';
      childStr = `
        <td ${this.htmlAttributes({
        width,
        style: {
          width,
          height: '100%',
        },
      })}>
        ${this.handleChildren(component)}
        </td >
        `
    } else if (childDir === 'column') {
      childStr = `
        <tr>
          <td >
          ${this.handleChildren(component)}
          </td >
        </tr>
        `
    }

    return childStr;
  }

  render() {
    const cssClass = this.getAttribute('css-class') || '';
    return `
    <div
    ${this.htmlAttributes({
      class: `mj-flex ${cssClass}`,
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
      class: `mj-flex-td ${cssClass ? `${cssClass}-td` : ''}`,
      align: this.getAttribute('align'),
      style: 'td',
    })}>
                ${this.childrenWrap(this.renderChildren(this.props.children, {
      renderer: this.childrenRenderer.bind(this),
    }))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
  }
}

registerComponent(MjFlex);

export default class extends Component {
  static propTypes = {
    children: node.isRequired,
  }
  render() {
    const { children, ...rest } = this.props;
    return React.createElement('mj-link', rest, children);
  }
};