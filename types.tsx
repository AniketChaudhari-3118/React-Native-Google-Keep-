// types.ts
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type DrawerParamList = {
  Settings: undefined;
  // Add other screens if needed
};

// Add other types as needed
export type DrawerNavProp = DrawerNavigationProp<DrawerParamList>;