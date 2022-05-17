/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Field from '../utils/svg/field_big.svg';
import Button from '../utils/svg/button.svg';
import Position from '../utils/svg/position.svg';
import {useNavigation} from '@react-navigation/native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const fieldWidth = width - 110;

const SelectPostion = () => {
  const [selectedPositions, setSelectedPositions] = useState([]);
  const navigation = useNavigation();

  const submitPositions = () => {
    navigation.navigate('SelectCategories', {name: 'SelectCategories'});
  };

  const togglePosition = pos => {
    let newPostionsList = [...selectedPositions];
    if (selectedPositions.includes(pos)) {
      let index = selectedPositions.indexOf(pos);
      newPostionsList.splice(index, 1);
    } else {
      newPostionsList.push(pos);
    }
    return setSelectedPositions(newPostionsList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your position?</Text>
      <View style={styles.fieldView}>
        <Field width={fieldWidth} />
        <TouchableOpacity
          onPress={e => togglePosition('ST')}
          style={
            selectedPositions.includes('ST')
              ? {
                  ...styles.position,
                  ...styles.stPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.stPosition}
          }>
          <Position />
          <Text style={styles.positionName}>ST</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('RW')}
          style={
            selectedPositions.includes('RW')
              ? {
                  ...styles.position,
                  ...styles.rwPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.rwPosition}
          }>
          <Position />
          <Text style={styles.positionName}>RW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('LW')}
          style={
            selectedPositions.includes('LW')
              ? {
                  ...styles.position,
                  ...styles.lwPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.lwPosition}
          }>
          <Position />
          <Text style={styles.positionName}>LW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('CAM')}
          style={
            selectedPositions.includes('CAM')
              ? {
                  ...styles.position,
                  ...styles.camPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.camPosition}
          }>
          <Position />
          <Text style={styles.positionName}>CAM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('CM')}
          style={
            selectedPositions.includes('CM')
              ? {
                  ...styles.position,
                  ...styles.cmPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.cmPosition}
          }>
          <Position />
          <Text style={styles.positionName}>CM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('DM')}
          style={
            selectedPositions.includes('DM')
              ? {
                  ...styles.position,
                  ...styles.dmPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.dmPosition}
          }>
          <Position />
          <Text style={styles.positionName}>DM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('RB')}
          style={
            selectedPositions.includes('RB')
              ? {
                  ...styles.position,
                  ...styles.rbPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.rbPosition}
          }>
          <Position />
          <Text style={styles.positionName}>RB</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('CBR')}
          style={
            selectedPositions.includes('CBR')
              ? {
                  ...styles.position,
                  ...styles.cbrPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.cbrPosition}
          }>
          <Position />
          <Text style={styles.positionName}>CB</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('CBL')}
          style={
            selectedPositions.includes('CBL')
              ? {
                  ...styles.position,
                  ...styles.cblPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.cblPosition}
          }>
          <Position />
          <Text style={styles.positionName}>CB</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('LB')}
          style={
            selectedPositions.includes('LB')
              ? {
                  ...styles.position,
                  ...styles.lbPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.lbPosition}
          }>
          <Position />
          <Text style={styles.positionName}>LB</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => togglePosition('GK')}
          style={
            selectedPositions.includes('GK')
              ? {
                  ...styles.position,
                  ...styles.gkPosition,
                  ...styles.selectedPosition,
                }
              : {...styles.position, ...styles.gkPosition}
          }>
          <Position />
          <Text style={styles.positionName}>GK</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={submitPositions} style={styles.buttonView}>
        <Button width={width} height={50} />
        <Text style={styles.buttonText}>Confirm and Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectPostion;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 0,
    height,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  fieldView: {
    position: 'relative',
  },
  buttonView: {
    flex: 1,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    top: 15,
    right: 0,
    left: 0,
  },
  position: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  selectedPosition: {
    borderColor: '#EC2027',
    borderWidth: 1,
  },
  positionName: {
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    paddingTop: 15,
    color: '#EC2027',
  },
  stPosition: {
    top: '15%',
    left: fieldWidth / 2 - 25,
  },
  rwPosition: {
    top: '20%',
    right: '5%',
  },
  lwPosition: {
    top: '20%',
    left: '5%',
  },
  camPosition: {
    top: '30%',
    left: fieldWidth / 2 - 25,
  },
  cmPosition: {
    top: '40%',
    left: '10%',
  },
  dmPosition: {
    top: '45%',
    right: '10%',
  },
  rbPosition: {
    bottom: '30%',
    right: '5%',
  },
  cbrPosition: {
    bottom: '20%',
    right: '15%',
  },
  cblPosition: {
    bottom: '20%',
    left: '15%',
  },
  lbPosition: {
    bottom: '30%',
    left: '5%',
  },
  gkPosition: {
    bottom: '10%',
    left: fieldWidth / 2 - 25,
  },
});
