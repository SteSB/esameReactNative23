import * as React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-elements';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { generalStyles } from '../general';

const Checkbox = props => {
  const [isSelected, setIsSelected] = useState(false);
  const [viewIngredient, setViewIngredient] = useState(false);

  return (
    <View>
      <View style={generalStyles.meal.checkbox}>
        <CheckBox
          value={isSelected}
          onValueChange={() => { setIsSelected(!isSelected) }}
          key={Math.random()}
        />
        <Text onPress={() => { setViewIngredient(!viewIngredient) }} style={generalStyles.meal.checkbox.text}>{props.ingredient.ingredient} [{props.ingredient.measure}]</Text>
      </View>
      {viewIngredient ? (
        <View>
          <Image
            source={{ uri: 'https://www.themealdb.com/images/ingredients/' + props.ingredient.ingredient + '-Small.png' }}
            style={generalStyles.meal.ingredientImage}
          />
        </View>
      ) : (<View></View>)}
    </View>
  );
};

const Meal = ({ navigation, route }) => {
  const [idMeal, setIdMeal] = useState(route.params.idMeal);
  const [meal, setMeal] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getMeal = async (id) => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getMeal(idMeal);
  }, []);

  useEffect(() => {
    const getIncregients = () => {
      const tmpIngredients = [];
      if (meal.strIngredient1 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient1, measure: meal.strMeasure1 }) };
      if (meal.strIngredient2 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient2, measure: meal.strMeasure2 }) };
      if (meal.strIngredient3 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient3, measure: meal.strMeasure3 }) };
      if (meal.strIngredient4 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient4, measure: meal.strMeasure4 }) };
      if (meal.strIngredient5 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient5, measure: meal.strMeasure5 }) };
      if (meal.strIngredient6 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient6, measure: meal.strMeasure6 }) };
      if (meal.strIngredient7 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient7, measure: meal.strMeasure7 }) };
      if (meal.strIngredient8 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient8, measure: meal.strMeasure8 }) };
      if (meal.strIngredient9 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient9, measure: meal.strMeasure9 }) };
      if (meal.strIngredient10 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient10, measure: meal.strMeasure10 }) };
      if (meal.strIngredient11 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient11, measure: meal.strMeasure11 }) };
      if (meal.strIngredient12 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient12, measure: meal.strMeasure12 }) };
      if (meal.strIngredient13 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient13, measure: meal.strMeasure13 }) };
      if (meal.strIngredient14 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient14, measure: meal.strMeasure14 }) };
      if (meal.strIngredient15 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient15, measure: meal.strMeasure15 }) };
      if (meal.strIngredient16 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient16, measure: meal.strMeasure16 }) };
      if (meal.strIngredient17 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient17, measure: meal.strMeasure17 }) };
      if (meal.strIngredient18 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient18, measure: meal.strMeasure18 }) };
      if (meal.strIngredient19 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient19, measure: meal.strMeasure19 }) };
      if (meal.strIngredient20 !== "") { tmpIngredients.push({ ingredient: meal.strIngredient20, measure: meal.strMeasure20 }) };
      setIngredients(tmpIngredients);
    }

    getIncregients();
  }, [meal]);

  return (
    <View
      style={generalStyles.general.app}>
      <View style={generalStyles.general.title.titleCtn}>
        <Text numberOfLines={1} style={generalStyles.general.title.text}>{meal.strMeal}</Text>
        <Text style={generalStyles.general.subtext}>{meal.strMeal}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View>
          {meal.strMealThumb ? (
            <Image
              source={{ uri: meal.strMealThumb }}
              style={generalStyles.meal.image}
            />
          ) : null}
          <View style={generalStyles.meal.mealDescriptionsCtn}>
            <View style={generalStyles.meal.mealDescriptionCtn}>
              <Image
                source={require('../assets/food.png')}
                style={generalStyles.meal.imageMealDescription}
              />
              <Text style={generalStyles.meal.mealDescriptionText}>{meal.strCategory}</Text>
            </View>
            <View style={generalStyles.meal.mealDescriptionCtn}>
              <Image
                source={require('../assets/flag.png')}
                style={generalStyles.meal.imageMealDescription}
              />
              <Text style={generalStyles.meal.mealDescriptionText}>{meal.strArea}</Text>
            </View>
            <View style={generalStyles.meal.mealDescriptionCtn}>
              <Image
                source={require('../assets/ingredients.png')}
                style={generalStyles.meal.imageMealDescription}
              />
              <Text style={generalStyles.meal.mealDescriptionText}>{ingredients.length}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={generalStyles.general.textSection}>Ingredienti</Text>
          <ScrollView style={generalStyles.meal.ingredientsCtn}>
            {ingredients.map((ingredient, index) => {
              return (
                <Checkbox key={index} index={index} ingredient={ingredient} />
              );
            })}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={generalStyles.general.textSection}>Descrizione</Text>
          <ScrollView style={generalStyles.meal.descriptionCtn}>
            <Text style={generalStyles.meal.description}>{meal.strInstructions}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={generalStyles.general.buttons.roundedButton.ctn}>
        <View style={generalStyles.general.buttons.roundedButton.button}>
          <Button
            type='clear'
            onPress={() =>
              navigation.navigate('Home')
            }
            title={"Home"}
          />
        </View>
      </View>
    </View>
  );
};

export default Meal;