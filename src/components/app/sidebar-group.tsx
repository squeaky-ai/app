import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { without } from 'lodash';
import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { Preferences, Preference } from 'lib/preferences';

interface Props {
  name: string;
  visible: boolean;
  children: React.ReactNode;
}

export const SidebarGroup: FC<Props> = ({ name, visible, children }) => {
  const [open, setOpen] = React.useState(true);

  const toggleOpen = () => {
    const preferences = Preferences.getArray(Preference.SIDEBAR_COLLAPSED);

    const items = open
      ? Array.from(new Set([...preferences, name]))
      : without(preferences, name)

    Preferences.setArray(Preference.SIDEBAR_COLLAPSED, items);

    setOpen(!open);
  };

  React.useEffect(() => {
    const preferences = Preferences.getArray(Preference.SIDEBAR_COLLAPSED);

    if (preferences.includes(name)) {
      setOpen(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={classnames('group', { open, visible })}>
      <Divider>
        <Button onClick={toggleOpen}>{name}</Button>
      </Divider>

      {open && children}
    </div>
  );
};
