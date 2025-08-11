import { StyleSheet } from 'react-native';

export const generalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
    text: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
    },
    tabList: {
		display: "flex",
		position: "absolute",
		bottom: 32,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "red",
		padding: 8,
		width: "100%",
	},
	tabTrigger: {
		flex: 1,
		borderWidth: 1,
		borderColor: "blue",
		alignItems: "center",
		justifyContent: "center"
	}
});
