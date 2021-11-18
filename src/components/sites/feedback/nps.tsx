import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { NoData } from 'components/sites/feedback/no-data';
import { NoResponses } from 'components/sites/feedback/no-responses';

export const Nps: FC = () => {
  return (
    <div className='nps-grid'>
      <h4 className='heading-overview'>
        Overview
      </h4>

      <Card className='card-nps'>
        <h4>NPS®</h4>
        <NoData />
      </Card>

      <Card className='card-response'>
        <h4>Responses</h4>
        <NoData />
      </Card>

      <Card className='card-ratings'>
        <h4>Ratings</h4>
        <NoData />
      </Card>

      <Card className='card-displays'>
        <div className='items'>
          <div className='item'>
            <p>Displays</p>
            <NoData short />
          </div>
          <div className='item'>
            <p>Ratings</p>
            <NoData short />
          </div>
          <div className='item'>
            <p>Response Rate</p>
            <NoData short />
          </div>
        </div>
      </Card>

      <Card className='card-results'>
        <div className='items'>
          <div className='item'>
            <p>Promoters</p>
            <NoData short />
          </div>
          <div className='item'>
            <p>Passives</p>
            <NoData short />
          </div>
          <div className='item'>
            <p>Detractors</p>
            <NoData short />
          </div>
        </div>
      </Card>

      <h4 className='heading-responses'>
        Responses
      </h4>

      <Card className='card-responses'>
        <NoResponses />
      </Card>
    </div>
  );
};
