import React from 'react';
import { View, FlatList } from 'react-native';
import { Container, ListItem, CheckBox, Text, Body } from 'native-base';
import { CategoriesContext } from '../contexts/categories';
import { setCategories } from '../stores';

const Item = ({ item, list, setList }) => {
  return (
    <ListItem onPress={async () => {
      const newItem = {
        ...item,
        show: !item.show
      }
      const newList = list.map(i => i.id === newItem.id ? newItem : i);
      await setCategories(newList);
      setList(newList);
    }}>
      <CheckBox checked={item.show} />
      <Body>
        <Text>{item.name}</Text>
      </Body>
    </ListItem>
  );
};

export default () => {
  return (
    <CategoriesContext.Consumer>
      {([categories, setCategories]) => (
        <Container>
          <FlatList
            data={categories}
            renderItem={({ item }) => <Item item={item} list={categories} setList={setCategories} />}
            keyExtractor={item => item.id}
          />
        </Container>
      )}
    </CategoriesContext.Consumer>
  );
};