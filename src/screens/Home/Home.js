import React from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {Avatar} from 'react-native-elements';
export default function Home(props) {
  return (
    <Container>
      <Content>
        <List>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((v, i) => (
            <ListItem avatar key={v}>
              <Left>
                <Avatar
                  title="u"
                  size={50}
                  rounded
                  source={require('../../assets/concha.png')}
                />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}
