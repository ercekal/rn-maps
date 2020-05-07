import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width
const Slides = ({data, onComplete}) => {
  const renderSlides = () => {
    return data.map((slide, i) => {
      return (
        <View key={i} style={[styles.slideStyle, {backgroundColor: slide.color}]}>
          <Text style={styles.textStyle}>{slide.text}</Text>
          {renderLastSlide(i)}
        </View>
      )
    })
  }

  const renderLastSlide = (index) => {
    if(index === data.length -1) {
      return (
        <Button
          title='Continue!'
          raised
          buttonStyle={styles.buttonStyle}
          onPress={onComplete}
        />
      )
    }
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      style={{ flex: 1 }}
      >
      {renderSlides()}
    </ScrollView>
  )
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
  }
};

export default Slides;
