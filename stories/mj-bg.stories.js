import React from 'react';

import MjBg from '../packages/mj-bg/lib/mj-bg';

export default {
  title: 'EDM/mg-bg',
  component: MjBg,
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
            <mj-bg
              inner-padding="50px"
              background-url="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1314400435,2027077880&fm=26&gp=0.jpg"
              background-size="100% 100%"
            >
              <mj-text>mj bg</mj-text>
            </mj-bg>
            <MjBg
              inner-padding="50px"
              background-url="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1314400435,2027077880&fm=26&gp=0.jpg"
              background-size="100% 100%"
            >
              <mj-text>mj bg</mj-text>
            </MjBg>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  );
}

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = 'Base mj-bg';