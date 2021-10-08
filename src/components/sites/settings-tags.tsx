import React from 'react';
import type { FC } from 'react';
import { Drawer } from 'components/drawer';
import { Container } from 'components/container';
import { Checkbox } from 'components/checkbox';
import { Table, Row, Cell } from 'components/table';

export const SettingsTags: FC = () => {
  return (
    <Drawer title='Tags' name='tags'>
      <Container className='md'>
        <p>You can add tags to your recordings to better document and categorise your findings. The table below lists any tags you have already created. You can delete, merge or rename tags using the options in the table.</p>

        <Table className='tags-table'>
          <Row head>
            <Cell><Checkbox /></Cell>
            <Cell>Tag name</Cell>
            <Cell>Options</Cell>
          </Row>
          <Row fluid>
            <p>There are currently no tags created for your site.</p>
          </Row>
        </Table>
      </Container>
    </Drawer>
  );
};
