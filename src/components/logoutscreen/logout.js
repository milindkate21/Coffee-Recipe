import React, { useContext } from "react";
import { View, Image } from "react-native";
import { FAB } from "react-native-paper";
import styles from "./style";
import { AuthContext } from "../../contexts/AuthContext";

const Logout = ({ navigation }) => {
    const { logout } = useContext(AuthContext);
    const myImage = require('../../../assets/coffee-logout.png');


    const handleLogoutPress = () => {
        logout();
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Image source={myImage} style={{ width: '100%', height: '30%' }} />
            <FAB
                icon="logout"
                onPress={handleLogoutPress}
                label="Logout"
                mode="contained"
                style={{marginTop:50}}
            />
        </View>
    );
}

export default Logout;