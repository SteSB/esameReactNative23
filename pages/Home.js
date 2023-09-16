import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import axios from 'axios';

import { generalStyles } from '../general';

const Home = ({ navigation, route }) => {
  const [randomsMeal, setRandomsMeal] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filters, setFilters] = useState(false);

  const countryMapping = {
    'American': 'US',
    'British': 'GB',
    'Canadian': 'CA',
    'Chinese': 'CN',
    'Croatian': 'HR',
    'Dutch': 'NL',
    'Egyptian': 'EG',
    'Filipino': 'PH',
    'French': 'FR',
    'Greek': 'GR',
    'Indian': 'IN',
    'Irish': 'IE',
    'Italian': 'IT',
    'Jamaican': 'JM',
    'Japanese': 'JP',
    'Kenyan': 'KE',
    'Malaysian': 'MY',
    'Mexican': 'MX',
    'Moroccan': 'MA',
    'Polish': 'PL',
    'Portuguese': 'PT',
    'Russian': 'RU',
    'Spanish': 'ES',
    'Thai': 'TH',
    'Tunisian': 'TN',
    'Turkish': 'TR',
    'Unknown': 'XX',
    'Vietnamese': 'VN'
  };

  function getCountryCode(strArea) {
    return countryMapping[strArea] || 'Unknown';
  }

  const filterByArea = async (strArea) => {
    try {
      const responses = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + strArea);
      setRandomsMeal(responses.data.meals);
      setFilters(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const filterByIngredient = async (strIngredient) => {
    try {
      const responses = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + strIngredient);
      setRandomsMeal(responses.data.meals);
      setFilters(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const xRandomsMealGet = async (x) => {
    try {
      const responses = await Promise.all(
        Array.from({ length: x }, () =>
          fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        )
      );

      const jsonResponses = await Promise.all(responses.map((response) => response.json()));
      const randomMeals = jsonResponses.map((jsonData) => jsonData.meals[0]);
      setRandomsMeal(randomMeals);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const areasGet = async () => {
    try {
      const responses = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      setAreas(responses.data.meals);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const ingredientsGet = async () => {
    try {
      const responses = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      setIngredients(responses.data.meals);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    xRandomsMealGet(10);
    areasGet();
    ingredientsGet();
  }, []);

  const renderMeal = ({ item }) => (
    <TouchableOpacity style={generalStyles.home.renders.render} id={item.idMeal} onPress={() =>
      navigation.navigate('Meal', { idMeal: item.idMeal })
    }>
      <Image
        source={{ uri: item.strMealThumb }}
        style={{ width: 100, height: 100, borderRadius: 5, marginTop: 10 }}
      />
      <Text numberOfLines={2} style={generalStyles.general.subtext}>{item.strMeal}</Text>

    </TouchableOpacity>
  );

  const renderArea = ({ item }) => (
    item.strArea !== 'Unknown' ? (
      <TouchableOpacity
        style={generalStyles.home.renders.render}
        id={Math.random()}
        onPress={() => { filterByArea(item.strArea) }}
      >
        <Image
          source={{ uri: 'https://www.flagsapi.com/' + getCountryCode(item.strArea) + '/flat/64.png' }}
          style={{ width: 100, height: 100, borderRadius: 5, marginTop: 10 }}
        />
        <Text numberOfLines={2} style={generalStyles.general.subtext}>{item.strArea}</Text>
      </TouchableOpacity>
    ) : (
      <View></View>
    )
  );

  const renderIngredients = ({ item }) => (
    item.strIngredient !== 'Unknown' ? (
      <TouchableOpacity
        style={generalStyles.home.renders.render}
        id={Math.random()}
        onPress={() => { filterByIngredient(item.strIngredient) }}
      >
        <Image
          source={{ uri: 'https://www.themealdb.com/images/ingredients/' + item.strIngredient + '.png' }}
          style={{ width: 100, height: 100, borderRadius: 5, marginTop: 10 }}
        />
        <Text numberOfLines={2} style={generalStyles.general.subtext}>{item.strIngredient}</Text>
      </TouchableOpacity>
    ) : (
      <View></View>
    )
  );

  return (
    <View
      style={generalStyles.general.app}>
      <View style={generalStyles.general.title.titleCtn}>
        <Text style={generalStyles.general.title.text}>Home</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Text style={generalStyles.general.textSection}>Risultati {filters ? "filtrati" : ""}</Text>
          <View>
            {randomsMeal.length > 0 ? (
              <FlatList
                data={randomsMeal}
                renderItem={renderMeal}
                keyExtractor={(item) => item.idMeal}
                horizontal
                style={generalStyles.home.renders.ctn}
              />
            ) : (
              <Text>Loading meal data...</Text>
            )}
          </View>
        </View>
        <View>
          <Text style={generalStyles.general.textSection}>Filtra per area</Text>
          <View>
            {areas.length > 0 ? (
              <FlatList
                data={areas}
                renderItem={renderArea}
                keyExtractor={() => Math.random()}
                horizontal
                style={generalStyles.home.renders.ctn}
              />
            ) : (
              <Text>Loading area data...</Text>
            )}
          </View>
        </View>
        <View>
          <Text style={generalStyles.general.textSection}>Filtra per ingrediente</Text>
          <View>
            {ingredients.length > 0 ? (
              <FlatList
                data={ingredients}
                renderItem={renderIngredients}
                keyExtractor={() => Math.random()}
                horizontal
                style={generalStyles.home.renders.ctn}
              />
            ) : (
              <Text>Loading ingredients data...</Text>
            )}
          </View>
        </View>
      </ScrollView>
      {
        filters ? (
          <View style={generalStyles.general.buttons.deleteButton.ctn}>
            <View style={generalStyles.general.buttons.deleteButton.ctn}>
              <TouchableOpacity
                style={generalStyles.general.buttons.deleteButton.button}
                onPress={() => {
                  xRandomsMealGet(10);
                  setFilters(false);
                }}
              >
                <Text style={generalStyles.general.subtext}>Delete filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View></View>
        )
      }

    </View>
  );
};

export default Home;