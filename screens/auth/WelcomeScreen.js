import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { rw } from '../../responsive';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.foxlearnLogin}>
      <LinearGradient
        style={[styles.foxlearnLoginChild, styles.foxlearnPosition]}
        locations={[0, 1]}
        colors={['#f3e7d5', '#f5ede2']}
      />
      <Image
        style={styles.foxlearnLoginItem}
        contentFit="cover"
        source={require('../../assets/vector-1.png')}
      />
      <Image
        style={[styles.foxlearnLoginInner, styles.foxlearnPosition]}
        contentFit="cover"
        source={require('../../assets/rectangle-10.png')}
      />
      {/* <View style={styles.rectangleView} /> */}
      <Image
        style={styles.vectorIcon}
        contentFit="cover"
        source={require('../../assets/vector.png')}
      />
      <Image
        style={styles.ellipseIcon}
        contentFit="cover"
        source={require('../../assets/ellipse-1.png')}
      />
      <Image
        style={styles.foxlearnLoginChild1}
        contentFit="cover"
        source={require('../../assets/ellipse-2.png')}
      />
      <View style={[styles.vectorParent, styles.groupChildLayout]}>
        <Image
          style={[styles.groupChild, styles.groupChildLayout]}
          contentFit="cover"
          source={require('../../assets/rectangle-9.png')}
        />
        <TouchableOpacity
          style={styles.signInWrapper}
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text style={[styles.signIn, styles.signInTypo]}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.createAnAccount, styles.signInTypo]}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text>Create an account</Text>
      </TouchableOpacity>
      <Text style={[styles.applearn, styles.applearnFlexBox]}>
        <Text style={styles.app}>App</Text>
        <Text style={styles.learn}>learn</Text>
      </Text>
      <Text
        style={[
          styles.welcomeToNew,
          styles.applearnFlexBox,
        ]}>{`Welcome to new platform of
        e-learning. Let’s learn.`}</Text>
      <Image
        style={styles.foxlearnIcon}
        contentFit="cover"
        source={require('../../assets/foxlearn.png')}
      />
      <Image
        style={[styles.foxlearnLoginChild2, styles.foxlearnChildLayout]}
        contentFit="cover"
        source={require('../../assets/ellipse-3.png')}
      />
      <Image
        style={[styles.foxlearnLoginChild3, styles.foxlearnChildLayout]}
        contentFit="cover"
        source={require('../../assets/ellipse-5.png')}
      />
      <Image
        style={styles.foxlearnLoginChild4}
        contentFit="cover"
        source={require('../../assets/ellipse-4.png')}
      />
      <Image
        style={styles.image6Icon}
        contentFit="cover"
        source={require('../../assets/image-6.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  foxlearnPosition: {
    width: rw(375),
    left: 0,
    position: 'absolute',
  },
  groupChildLayout: {
    height: 50,
    width: rw(279),
    position: 'absolute',
  },
  signInTypo: {
    textAlign: 'left',
    lineHeight: 25,
    fontSize: 16,
    position: 'absolute',
  },
  applearnFlexBox: {
    textAlign: 'center',
    position: 'absolute',
  },
  foxlearnChildLayout: {
    height: 18,
    width: 18,
    position: 'absolute',
  },
  foxlearnLoginChild: {
    backgroundColor: 'transparent',
    top: 0,
    width: 375,
    height: 812,
  },
  foxlearnLoginItem: {
    top: 230,
    width: 308,
    height: 271,
    left: 25,
    position: 'absolute',
  },
  foxlearnLoginInner: {
    top: 417,
    height: 395,
  },
  rectangleView: {
    top: 683,
    left: 87,
    backgroundColor: 'rgba(255, 95, 84, 0.3)',
    width: 201,
    height: 48,
    position: 'absolute',
  },
  vectorIcon: {
    height: '3.82%',
    width: '46.4%',
    top: '54.8%',
    right: '27.73%',
    bottom: '41.38%',
    left: '25.87%',
    maxWidth: '100%',
    maxHeight: '100%',
    opacity: 0.63,
    position: 'absolute',
    overflow: 'hidden',
  },
  ellipseIcon: {
    top: 500,
    left: 6,
    width: 365,
    height: 85,
    position: 'absolute',
  },
  foxlearnLoginChild1: {
    top: 505,
    left: -46,
    width: 469,
    height: 132,
    position: 'absolute',
  },
  groupChild: {
    borderRadius: 16,
    left: 0,
    width: 279,
    top: 0,
  },
  signIn: {
    top: '0%',
    left: '0%',
    color: '#f6f0f4',
    fontFamily: 'Roboto_700Bold',
    fontWeight: '700',
  },
  signInWrapper: {
    height: '50%',
    width: '17.92%',
    top: '26%',
    right: '40.86%',
    bottom: '24%',
    left: '41.22%',
    position: 'absolute',
  },
  vectorParent: {
    top: rw(620),
    left: 48,
  },
  createAnAccount: {
    top: '94%',
    left: '37%',
    fontWeight: '500',
    color: '#212330',
    fontFamily: 'Roboto_500Medium',
  },
  app: {
    color: '#6997ff',
  },
  learn: {
    color: '#021e40',
  },
  applearn: {
    top: 64,
    left: 124,
    fontSize: 30,
    lineHeight: 46,
    fontFamily: 'Roboto_700Bold',
    fontWeight: '700',
  },
  welcomeToNew: {
    top: 110,
    left: 96,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '300',
    color: '#202020',
    fontFamily: 'Roboto_500Medium',
  },
  foxlearnIcon: {
    top: 214,
    left: 92,
    width: 184,
    height: 263,
    position: 'absolute',
    overflow: 'hidden',
  },
  foxlearnLoginChild2: {
    top: 606,
    left: 25,
  },
  foxlearnLoginChild3: {
    top: 615,
    left: 303,
  },
  foxlearnLoginChild4: {
    top: 571,
    left: 213,
    width: 26,
    height: 26,
    position: 'absolute',
  },
  image6Icon: {
    top: 183,
    left: 40,
    width: 71,
    height: 63,
    position: 'absolute',
  },
  foxlearnLogin: {
    backgroundColor: '#f5ede2',
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    height: 812,
  },
});

export default WelcomeScreen;
