import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Colors from '../../constant/Colors';
import {Dialog, Portal} from 'react-native-paper';

const Loader = ({visible = false}) => {
  return (
    <Portal>
      <Dialog
        style={{backgroundColor: Colors.WHITE}}
        visible={visible}
        dismissable={false}>
        <Dialog.Content>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.MAIN1} />
            <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default Loader;
