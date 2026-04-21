import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { images } from '../assets';
import CustomTextInput from '../components/CustomTextInput';
import MenuListItem from '../components/MenuListItem';
import MenuListHeader from '../components/MenuListHeader';
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from '../utils/database';
import { useDebounce } from '../hooks/useDebounce';

const Home = () => {
  const [searchString, setSearchString] = useState('');
  const debouncedValue = useDebounce(searchString, 500);
  const [openInput, setOpenInput] = useState(false);
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState({
    starters: false,
    mains: false,
    desserts: false,
  });
  console.log('activeCategory ++++++', activeCategory);
  const onCategoryPress = (category) => {
    setActiveCategory((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
      );
      const parsedData = await res.json();
      return parsedData.menu;
    } catch (error) {
      console.log('+++++ fetchData error +++++', error);
    }
  };

  const renderItem = ({ item }) => {
    return <MenuListItem item={item} />;
  };

  const headerList = useMemo(
    () => (
      <MenuListHeader
        searchString={searchString}
        setSearchString={setSearchString}
        openInput={openInput}
        setOpenInput={setOpenInput}
        onCategoryPress={onCategoryPress}
        activeCategory={activeCategory}
      />
    ),
    [searchString, openInput, activeCategory],
  );

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuitems = await getMenuItems();
        if (menuitems.length === 0) {
          menuitems = await fetchData();
          saveMenuItems(menuitems);
        }
        setMenu(menuitems);
      } catch (error) {
        console.log('error +++++', error);
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const categories = Object.keys(activeCategory).filter(
          (key) => activeCategory[key],
        );
        const menuitems = await filterByQueryAndCategories(
          debouncedValue,
          categories,
        );
        console.log('+++++++++++++++++', menuitems);
        setMenu(menuitems);
      } catch (error) {
        console.log('error +++++', error);
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, [activeCategory, debouncedValue]);

  return (
    <FlatList
      keyExtractor={(item) => `${item.name}`}
      data={menu}
      renderItem={renderItem}
      ListHeaderComponent={headerList}
      ListFooterComponent={() => <View style={styles.footer} />}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#495E57',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'Karla-Regular',
    fontSize: 48,
    color: '#F4CE14',
  },
  subHeader: {
    fontFamily: 'Karla-Regular',
    fontSize: 26,
    color: 'white',
  },
  heroContainer: {
    flexDirection: 'row',
  },
  heroImage: {
    width: '100%',
    // height: 90,
    resizeMode: 'contain',
  },
  heroTextContainer: {
    flex: 2 / 3,
  },
  heroImageContainer: {
    flex: 1 / 3,
    paddingLeft: 8,
  },
  regularText: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    color: 'white',
    marginTop: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51,51,51,0.2)',
  },
  title: {
    fontFamily: 'MarkaziText-Regular',
    fontSize: 26,
    color: '#333333',
    fontWeight: '600',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  categoryButton: {
    backgroundColor: '#EDEFEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: 'MarkaziText-Regular',
    fontSize: 14,
    color: '#495E57',
    fontWeight: '600',
  },
  footer: {
    height: 48,
  },
});
