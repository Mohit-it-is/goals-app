import { useState } from "react";
import { StyleSheet, View, Button, TextInput, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function endAddGoalHanlder() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enterdText) {
    setCourseGoals((prev) => [
      ...prev,
      { text: enterdText, id: Math.random().toString() },
    ]);
    endAddGoalHanlder();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((prev) => prev.filter((item) => item.id !== id));
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          addGoalHandler={addGoalHandler}
          endGoalHandler={endAddGoalHanlder}
          visible={modalIsVisible}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            renderItem={(itemData) => (
              <GoalItem itemData={itemData} onDeleteItem={deleteGoalHandler} />
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
