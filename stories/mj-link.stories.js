import React from 'react';

import MjLink from '../packages/mj-link/lib/mj-link';

export default {
  title: 'EDM/mg-link',
  component: MjLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => {
  return (
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>111</mj-text>
          </mj-column>
          <mj-column>
            <mj-link
              href="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1314400435,2027077880&fm=26&gp=0.jpg"
            >
              <mj-text>mj link</mj-text>
            </mj-link>
            <MjLink
              href="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1314400435,2027077880&fm=26&gp=0.jpg"
            >
              <mj-text>mj link</mj-text>
            </MjLink>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  );
}

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = 'Base mj-bg';