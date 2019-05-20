import React from 'react';
import { FlatList } from 'react-native';
import SavedListItem from './SavedListItem';

import EmptyList from './EmptyList';

export default class SavedList extends React.Component {

  _keyExtractor = (item, index) => item.id.toString();

  onPressItem = (id) => {
    this.props.onPressItem(id);
  }

  renderItem = ({ item }) => (
    <SavedListItem
      id={item.id}
      onPressItem={this.onPressItem}
      {...item}
    />
  )
  
  render() {
    // Renders a FlatList for improved mobile performance
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderItem}
        ListEmptyComponent={EmptyList}
      />
    );
  }
}