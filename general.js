import { StyleSheet } from 'react-native';

export const generalStyles = StyleSheet.create({
  general: {
    app: {
      backgroundColor: '#1E1E1E',
      flex: 1,
      padding: 10,
    },

    title: {
      titleCtn: {
        padding: 10,
        textAlign: "left"
      },

      text: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#FFF"
      },
    },

    textSection: {
      color: "#FFF",
      fontSize: 15,
      paddingLeft: 12,
      paddingTop: 10,
      fontWeight: "bold",
      marginTop: 20
    },

    subtext: {
      fontSize: 12,
      color: "#FFF",
      padding: 5
    },

    buttons: {
      roundedButton: {
        ctn: {
          justifyContent: "center",
          alignItems: "center",
          height: 100,
        },

        button: {
          backgroundColor: "#6DE0D9",
          width: 70,
          borderRadius: 100,
          padding: 5,
        }
      },

      deleteButton: {
        ctn: {
          justifyContent: "center",
          alignItems: "center",
          height: 70,
        },

        button: {
          backgroundColor: "#6DE0D9",
          width: "100%",
          padding: 5,
          borderRadius: 15,
          textAlign: "center"
        }
      }
    }
  },

  home: {
    renders: {
      ctn: {
        display: "flex",
        flexWrap: "wrap",
        padding: 15,
      },

      render: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 100,
        textAlign: "center",
        marginRight: 20
      }
    }
  },

  meal: {
    image: {
      alignSelf: "center",
      justifyContent: "center",
      width: 250,
      height: 250,
      borderRadius: 5,
      marginTop: 10
    },

    imageMealDescription: {
      width: 15,
      height: 15,
      borderRadius: 5,
    },

    mealDescriptionsCtn: {
      marginTop: 12,
      display: "flex",
      flexDirection: "row",
      gap: 15,
      justifyContent: "center"
    },

    mealDescriptionCtn: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
    },

    mealDescriptionText: {
      color: "#FFF"
    },

    description: {
      textAlign: "justify",
      fontSize: 12,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      color: "#FFF"
    },

    descriptionCtn: {
      height: 100,
      marginTop: 10
    },

    ingredientsCtn: {
      height: 190,
      marginTop: 10
    },

    checkbox: {
      padding: 5,
      paddingLeft: 10,
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      text: {
        color: "#FFF",
        fontSize: 10
      }
    },

    ingredientImage: {
      width: 50,
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      marginBottom: 15
    }
  },
});