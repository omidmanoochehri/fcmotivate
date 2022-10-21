/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Field from '../utils/svg/field.svg';
import Cone from '../utils/svg/cones.svg';
import Goal from '../utils/svg/goal.svg';
import Checkmark from '../utils/svg/checkmark.svg';
import Play from '../utils/svg/play.svg';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const WithoutTheBall = ({props}) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        paddingVertical: 70,
      }}>
      <View style={{paddingVertical: 20}}>
        <View style={styles.youWillNeedContainer}>
          <Text style={{...styles.mainTitle, marginLeft: 20}}>
            You Will Need
          </Text>
          <View style={styles.youWillNeed}>
            <View style={styles.youWillNeedItem}>
              <Field style={styles.youWillNeedIcon} width={40} height={40} />
              <Text style={styles.youWillNeedText}>1/2 Field</Text>
            </View>
            <View style={styles.youWillNeedItem}>
              <Cone style={styles.youWillNeedIcon} width={40} height={40} />
              <Text style={styles.youWillNeedText}>10x Cones</Text>
            </View>
            <View style={styles.youWillNeedItem}>
              <Goal style={styles.youWillNeedIcon} width={40} height={40} />
              <Text style={styles.youWillNeedText}>Goal</Text>
            </View>
            <View style={styles.youWillNeedItem}>
              <Goal style={styles.youWillNeedIcon} width={40} height={40} />
              <Text style={styles.youWillNeedText}>2x Mini Goal</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Lorem Ipsum</Text>
          <Text style={styles.description}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
            repudiandae alias perferendis, asperiores obcaecati officiis nihil
            veniam harum, nam enim quam dolor, eius ut ex consequatur ipsum
            error fugit ullam. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aliquam minima at esse quaerat itaque quidem
            assumenda nisi, corporis dolore? Eaque natus ratione, placeat esse
            dicta maxime excepturi sed quibusdam. Illo! Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Rem repudiandae alias
            perferendis, asperiores obcaecati officiis nihil veniam harum, nam
            enim quam dolor, eius ut ex consequatur ipsum error fugit ullam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            minima at esse quaerat itaque quidem assumenda nisi, corporis
            dolore? Eaque natus ratione, placeat esse dicta maxime excepturi sed
            quibusdam. Illo! Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Rem repudiandae alias perferendis, asperiores obcaecati
            officiis nihil veniam harum, nam enim quam dolor, eius ut ex
            consequatur ipsum error fugit ullam. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Aliquam minima at esse quaerat itaque
            quidem assumenda nisi, corporis dolore? Eaque natus ratione, placeat
            esse dicta maxime excepturi sed quibusdam. Illo!
          </Text>
        </ScrollView>
        <View style={styles.youWillImprove}>
          <Text style={styles.mainTitle}>You Will Improve</Text>
          <View>
            <View style={styles.youWillImproveItem}>
              <Checkmark
                style={styles.youWillImproveIcon}
                width={20}
                height={20}
              />
              <Text style={styles.youWillImproveText}>Your 1v1 defending</Text>
            </View>
            <View style={styles.youWillImproveItem}>
              <Checkmark
                style={styles.youWillImproveIcon}
                width={20}
                height={20}
              />
              <Text style={styles.youWillImproveText}>Your aerial ability</Text>
            </View>
            <View style={styles.youWillImproveItem}>
              <Checkmark
                style={styles.youWillImproveIcon}
                width={20}
                height={20}
              />
              <Text style={styles.youWillImproveText}>
                Your Speed & Explosiveness
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.phases}>
          <Text style={styles.mainTitle}>Phases</Text>
          <View>
            <View style={styles.phaseItem}>
              <LinearGradient
                colors={['#5c6165', '#1d2328']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.phaseItemGradient}>
                <Text style={styles.phaseTitle}>Day 1</Text>
                <Play width={30} height={30} />
              </LinearGradient>
            </View>
            <View style={styles.phaseItem}>
              <LinearGradient
                colors={['#5c6165', '#1d2328']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.phaseItemGradient}>
                <Text style={styles.phaseTitle}>Day 2</Text>
                <Play width={30} height={30} />
              </LinearGradient>
            </View>
            <View style={styles.phaseItem}>
              <LinearGradient
                colors={['#5c6165', '#1d2328']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.phaseItemGradient}>
                <Text style={styles.phaseTitle}>Day 3</Text>
                <Play width={30} height={30} />
              </LinearGradient>
            </View>
            <View style={styles.phaseItem}>
              <LinearGradient
                colors={['#5c6165', '#1d2328']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.phaseItemGradient}>
                <Text style={styles.phaseTitle}>Day 4</Text>
                <Play width={30} height={30} />
              </LinearGradient>
            </View>
            <TouchableOpacity style={styles.phaseItem}>
              <LinearGradient
                colors={['#5c6165', '#1d2328']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.phaseItemGradient}>
                <Text style={styles.phaseTitle}>Day 5</Text>
                <Play width={30} height={30} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WithoutTheBall;

const styles = StyleSheet.create({
  youWillNeedContainer: {},
  youWillNeed: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    padding: 20,
  },
  youWillNeedItem: {
    display: 'flex',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  youWillNeedIcon: {
    marginHorizontal: 'auto',
  },
  youWillNeedText: {
    color: 'gray',
    fontSize: 12,
    marginTop: 7,
    textAlign: 'center',
  },
  descriptionContainer: {
    height: height / 2,
    backgroundColor: '#000',
    marginHorizontal: 20,
    borderRadius: 17,
    padding: 30,
    overflow: 'visible',
  },
  descriptionTitle: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  description: {
    color: '#fff',
    textAlign: 'justify',
    fontWeight: '300',
  },
  mainTitle: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '900',
  },
  youWillImprove: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  youWillImproveItem: {
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  youWillImproveText: {
    color: '#fff',
  },
  youWillImproveIcon: {
    marginRight: 7,
  },
  phases: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  phaseItem: {
    marginVertical: 7,
  },
  phaseItemGradient: {
    borderRadius: 27,
    overflow: 'hidden',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phaseTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
  },
});
