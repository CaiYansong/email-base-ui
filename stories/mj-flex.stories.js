import React from 'react';

import MjFlex from '../packages/mj-flex/lib/mj-flex';

export default {
  title: 'EDM/mg-flex',
  component: MjFlex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => {
  return (
    <mjml>
      <mj-body>
        <MjFlex css-class="1" child-direction="row" out-padding="0 0 16px 0" padding="12px 16px" background-color="#f5f5f5" white-space="nowrap">
          <mj-div css-class="21" width="32%" padding="0" background-color="#ffffff">
            <mj-image css-class="img" padding="0" src="https://ae01.alicdn.com/kf/He70e39fdf3644f28982de9d2bbd41445x.jpg_350x350.jpg_Q90.jpg" />
            <mj-text padding="8px" font-size="30px" color="#333333">US $1.00</mj-text>
            <mj-text padding="0 8px 8px" font-size="30px" color="#999999" text-decoration='line-through'>US $2.00</mj-text>
          </mj-div>
          <mj-div width="2%" padding="0"><mj-text padding="0" /></mj-div>
          <mj-div css-class="22" width="32%" padding="0" background-color="#ffffff">
            <mj-image css-class="img" padding="0" src="https://ae01.alicdn.com/kf/He70e39fdf3644f28982de9d2bbd41445x.jpg_350x350.jpg_Q90.jpg" />
            <mj-text padding="8px" font-size="30px" color="#333333">US $100.00</mj-text>
            <mj-text padding="0 8px 8px" font-size="30px" color="#999999" text-decoration='line-through'>US $200.00</mj-text>
          </mj-div>
          <mj-div width="2%" padding="0"><mj-text padding="0" /></mj-div>
          <mj-div css-class="23" width="32%" padding="0" background-color="#ffffff">
            <mj-image css-class="img" padding="0" src="https://ae01.alicdn.com/kf/He70e39fdf3644f28982de9d2bbd41445x.jpg_350x350.jpg_Q90.jpg" />
            <mj-text padding="8px" font-size="30px" color="#333333">abcdefghijklmnopqrstuvwxyz</mj-text>
            <mj-text padding="8px" font-size="30px" color="#333333">US$1000000000.00</mj-text>
            <mj-text padding="0 8px 8px" font-size="30px" color="#999999" text-decoration='line-through'>US $20000000000.00</mj-text>
          </mj-div>
        </MjFlex>

        <MjFlex css-class="1" child-direction="row" padding="10px" background-color="gray" border-radius="10px" white-space="nowrap">
          <mj-div css-class="21" padding="0" vertical-align="middle" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text color="#333">left one</mj-text>
          </mj-div>
          <mj-div width="2%" padding="0"><mj-text padding="0" /></mj-div>
          <mj-div css-class="22" padding="0" width="40%">
            <mj-div css-class="32" height="60px" out-padding="0 0 8px 0" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
              <mj-text color="#333">right two</mj-text>
            </mj-div>
            <mj-div css-class="33" height="60px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
              <mj-text color="#333">right two</mj-text>
            </mj-div>
          </mj-div>
        </MjFlex>

        <MjFlex css-class="1" child-direction="row" padding="10px" background-color="gray" border-radius="10px" white-space="nowrap">
          <mj-div css-class="21" padding="0" height="50px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text color="#333">height: 50px</mj-text>
          </mj-div>
          <mj-div width="2%" padding="0"><mj-text padding="0" /></mj-div>
          <mj-div css-class="22" padding="0" width="40%">
            <mj-div css-class="32" height="54px" out-padding="0 0 8px 0" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
              <mj-text color="#333">right two</mj-text>
            </mj-div>
            <mj-div css-class="33" height="54px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
              <mj-text color="#333">right two</mj-text>
            </mj-div>
          </mj-div>
        </MjFlex>

        <MjFlex css-class="table1" child-direction="row" height="100px" padding="10px" background-color="gray" border-radius="10px" white-space="nowrap">
          <mj-div css-class="table21" width="50%" out-padding="0 5px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" color="#333">row</mj-text>
            <mj-text container-background-color="red" color="#333">row</mj-text>
          </mj-div>
          <mj-div css-class="table22" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" color="#333">row</mj-text>
          </mj-div>
          <mj-div css-class="table23" out-padding="5px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-div css-class="33" out-padding="5px" padding="10px" border="1px solid blue" background-color="pink" border-radius="10px">
              <mj-text container-background-color="red" color="#333">row</mj-text>
            </mj-div>
          </mj-div>
          <mj-div css-class="table24" display="block" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" color="#333">row</mj-text>
          </mj-div>
        </MjFlex>

        <MjFlex css-class="table1" height="300px" child-direction="column" padding="10px" background-color="gray" border-radius="10px" white-space="nowrap">
          <mj-div css-class="table21" width="50%" out-padding="0 5px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" color="#333">column</mj-text>
          </mj-div>
          <mj-div css-class="table22" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" color="#333">column</mj-text>
          </mj-div>
          <mj-div css-class="table23" out-padding="5px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-div css-class="33" out-padding="5px" padding="10px" border="1px solid blue" background-color="pink" border-radius="10px">
              <mj-text container-background-color="red" color="#333">column</mj-text>
            </mj-div>
          </mj-div>
          <mj-div css-class="table24" display="block" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" color="#333">column</mj-text>
          </mj-div>
        </MjFlex>
      </mj-body>
    </mjml>
  );
}

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = 'Base mj-bg';