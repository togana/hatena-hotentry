import Storage from 'react-native-storage';
// FIXME: Deprecated
// https://docs.expo.io/versions/latest/react-native/asyncstorage/
import { AsyncStorage } from 'react-native';

export const defaultCategories = [
  {
    id: 'general',
    name: '一般',
    show: true,
  },
  {
    id: 'social',
    name: '世の中',
    show: false,
  },
  {
    id: 'economics',
    name: '政治経済',
    show: false,
  },
  {
    id: 'life',
    name: '暮らし',
    show: false,
  },
  {
    id: 'knowledge',
    name: '学び',
    show: false,
  },
  {
    id: 'it',
    name: 'IT',
    show: true,
  },
  {
    id: 'fun',
    name: 'おもしろ',
    show: false,
  },
  {
    id: 'entertainment',
    name: 'エンタメ',
    show: false,
  },
  {
    id: 'game',
    name: 'ゲーム',
    show: false,
  },
];

export const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: {},
});

export const setCategories = async (data) => {
  await storage.save({
    key: '@categories',
    data,
    expires: null,
  });
}

export const getCategories = async () => {
  let categories = defaultCategories;
  try {
    categories = await storage.load({
      key: '@categories',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
        },
        someFlag: true
      }
    });    
  } catch (e) {
    console.warn(e);
  }
  return categories;
}
