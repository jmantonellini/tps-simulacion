export default {
  title: {
    color: "black",
  },

  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "gainsboro",
  },

  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0",
    height: "10%",
    width: "100%",
  },

  splitVerticalContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "35%",
  },

  inputsContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: "20px",
    padding: "20px",
  },

  quarterContainer: (left, top) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: left ? "flex-end" : "flex-start",
    justifyContent: top ? "flex-end" : "flex-start",
    width: "45%",
    padding: "20px",
  }),

  input: {
    width: "150px",
    height: "auto",
  },

  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
  },

  dialogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
