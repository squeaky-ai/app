import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Icon } from 'components/icon';
import { Select, Option } from 'components/select';
import { useToasts } from 'hooks/use-toasts';
import { teamInvite } from 'lib/api/graphql';
import { Container } from 'components/container';
import { ADMIN, MEMBER, READ_ONLY } from 'data/teams/constants';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  handleForward: VoidFunction;
  handleBack: VoidFunction;
}

const MemberSchema = Yup.object().shape({
  email: Yup.string().email(), // We add three emails by default and they may ignore them
  role: Yup.string().oneOf([READ_ONLY.toString(), MEMBER.toString(), ADMIN.toString()], 'Please select a role'),
});

const InviteSchema = Yup.object().shape({
  members: Yup.array(MemberSchema),
});

const placeholderEmails = ['e.g. jess.smith@email.com', 'e.g. juan.morales@email.com', 'e.g. ali.khan@email.com'];

const newMember = { email: '', role: MEMBER };

export const StepInvite: FC<Props> = ({ site, handleForward, handleBack }) => {
  const toasts = useToasts();

  return (
    <div className='step step-invite'>
      <h4>Invite your team mates</h4>
      <p>We&apos;ll sent them an email inviting them to join your site.</p>

      <Formik
        initialValues={{ members: [newMember, newMember, newMember] }}
        validationSchema={InviteSchema}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              for (const member of values.members) {
                if (member.email) {
                  await teamInvite({ 
                    siteId: site.id, 
                    email: member.email, 
                    role: Number(member.role),
                  });
                }
              }
              handleForward();
            } catch(error: any) {
              console.error(error);

              toasts.add({ type: 'error', body: 'There was an error inviting your team' });
            } finally {
              setSubmitting(false);
            }
          })();
        }}
      >
        {({
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          values,
          isValid,
          dirty,
        }) => {
          const handleAdd = () => {
            setFieldValue('members', [...values.members, newMember]);
          };

          const handleRemove = (index: number) => () => {
            const members = values.members.filter((_member, i) => i !== index);
            setFieldValue('members', members);
          };

          const handleSelect = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
            const members = values.members.map((member, i) => i === index 
              ? { ...member, role: event.target.value }
              : member
            );
            setFieldValue('members', members);
          };

          const handleInput = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const members = values.members.map((member, i) => i === index 
              ? { ...member, email: event.target.value }
              : member
            );
            setFieldValue('members', members);
          };

          return (
            <form onSubmit={handleSubmit} className='fade-in'>
              <Container className='centered'>
                <div className='input-group'>
                  <div>
                    <Label>Email address</Label>
                  </div>
                  <div>
                    <Label>Role</Label>
                  </div>
                  <div />
                </div>

                {values.members.map((member, index) => (
                  <div className='input-group' key={`member-${index}`}>
                    <div>
                      <Input 
                        type='email'
                        name={`email-${index}`}
                        value={member.email}
                        onChange={handleInput(index)}
                        onBlur={handleBlur}
                        placeholder={placeholderEmails[index] || ''}
                      />
                    </div>
                    <div>
                      <Select name={`role-${index}`} value={member.role} onChange={handleSelect(index)} onBlur={handleBlur}>
                        <Option value={READ_ONLY}>Read-only</Option>
                        <Option value={MEMBER}>User</Option>
                        <Option value={ADMIN}>Admin</Option>
                      </Select>
                    </div>
                    <div>
                      {index !== 0 && (
                        <Button type='button' className='remove' onClick={handleRemove(index)}>
                          <Icon name='close-line' />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button type='button' className='link' onClick={handleAdd}>
                  + <span>Add another</span>
                </Button>
              </Container>

              <div className='footer'>
                <Button className='quaternary' type='button' onClick={handleBack}>
                  Back
                </Button>
                <div> 
                  <Button className='quaternary' type='button' onClick={handleForward}>
                    I&apos;ll do this later
                  </Button>
                  <Button className='primary' type='submit' disabled={isSubmitting || !(dirty && isValid)}>
                    Next
                  </Button>
                </div>
              </div>
            </form>
        )}}
      </Formik>
    </div>
  );
};
