import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginLeft:10,
    fontSize: 24,
    fontWeight: "bold",
  },
  cardContent: {
    flexDirection: "row",
  },
  cardImage: {
    height: 200, 
    resizeMode: "cover",
    width: "100%",
  },
  leftContent: {
    flex: 1,
  },
  commonStyle:{
    marginLeft:10
  },
  rightContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 16,
  },
  likeIcon: {
    marginRight: 8,
  },
  leftContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  descriptionStyle: {
    margin: 10,
    marginBottom: 8,
    fontSize: 16,
    color: '#818589',
    fontWeight: '400'
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeIcon: {
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  hidden: {
    display: 'none',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreText: {
    color: 'brown',
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: 'bold'
  },
});

export default styles;