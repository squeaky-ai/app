import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { ButtonGroup } from 'components/button-group';
import { PathPosition } from 'types/graphql';

interface Props {
  position: PathPosition;
  setPosition: (position: PathPosition) => void;
}

export const JourneysPosition: FC<Props> = ({ position, setPosition }) => (
  <ButtonGroup className='position'>
    <Button className={classnames(position === PathPosition.Start ? 'primary' : 'blank')} onClick={() => setPosition(PathPosition.Start)}>
      Start
    </Button>
    <Button className={classnames(position === PathPosition.End ? 'primary' : 'blank')} onClick={() => setPosition(PathPosition.End)}>
      End
    </Button>
  </ButtonGroup>
);
