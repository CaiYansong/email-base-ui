// .storybook/preview.js
// 需要配合 main.js 使用
import React, { useEffect } from 'react';
import ReactDomServer from 'react-dom/server';

import mjml2html from 'mjml-custom';

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*'
  }
}

let hasStyle = false;

export const decorators = [(Story) => {
  const ele = React.createElement(Story);
  const ref = React.createRef();
  const mjmlDsl = ReactDomServer.renderToStaticMarkup(ele);
  useEffect(() => {
    if (ref.current.contentWindow.document) {
      const iframeDoc = ref.current.contentWindow.document;
      iframeDoc.open();
      let html = mjmlDsl;
      if (mjmlDsl.indexOf('<mjml>') >= 0) {
        const mjml = mjml2html(mjmlDsl, {
          keepComments: false,
          beautify: false,
          minify: true,
          validationLevel: 'strict',
        });
        // console.log('mjml', mjml)
        html = mjml.html
      }
      iframeDoc.write(html)
      iframeDoc.close();
    }
  });

  useEffect(() => {
    if (hasStyle) {
      return;
    }
    const style = document.createElement('style');
    style.innerHTML = `
    html,
    body,
    #root {
      height: 100%;
    }
    .sb-show-main.sb-main-padded {
      padding: 0;
    }
    `;
    document.querySelector('head').appendChild(style);
    hasStyle = true;
  }, []);

  return (<iframe ref={ref} style={{ width: '100%', height: '100%', border: 'none', }} />)
}];
