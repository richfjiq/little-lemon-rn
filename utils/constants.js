import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const NOTIFICATION_OPTIONS = [
  {
    key: '@OrderStatus',
    label: 'Order statuses',
  },
  {
    key: '@PasswordChanges',
    label: 'Password changes',
  },
  {
    key: '@SpecialOffers',
    label: 'Special offers',
  },
  {
    key: '@Newsletter',
    label: 'Newsletter',
  },
];
