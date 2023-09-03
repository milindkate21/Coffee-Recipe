import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
        marginHorizontal: 40
    },
    button: {
        flex: 1,
        borderColor: '#ad6d2f',
        borderWidth: 2,
    },
    buttonMargin:{
        marginHorizontal: 5
    },
   
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: 350,
        height: 50,
        marginBottom: 30,
        fontSize: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderWidth: 1
    },
    passwordInput: {
        width: 300,
        fontSize: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 350,
        marginBottom: 30,
        backgroundColor: '#fff',
        paddingRight: 10,
        borderRadius: 5,
        // borderColor: '#6650a5',
        borderWidth: 1  
    },
});
export default styles;