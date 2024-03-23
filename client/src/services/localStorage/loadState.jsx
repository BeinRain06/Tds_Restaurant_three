export const loadState = () => {
  try {
    let serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      console.log("serialized state in LS null");
      return undefined;
    } else {
      JSON.parse(serializedState);
    }
  } catch (err) {
    console.log(err);
  }
};
