import { MenuProps } from 'antd';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

type MenuItemType = {
  item: MenuItem;
  link: string;
};

export class SidebarMenuItem {
  items: MenuItemType[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _currentItemKey: string = '';
  constructor(items: MenuItemType[]) {
    this.items = items;
  }

  get currentItemKey(): string {
    return this._currentItemKey;
  }

  set currentItemKey(key: string) {
    this.onlyItems.forEach((item) => {
      if (item!.key === key) {
        (item as any)['icon'] = this.cloneIcon(
          (item as any)['icon'],
          'menu-item-icon',
        );
        item!.className = 'px-4';
      } else {
        (item as any)['icon'] = this.cloneIcon(
          (item as any)['icon'],
          'text-gray-500',
        );
        item!.className = 'px-1';
      }
    });

    this._currentItemKey = key;
  }

  get onlyItems(): MenuItem[] {
    return this.items.map((item) => item.item);
  }

  findItem(itemKey: string): MenuItemType {
    const iComponent = this.items.find((item) => item.item!.key === itemKey);
    return iComponent ? iComponent : this.items[0];
  }

  private cloneIcon(item: any, className: string) {
    return React.cloneElement(item, {
      className,
    });
  }
}
