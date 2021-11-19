import React from 'react';
import type { FC } from 'react';
import { Toggle } from 'components/toggle';
import { Spinner } from 'components/spinner';
import { Error } from 'components/error';
import { useFeedback } from 'hooks/use-feedback';
import { feedbackUpdate } from 'lib/api/graphql';
import { Container } from 'components/container';
import { Radio } from 'components/radio';
import { Input } from 'components/input';
import { Checkbox } from 'components/checkbox';
import { Option, Select } from 'components/select';
import type { FeedbackUpdateMutationInput } from 'types/feedback';
import type { Site } from 'types/site';

interface Props {
  site: Site;
}

export const NpsSettings: FC<Props> = ({ site }) => {
  const { loading, error, feedback } = useFeedback();

  const onUpdate = async (input: Partial<FeedbackUpdateMutationInput>): Promise<void> => {
    await feedbackUpdate({
      siteId: site.id,
      ...input,
    });
  };

  const onToggleEnableNps = async () => {
    await onUpdate({ npsEnabled: !feedback.npsEnabled });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='nps-settings'>
      <Toggle checked={feedback.npsEnabled} onChange={onToggleEnableNps}>
        Use NPS® Survey
      </Toggle>

      {feedback.npsEnabled && (
        <Container className='md'>
          <h4>Accent Colour</h4>

          <p>Set an accent colour for the survey by using the preset colours below, or defining your own custom colour by checking the box and enter a hex code.</p>

          <div className='colors'>
            <Radio className='color-radio'>
              <div className='color blue' />
            </Radio>
            <Radio className='color-radio'>
              <div className='color magenta' />
            </Radio>
            <Radio className='color-radio'>
              <div className='color purple' />
            </Radio>
            <Radio className='color-radio'>
              <div className='color gray' />
            </Radio>

            <p>- or - </p>

            <Radio />
            <Input className='hex' placeholder='e.g. #2CE21C' />
          </div>

          <h4>Scheduling</h4>

          <p>Use the options below to set the frequency with which your visitors are asked to complete the NPS survey. Typically companies do this once per month, or once every 3 months.</p>

          <p><b>Frequeny per visitor</b></p>

          <div className='frequency'>
            <Input />
            times per
            <Select>
              <Option>Month</Option>
            </Select>
          </div>

          <h4>Form options</h4>

          <p><b>Question phrasing</b></p>

          <p>We use the standard NPS question phrasing, but you can partially edit the question below.</p>

          <div className='phrasing'>
            How likely is it that you would recommend
            <Input />
            to a friend or colleague?
          </div>

          <p><b>Follow-up questions</b></p>

          <p>Whilst NPS® is only a simple 1-10 rating, there is typically a follow-up question included, and sometimes the ability to opt-in the receiving a response to submitted feedback. You can choose whether or not to display these properties using the checkboxes below.</p>

          <div className='checkbox-group'>
            <Checkbox>
              Include follow up question "What's the main reason for your score?"
            </Checkbox>
            <Checkbox>
              Allow visitors to consent to being contact by email
            </Checkbox>
          </div>

          <h4>Layout</h4>

          <p>Choose whether you want your NPS® survey to appear as a full width banner or in a narrower boxed layout.</p>
          
          <div className='radio-group'>
            <Radio>
              Full width
            </Radio>
            <Radio>
              Boxed
            </Radio>
          </div>
        </Container>
      )}
    </div>
  );
};
