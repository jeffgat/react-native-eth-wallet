import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import AssetExample from './components/AssetExample';
import { useCallback } from 'react';
import { useAsyncData } from './utils';
import { mainnetProvider } from './provider';
import { BigNumber } from 'ethers';

const VITALIK_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

export default function App() {
    const ethBalanceCheck = useCallback(
        () => mainnetProvider.getBalance(VITALIK_ADDRESS),
        [],
    );
    const { data: balanceData, isLoading, error } = useAsyncData(ethBalanceCheck);
    const balance = balanceData ? Number((balanceData).toString()) / 10 ** 18 : null;
    const balanceString = `Vitalk's Mainnet ETH Balance is ${balance}`;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.paragraph}>
                {isLoading ? 'Loading...' : balanceString}
            </Text>
            <AssetExample />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 16,
    },
    paragraph: {
        margin: 24,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
