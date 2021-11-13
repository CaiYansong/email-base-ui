import React, { Component } from 'react';
import { node } from 'prop-types'

import { registerDependencies, BodyComponent, registerComponent } from 'mjml-custom';

registerDependencies({
  // Tell the validator which tags are allowed as our component's children
  'mj-link': [
    'mj-section',
    'mj-group',
    'mj-column',
    'mj-image',
    'mj-text',
    'mj-table',
    'mj-raw',
  ],
  // Tell the validator which tags are allowed as our component's parent
  'mj-section': ['mj-link'],
  'mj-group': ['mj-link'],
  'mj-column': ['mj-link'],
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
class MjLink extends BodyComponent {
  constructor(initialDatas = {}) {
    super(initialDatas);
    this.cssId = Math.floor(Math.random() * 9) + 1;
  }

  // Tells the validator which attributes are allowed for mj-link
  static allowedAttributes = {
    href: 'string',
    width: 'unit(px,%)',
    display: 'enum(inline-block,inline,block)',
    padding: 'unit(px){1,4}',
    align: 'enum(left,right,center)',
    'text-decoration': 'enum(line-through,underline,overline,none)',
    'font-size': 'unit(px)',
    'background-color': 'color',
    color: 'color',
  };

  // What the name suggests. Fallback value for this.getAttribute('attribute-name').
  static defaultAttributes = {
    href: '',
    display: 'block',
    padding: 0,
    align: 'center',
    'text-decoration': 'none',
    'font-size': '20px',
    'background-color': 'transparent',
    color: '#000',
  };

  // This functions allows to define styles that can be used when rendering (see render() below)
  getStyles() {
    return {
      wrapperA: {
        // this.getAttribute(attrName) is the recommended way to access the attributes our component received in the mjml
        display: this.getAttribute('display'),
        width: this.getAttribute('width'),
        padding: this.getAttribute('padding'),
        'text-align': this.getAttribute('align'),
        'text-decoration': this.getAttribute('text-decoration'),
        'font-size': this.getAttribute('font-size'),
        'background-color': this.getAttribute('background-color'),
        color: this.getAttribute('color'),
      },
    };
  }

  handleChildrenRenderer(component) {

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
        'word-break': 'break-word',
      },
    };
    return `
              <tr>
                <td
                  ${component.htmlAttributes(htmlAttributes)}
                >
                  ${component.render()}
                </td>
              </tr>
            `;
  }

  /*
    Render is the only required function in a component.
    It must return an html string.
  */
  render() {
    const htmlAttributes = {
      class: this.getAttribute('css-class'),
      href: this.getAttribute('href'),
      target: '_blank',
      style: 'wrapperA',
    };

    const renderChildrenOpt = {
      renderer: this.handleChildrenRenderer,
    };

    return `
            <a
              ${this.htmlAttributes(htmlAttributes)}
              >
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
                <tbody>
                ${this.renderChildren(this.props.children, renderChildrenOpt)}
              </tbody>
                </table >
              </a >
            `;
  }
}

registerComponent(MjLink);

export default class extends Component {
  static propTypes = {
    children: node.isRequired,
  }
  render() {
    const { children, ...rest } = this.props;
    return React.createElement('mj-link', rest, children);
  }
};
