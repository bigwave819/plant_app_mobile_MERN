import { DrawerNavigationProp } from '@react-navigation/drawer';

export type HomeDrawerParamList = {
  index: undefined;
  categories: undefined;
  wishlist: undefined;
  orders: undefined;
  settings: undefined;
};

export type HomeDrawerNavigationProp = DrawerNavigationProp<HomeDrawerParamList>;