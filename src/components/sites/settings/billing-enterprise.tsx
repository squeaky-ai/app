import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { last } from 'lodash';
import { Container } from 'components/container';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { toDecimalCurrency } from 'lib/currency';
import type { Site } from 'types/graphql';
import type { Billing } from 'types/billing';

import enterpriseLogo from '../../../../public/enterprise.svg';

interface Props {
  site: Site;
  billing: Billing;
  hasBilling: boolean;
}

const getResponseTimeText = (duration: number) => {
  if (duration === 0) {
    return 'Same day';
  }
  if (duration === 24) {
    return '24 hours';
  }
  if (duration === 168) {
    return '7 days';
  }

  return '';
};

export const BillingEnterprise: FC<Props> = ({ billing }) => {
  const tierName = billing.plan.name.replace('Enterprise', '');
  const latestTransaction = last(billing.billing?.transactions);

  return (
    <div className='billing-enterprise'>
      <Container className='md'>
        <div className='enterprise-message'>
          <Icon name='building-line' />
          <p>You&apos;re on a Squeaky Enterprise plan. If you&apos;d like to discuss changes to your subscription or billing, please get in touch via <a href='mailto:hello@squeaky.ai'>hello@squeaky.ai</a>.</p>
        </div>

        <Card className='enterprise-card'>
          <div className='enterprise-heading'>
            <div className='enterprise-logo'>
              <Image src={enterpriseLogo} height={80} width={80} alt='Squeaky enterprise logo' />
            </div>
            <div className='title'>
              <h4>Enterprise</h4>
              <h4>{tierName}</h4>
            </div>
            <div className='discounts'>
              {latestTransaction?.discountName && (
                <>
                  <p>Discounts:</p>
                  {latestTransaction.discountPercentage && (
                    <p>{latestTransaction.discountName} <span>{Number(latestTransaction.discountPercentage)}%</span></p>
                  )}
                  {latestTransaction.discountAmount && (
                    <p>{latestTransaction.discountName} <span>{CURRENCY_SYMBOLS[latestTransaction.currency]}{toDecimalCurrency(latestTransaction.discountAmount)}</span></p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className='core-product'>
            <h5>Core Product</h5>

            <ul>
              <li>
                <Icon name='check-line' />
                Unlimited team
              </li>
              <li>
                <Icon name='check-line' />
                Analytics
              </li>
              <li>
                <Icon name='check-line' />
                Privacy controls
              </li>
              <li>
                <Icon name='check-line' />
                Recordings
              </li>
              <li>
                <Icon name='check-line' />
                Feedback
              </li>
              <li>
                <Icon name='check-line' />
                Screening
              </li>
              <li>
                <Icon name='check-line' />
                Visitor profiles
              </li>
              <li>
                <Icon name='check-line' />
                Heatmaps
              </li>
            </ul>
          </div>

          <div className='configuration'>
            <h5>{tierName} Configuration</h5>

            <div className='config'>
              <div className='details'>
                <p className='heading'>Maximum visits per month</p>
                <p>{billing.plan.maxMonthlyRecordings.toLocaleString()}</p>

                <p className='heading'>SLA</p>
                <p>Support type: {billing.plan.support.join(', ')}</p>
                <p>Response time: {getResponseTimeText(billing.plan.responseTimeHours)} (<Link href='#'>business hours</Link>)</p>

                <p className='heading'>Data retention</p>
                <p>
                  {billing.plan.dataStorageMonths === -1
                    ? 'Forever'
                    : `${billing.plan.dataStorageMonths} months`
                  }
                </p>

                <p className='heading'>SSO</p>
                <p>{billing.plan.ssoEnabled ? 'Yes' : 'No'}</p>

                <p className='heading'>Audit Trail</p>
                <p>{billing.plan.auditTrailEnabled ? 'Yes' : 'No'}</p>

                <p className='heading'>Private Instance</p>
                <p>{billing.plan.privateInstanceEnabled ? 'Yes' : 'No'}</p>
              </div>

              <div className='notes'>
                <div className='note'>
                  <p className='heading'>Notes</p>
                  <p>{billing.plan.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};
