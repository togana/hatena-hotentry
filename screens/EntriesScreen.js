import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Clipboard } from 'react-native';
import { Root, Container, ListItem, Body, Text, ActionSheet } from 'native-base';
import xml2js from 'react-native-xml2js';
import * as WebBrowser from 'expo-web-browser';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CategoriesContext } from '../contexts/categories';


dayjs.locale('ja');
dayjs.extend(relativeTime)

const Item = ({ item, navigation }) => {
  return (
    <ListItem>
      <TouchableOpacity
        onPress={async () => await WebBrowser.openBrowserAsync(item.link.toString())}
        onLongPress={() => ActionSheet.show(
          {
            options: [
              'URLのコピー',
              'キャンセル',
            ],
            cancelButtonIndex: 1,
            title: item.title.toString(),
          },
          buttonIndex => {
            switch(buttonIndex) {
              case 0:
                Clipboard.setString(item.link.toString());
                break;
            }
          }
        )}
      >
        <Body>
          <Text numberOfLines={2}>{item.title}</Text>
          <Text numberOfLines={3} note style={{ marginTop: 8 }}>{item.description}</Text>
          <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text note>{`${item['hatena:bookmarkcount']} users`}</Text>
            <Text note>{dayjs(item['dc:date']).fromNow()}</Text>
          </View>
        </Body>
      </TouchableOpacity>
    </ListItem>
  );
};

export default ({ route, navigation }) => {
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    let unmounted = false;

    async function loadResources() {
      try {
        const xml = await (await fetch(`https://b.hatena.ne.jp/hotentry/${route.params.key}.rss`)).text();
        const parser = xml2js.Parser();
        if (!unmounted) {
          parser.parseString(xml, (err, result) => {
            setFeed(result['rdf:RDF'].item);
          });
        }          
      } catch (e) {
        console.warn(e);
      }
    }

    loadResources();

    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, [route.params.key]);

  return (
    <Root>
      <Container>
        <FlatList
          data={feed}
          renderItem={({ item }) => <Item item={item} navigation={navigation} />}
          keyExtractor={item => item?.$?.['rdf:about']}
        />
      </Container>
    </Root>
  );
};
