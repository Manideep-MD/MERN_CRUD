
import React from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import createStyle from './Loader.style';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/store';

const Loader = () => {
    const styles = createStyle()
    const visible = useSelector((state: RootState) => state.loader.visible);

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.overlay}>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#10348C" />
                    <Text style={styles.text}>Please Wait</Text>
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

