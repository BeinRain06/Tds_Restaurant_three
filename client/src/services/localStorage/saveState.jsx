export const saveState = (store) => {
  try {
    const serializedState = store.getState();
    localStorage.setItem("appState", JSON.stringify(serializedState));
  } catch (err) {
    console.log(err);
  }
};
