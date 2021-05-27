import type { HTMLAttributes, MutableRefObject } from 'react';
import { useEffect, useCallback, useState, useRef } from 'react';

interface UseDropdown {
  isOpen: boolean;
  ref: MutableRefObject<HTMLDivElement>;
  close(): void;
  menuButtonProps(): HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>;
  menuItemProps(): HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>;
  menuProps(): HTMLAttributes<HTMLUListElement>;
  open(): void;
}

export default function useDropdown(id: string): UseDropdown {
  const [isOpen, setOpen] = useState(false);
  const [selectLastItem, setSelectLastItem] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => {
    setOpen(false);

    // moves the focus back to the dropdown button if existing
    const { current: dropdownElement } = ref;
    const buttonElement = dropdownElement?.querySelector<HTMLElement>(':scope > [aria-controls]');
    buttonElement?.focus();
  }, []);

  const menuProps = useCallback(
    () => ({
      id,
      role: 'menu',
    }),
    [id],
  );
  const menuButtonProps = useCallback(
    () => ({
      'aria-controls': id,
      'aria-expanded': isOpen ? true : undefined,
      'aria-haspopup': true,
    }),
    [id, isOpen],
  );
  const menuItemProps = useCallback(
    () => ({
      role: 'menuitem',
      tabIndex: -1,
    }),
    [],
  );

  /** This effect aims to manage all keyboard-related events on the button */
  useEffect(() => {
    // early-termination if the reference is not set
    const { current: dropdownElement } = ref;
    if (!dropdownElement) return;

    const handleGlobalKeydown = (event: KeyboardEvent) => {
      // early-termination if the active element is not the menu element
      const { activeElement } = document;
      const menuButtonElement = dropdownElement.querySelector<HTMLButtonElement>(
        ':scope > [aria-controls]',
      );
      if (!menuButtonElement || activeElement !== menuButtonElement) return;

      switch (event.key) {
        case 'ArrowDown':
        case 'Enter':
        case 'Space':
          event.preventDefault();

          return open();

        case 'ArrowUp':
          event.preventDefault();
          setSelectLastItem(true);

          return open();

        default:
          return;
      }
    };

    document.addEventListener('keydown', handleGlobalKeydown);

    return () => document.removeEventListener('keydown', handleGlobalKeydown);
  }, [open]);

  /** This effect aims to manage all mouse and keyboard-related events */
  useEffect(() => {
    // early-termination if the dropdown is closed
    if (!isOpen) return;

    // early-termination if the reference is not set
    const { current: dropdownElement } = ref;
    if (!dropdownElement) return;

    /** Event handler running on mouse down event to close the dropdown if applicable */
    const handleGlobalMouseDown = ({ target }): void => {
      // early-termination if the mouse event is running within the dropdown
      if (!dropdownElement || dropdownElement.contains(target)) {
        return;
      }

      // otherwise, we close the dropdown
      close();
    };

    /** Event handler running on keypress to close the dropdown if applicable */
    const handleGlobalKeydown = (event: KeyboardEvent) => {
      const currentElement = document.activeElement;
      let nodes: NodeListOf<HTMLButtonElement | HTMLAnchorElement>;
      let target: HTMLElement;

      // early-termination when the menu is closed
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          return close();

        case 'ArrowDown':
          event.preventDefault();

          // finds the next menu item
          target = currentElement.parentElement.nextElementSibling?.querySelector<
            HTMLAnchorElement | HTMLButtonElement
          >('[role="menuitem"]');

          // if there is no next menu item, move to the first one
          if (!target) {
            target = currentElement
              .closest('[role="menu"]')
              ?.querySelector<HTMLAnchorElement | HTMLButtonElement>('[role="menuitem"]');
          }
          break;

        case 'ArrowUp':
          event.preventDefault();

          // finds the previous menu item
          target = currentElement.parentElement.previousElementSibling?.querySelector<
            HTMLAnchorElement | HTMLButtonElement
          >('[role="menuitem"]');

          // if there is no previous menu item, move to the last one
          if (!target) {
            nodes = currentElement
              .closest('[role="menu"]')
              ?.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>('[role="menuitem"]');
            target = nodes ? nodes[nodes.length - 1] : undefined;
          }
          break;

        case 'End':
          event.preventDefault();

          nodes = currentElement
            .closest('[role="menu"]')
            ?.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>('[role="menuitem"]');
          target = nodes ? nodes[nodes.length - 1] : undefined;
          break;

        case 'Home':
          event.preventDefault();

          target = currentElement
            .closest('[role="menu"]')
            ?.querySelector<HTMLAnchorElement | HTMLButtonElement>('[role="menuitem"]');
          break;

        case 'Tab':
          close();
          return;

        default:
          return;
      }

      // moves to the target if existing
      if (target) target.focus();
    };

    document.addEventListener('mousedown', handleGlobalMouseDown);
    document.addEventListener('keydown', handleGlobalKeydown);

    // Unmounts the event handlers when the dropdown is unmounted
    return () => {
      document.removeEventListener('mousedown', handleGlobalMouseDown);
      document.removeEventListener('keydown', handleGlobalKeydown);
    };
  }, [close, isOpen]);

  /** This effect aims to move the focus when the menu is opened to the relevant menu item */
  useEffect(() => {
    // early-termination if the dropdown is closed
    if (!isOpen) return;

    // early-termination if the reference is not set
    const { current: dropdownElement } = ref;
    if (!dropdownElement) return;

    // identifies the menu item to receive the focus
    const menuItems = dropdownElement.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(
      '[role="menuitem"]',
    );
    if (!menuItems.length) return;
    const targetItem = selectLastItem ? menuItems[menuItems.length - 1] : menuItems[0];

    // reset the focus management system
    setSelectLastItem(false);

    // early-termination if there is no target
    if (!targetItem) return;

    // moves the focus and reset the focus management system
    targetItem.focus();
    // exhaustive deps are disabled on purpose to avoid `selectLastItem` as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return { close, isOpen, menuButtonProps, menuItemProps, menuProps, open, ref };
}
