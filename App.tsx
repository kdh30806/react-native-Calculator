import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

const Value = styled.Text`
  color: red;
  font-size: 100px;
  margin-left: 30px;
  margin-top: 15px;
`;

const Button = ({text, icon: IconComponent, iconName, onPress}) => (
  <TouchableOpacity
    style={{
      backgroundColor: 'lightgrey',
      width: 75,
      borderRadius: 5,
      margin: 20,
    }}
    onPress={onPress}>
    {text ? (
      <Text style={{fontSize: 40, textAlign: 'center'}}>{text}</Text>
    ) : (
      <IconComponent name={iconName} size={50} color="black" />
    )}
  </TouchableOpacity>
);

const calculate = (op, num1, num2) => {
  switch (op) {
    case 'plus':
      return num1 + num2;
    case 'minus':
      return num1 - num2;
    case 'times':
      return num1 * num2;
    case 'divide':
      return num1 / num2;
    default:
      console.error(`Invalid operation ${op}`);
      return num2;
  }
};

export default function App() {
  const [result, setResult] = useState(null);
  const [input, setInput] = useState('');
  const [operation, setOperation] = useState(null);

  const handleChangeInput = num => {
    setInput(input + num);
  };

  const handleOperationPress = op => {
    if (input === '') return;
    if (result === null) {
      setResult(parseFloat(input));
    } else {
      setResult(calculate(operation, result, parseFloat(input)));
    }
    setInput('');
    setOperation(op);
  };

  const handleEqualPress = () => {
    if (operation && input) {
      setResult(calculate(operation, result, parseFloat(input)));
      setInput('');
      setOperation(null);
    }
  };

  const handleResetPress = () => {
    setResult(null);
    setInput('');
    setOperation(null);
  };

  return (
    <>
      <View>
        <Value>{input || result || 0}</Value>
      </View>
      <View style={styles.container}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <Button
            key={number}
            text={number}
            onPress={() => handleChangeInput(number.toString())}
          />
        ))}
        <Button
          icon={AntDesign}
          iconName={'plus'}
          onPress={() => handleOperationPress('plus')}
        />
        <Button
          icon={AntDesign}
          iconName={'minus'}
          onPress={() => handleOperationPress('minus')}
        />
        <Button
          icon={FontAwesome6}
          iconName={'equals'}
          onPress={handleEqualPress}
        />
        <Button
          icon={Feather}
          iconName={'x'}
          onPress={() => handleOperationPress('times')}
        />
        <Button
          icon={FontAwesome6}
          iconName={'divide'}
          onPress={() => handleOperationPress('divide')}
        />
        <Button
          icon={MaterialIcons}
          iconName={'restart-alt'}
          onPress={handleResetPress}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '60%',
  },
});
