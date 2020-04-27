import React, { Fragment, useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TouchableHighlight,
  Image,
  FlatList,
} from "react-native";
import { Ionicons, FontAwesome } from "react-native-vector-icons";
import countriesJson from "./data/countries";
import { getCountries, getGlobalData } from "./graphql/query";
import { useQuery } from "@apollo/react-hooks";

const HomeScreen = () => {
  const [visible, setVisible] = useState(false); //for toggling the countries modal
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState({
    country: "Ghana",
    countryInfo: {
      flag: "https://corona.lmao.ninja/assets/img/flags/gh.png",
    },
    result: {
      tests: 100622,
      cases: 1550,
      todayCases: 0,
      deaths: 11,
      todayDeaths: 0,
      recovered: 155,
      active: 1384,
      critical: 4,
      casesPerOneMillion: 50,
      deathsPerOneMillion: 0,
      testsPerOneMillion: 3238,
      updated: "2020-04-27T19:56:41.459Z",
    },
  });
  const { loading, data } = useQuery(getCountries);
  const { loading:loadData, data:realData, error } = useQuery(getGlobalData);
 if (realData){
   console.log(realData);
 }
 if (error){
   console.log(error);
 }
  useEffect(() => {
    setCountries(countriesJson);
  }, []);
  return (
    <Fragment>
      <ScrollView
        style={{
          flex: 1,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: "#F7F0F7",
        }}
      >
        <View
          style={{
            paddingTop: 80,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#DBD4DB",
          }}
        >
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>COVID-19</Text>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>Worldwide</Text>
        </View>

        <View
          style={{
            paddingTop: 30,
            paddingBottom: 30,
            paddingLeft: 10,
            backgroundColor: "white",
            marginTop: 20,
            borderRadius: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="ios-globe" size={28} color="#7B52A8" />
            <Text style={{ paddingLeft: 5, paddingTop: 5, fontSize: 20 }}>
              Worldwide Statistics
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 2, paddingTop: 20 }}>
              <Text
                style={{ color: "#9557AC", fontSize: 16, fontWeight: "bold" }}
              >
                Confirmed
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5 }}>
              {realData?.globalTotal?.cases || "N/A"}
              </Text>
            </View>

            <View
              style={{
                flex: 2,
                paddingTop: 20,
                borderLeftWidth: 1,
                paddingLeft: 5,
                borderLeftColor: "#DBD4DB",
              }}
            >
              <Text
                style={{ color: "#5D976A", fontSize: 16, fontWeight: "bold" }}
              >
                Recovered
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5 }}>
                {realData?.globalTotal?.recovered || "N/A"}
              </Text>
            </View>

            <View
              style={{
                flex: 2,
                paddingTop: 20,
                borderLeftWidth: 1,
                borderLeftColor: "#DBD4DB",
                paddingLeft: 5,
              }}
            >
              <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
                Deaths
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5 }}>
              {realData?.globalTotal?.deaths || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Select Country:
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={() => setVisible(true)}>
          <View
            style={{
              borderRadius: 10,
              paddingTop: 15,
              paddingBottom: 15,
              paddingHorizontal: 10,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={{
                  uri: country.countryInfo.flag,
                }}
                style={{ height: 30, width: 30 }}
                resizeMode={"contain"}
              />
            </View>

            <View style={{ flex: 7 }}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                {country?.country || "N/A"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <FontAwesome name="angle-down" size={22} />
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 10,
            paddingTop: 10,
            backgroundColor: "white",
            borderRadius: 5,
            paddingLeft: 10,
            paddingBottom: 30,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="ios-stats" size={24} color="#A2C895" />
            <Text
              style={{
                fontSize: 23,
                fontWeight: "500",
                paddingLeft: 5,
                paddingTop: 3,
                paddingBottom: 20,
              }}
            >
              Statistics
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingLeft: 5, flex: 2 }}>
              <View style={{ paddingTop: 20 }}>
                <Text
                  style={{ color: "#9557AC", fontSize: 16, fontWeight: "bold" }}
                >
                  Confirmed
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5 }}
                >
                   {country?.result?.cases || "N/A"}
                </Text>
              </View>
              <View style={{ paddingTop: 20 }}>
                <Text
                  style={{ color: "#FDD778", fontSize: 16, fontWeight: "bold" }}
                >
                  Active
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5 }}
                >
                  {country?.result?.active || "N/A"}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderLeftWidth: 1,
                paddingRight: 60,
                borderLeftColor: "#DBD4DB",
              }}
            >
              <View style={{ flex: 2, paddingTop: 20, paddingLeft: 10 }}>
                <Text
                  style={{ color: "#5D976A", fontSize: 16, fontWeight: "bold" }}
                >
                  Recovered
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5 }}
                >
                    {country?.result?.recovered || "N/A"}
                </Text>
              </View>
              <View style={{ flex: 2, paddingTop: 20, paddingLeft: 10 }}>
                <Text
                  style={{ color: "red", fontSize: 16, fontWeight: "bold" }}
                >
                  Critical
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5 }}
                >
                   {country?.result?.critical || "N/A"}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderLeftWidth: 1,
                paddingRight: 30,
                borderLeftColor: "#DBD4DB",
              }}
            >
              <View style={{ flex: 2, paddingTop: 20, paddingLeft: 10 }}>
                <Text
                  style={{ color: "red", fontSize: 16, fontWeight: "bold" }}
                >
                  Deaths
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5 }}
                >
                   {country?.result?.deaths || "N/A"}
                </Text>
              </View>
              <View style={{ flex: 2, paddingTop: 20, paddingLeft:10}}>
                <Text
                  style={{ color: "#9557AC", fontSize: 16, fontWeight: "bold" }}
                >
                  Tests
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5 }}
                >
                   {country?.result?.tests || "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 10, paddingLeft: 170 }}>
          <Text style={{ fontWeight: "500" }}>
            Last Updated:Mon Apr 27 2020
          </Text>
        </View>
      </ScrollView>
      <Modal animationType={"slide"} visible={visible}>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{ marginHorizontal: 20, marginTop: 10 }}
          >
            <FontAwesome name={"close"} size={20} style={{ color: "#ddd" }} />
          </TouchableOpacity>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <View style={{ padding: 10 }}>
              {data && (
                <FlatList
                  data={data.countries}
                  renderItem={({ item }) => (
                    <CountryCard
                      data={item}
                      selected={(data) => {
                        setVisible(false);
                        setCountry(data)
                      }}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              )}
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
};

const CountryCard = ({ selected, data }) => {
  return (
    <TouchableHighlight
      underlayColor={"#f1f1f1"}
      onPress={()=>selected(data)}
      style={{
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#f1f1f1",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: data.countryInfo.flag,
            }}
            style={{ height: 50, width: 50 }}
            resizeMode={"contain"}
          />
        </View>
        <View style={{ flex: 5 }}>
          <Text>{data.country}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default HomeScreen;
