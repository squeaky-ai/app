import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { Pill } from 'components/pill';
import type { Visitor } from 'types/visitor';

interface Props {
  visitor: Visitor;
}

export const VisitorHighlights: FC<Props> = ({ visitor }) => (
  <div className='visitor-highlights'>
    <Card className='recordings'>
      <h3>Recordings</h3>
      <h2>{visitor.recordingsCount.total}</h2>
      <Pill type='tertiary'>{visitor.recordingsCount.new} New</Pill>
    </Card>
    <Card className='page-views'>
      <h3>Page Views</h3>
      <h2>{visitor.pageViewsCount.total}</h2>
      <Pill>{visitor.pageViewsCount.unique} Unique</Pill>
    </Card>
  </div>
);
