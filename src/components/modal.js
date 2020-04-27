import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Ionicons, FontAwesome } from "react-native-vector-icons";
import countriesJson from "../data/countries";
import SvgUri from "expo-svg-uri";

const ModalComponent = ({ visible, close }) => {
  const [countries, setCountries] = useState(null);
  useEffect(() => {
    setCountries(countriesJson);
  });
  return (
    <>
      <Modal animationType={"slide"} visible={visible}>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={close}
            style={{ marginHorizontal: 20, marginTop: 10 }}
          >
            <FontAwesome name={"close"} size={20} style={{ color: "#ddd" }} />
          </TouchableOpacity>
          <ScrollView style={{ padding: 10 }}>
            {countries &&
              countries.map((country, i) => (
                <CountryCard name={country.name} />
              ))}
            {/*<SvgUri*/}
            {/*    width="200"*/}
            {/*    height="200"*/}
            {/*    source={{*/}
            {/*      uri:*/}
            {/*          "http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg",*/}
            {/*    }}*/}
            {/*/>*/}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const CountryCard = ({ image, name }) => {
  return (
    <TouchableHighlight
      underlayColor={"#f1f1f1"}
      onPress={() => alert(name)}
      style={{
        padding: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "#f1f1f1",
      }}
    >
      <Text>{name}</Text>
    </TouchableHighlight>
  );
};

export default ModalComponent;
