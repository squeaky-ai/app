import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { Button } from 'components/button';
import { BASE_PATH } from 'data/common/constants';

interface Feature {
  icon: string;
  name: string;
  image: string;
  text: string;
}

const features: Feature[] = [
  {
    icon: 'ri-cursor-line',
    name: 'Seemless recordings',
    image: 'seamless-recording.jpg',
    text: 'Our session recording tool helps you discover new opportunities to improve your product or service by showing you exactly what your visitors got up to.',
  },
  {
    icon: 'ri-information-line',
    name: 'Detailed Session Info',
    image: 'detailed-session-info.jpg',
    text: 'Watching how visitors use your site is vital, but so is context, which is why we provide detailed session information alongside every recording.',
  },
  {
    icon: 'ri-compass-discover-line',
    name: 'Easy to Navigate',
    image: 'easy-to-navigate.jpg',
    text: 'Browse your recordings via page visits and activity, or quickly scroll through the playback timeline.',
  },
  {
    icon: 'ri-price-tag-3-line',
    name: 'Add notes & tags',
    image: 'add-notes-and-tags.jpg',
    text: 'Use notes and tags to track and organise user behaviour, site issues, activty and actions that need addressing later.',
  },
  {
    icon: 'ri-line-chart-line',
    name: 'Undertand your traffic',
    image: 'understand-your-traffic.jpg',
    text: 'Get precise data on visitor numbers and page views so you can see exactly how your traffic fluctuates over time.',
  },
  {
    icon: 'ri-window-line',
    name: 'Determine which content matters',
    image: 'determine-which-content-matters.jpg',
    text: 'By highlighting your most popular content Squeaky enables you to focus attention on the most important pages for your users. ',
  },
  {
    icon: 'ri-group-line',
    name: 'Solve for the right users',
    image: 'solve-for-the-right-users.jpg',
    text: 'Knowing how your users are browsing helps you to focus performance improvements on the devices and browsers that your clients use most.',
  },
];

export const Features: FC = () => {
  const [feature, setFeature] = React.useState<Feature>(features[0]);

  const index = features.findIndex(f => f.name === feature.name);

  const handlePrev = () => {
    setFeature(features[index - 1]);
  };

  const handleNext = () => {
    setFeature(features[index + 1]);
  };

  return (
    <Card className='features-card'>
      <div className='header'>
        <Button className='prev' onClick={handlePrev} disabled={index === 0}>
          <i className='ri-arrow-left-line' />
        </Button>

        <h4>
          <i className={feature.icon} />
          {feature.name}
        </h4>

        <Button className='next' onClick={handleNext} disabled={index === features.length - 1}>
          <i className='ri-arrow-right-line' />
        </Button>
      </div>

      <div className='image'>
        <div className='slider' style={{ transform: `translateX(-${index * 100 / 7}%)` }}>
          {features.map(feature => (
            <img key={feature.image} src={`${BASE_PATH}/features/${feature.image}`} />
          ))}
        </div>
      </div>

      <p className='text'>
        {feature.text}
      </p>
    </Card>
  )
};
