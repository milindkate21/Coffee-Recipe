import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        marginTop: 40,
    },
    headerLeft: {
        flex: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        marginTop: 8,
    },
    segmentText: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center",
        flex: 1,
    },
    segmentButton: {
        marginLeft: 12,
        marginRight: 12,
    },
});

export default styles;