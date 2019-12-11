import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';
var moment = require('moment');

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const dark = '#297ac3';
const white = '#fff';
const grayCustom = '#606060';

const appFont = 'Titillium-Semibold';

const iconSize = 24;

class Dashboard extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        activeSections: [],
        isActive: false,
        isGensetCollapsible: false,
        isRecentCollapsible: true,
        isFuelLevelCollapsible: true,

        currentLevel: 0,
        engineHours: 0,
        consumption: 0,
        lastUpdateTime: '',
        lastRefuelTime: '',
        lastDrainTime: '',
        lastIgnitionOffTime: '',

        loading: true,
        
    }

    componentDidMount() {

        setInterval(() => this.fetchData(), 5000); 
        //this.fetchData();
        
    }

    fetchData = () => {
        //this.setState({ loading: true, });
        
        fetch('http://dotfuelapi.xtremetrac.com/api/GenSetServices/GetObjectRealTimeData', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then(responseJson => {

            console.log(responseJson);
            this.setState({
                currentLevel: responseJson.FuelLevel,
                engineHours: responseJson.EngineHours,
                consumption: responseJson.TotalConsumption,
                lastUpdateTime: responseJson.LastUpdateTime,
                lastRefuelTime: responseJson.LastRefuelDateTime,
                lastDrainTime: responseJson.LastDrainDateTime,
                lastIgnitionOffTime: responseJson.LastIgnitionOffTimeInLocalString,
                lastIgnitionOnTime: responseJson.LastIgnitionOnTimeInLocalString,
                loading: false,
            })

        })
        .catch((error) => {
            //you will get error here.
            console.log(error)
        });

    }
    
    
    render() {
        return (
            <View style={{ flex: 1 }}>

                <StatusBar backgroundColor={dark} barStyle="light-content" />

                <View style={styles.bannerContainer}>

                    <Image source={require('../assets/logo.png')} style={styles.bannerImage} />

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('login')}
                    >
                        <MaterialIcon name='last-page' size={30} color={dark} />
                    </TouchableOpacity>

                </View>

                <ScrollView
                    ref="scrollView"
                    onContentSizeChange={(width, height) => { (this.state.isRecentCollapsible == false || this.state.isFuelLevelCollapsible == false) ? this.refs.scrollView.scrollTo({ y: height }) : this.refs.scrollView.scrollTo({ y: -height }) }}
                >

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: screenWidth * 0.04 }}>

                        <TouchableOpacity style={styles.titleHeader}
                            onPress={() => this.setState({ isGensetCollapsible: !this.state.isGensetCollapsible })}
                        >
                            <Text style={styles.title}>Current Information</Text>
                        </TouchableOpacity>

                        {
                            this.state.loading && 

                            <ActivityIndicator size={"large"} color={dark} />
                        }

                    </View>
                    
                    <Collapsible collapsed={this.state.isGensetCollapsible}>

                        <View>

                            <View style={styles.row}>

                                <View style={styles.itemContainer}>
                                    <View style={styles.iconContainer}>
                                        <MaterialIcon name='history' size={iconSize} color={white} />
                                    </View>

                                    <View style={styles.itemDetails}>
                                        <Text style={styles.heading}>Last Update</Text>
                                        <Text style={styles.text}>{moment(this.state.lastUpdateTime).fromNow()}</Text>
                                        <Text style={styles.text}>{this.state.lastUpdateTime}</Text>
                                    </View>
                                </View>

                                <View style={styles.itemContainer}>
                                    <View style={styles.iconContainer}>
                                        <MaterialIcon name='format-color-fill' size={iconSize} color={white} />
                                    </View>

                                    <View style={styles.itemDetails}>
                                        <Text style={styles.heading}>Last Refuel</Text>
                                        <Text style={styles.text}>{moment(this.state.lastRefuelTime).fromNow()}</Text>
                                        <Text style={styles.text}>{this.state.lastRefuelTime}</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={styles.row}>

                                <View style={styles.itemContainer}>
                                    <View style={styles.iconContainer}>
                                        <MaterialIcon name='opacity' size={iconSize} color={white} />
                                    </View>

                                    <View style={styles.itemDetails}>
                                        <Text style={styles.heading}>Last Drain</Text>
                                        <Text style={styles.text}>N/A</Text>
                                        <Text style={styles.text}>{this.state.lastDrainTime}</Text>
                                    </View>
                                </View>

                                <View style={styles.itemContainer}>
                                    <View style={styles.iconContainer}>
                                        <MaterialIcon name='timer' size={iconSize} color={white} />
                                    </View>

                                    <View style={styles.itemDetails}>
                                        <Text style={styles.heading}>Engine Hours</Text>
                                        <Text style={styles.text}>{this.state.engineHours} Hours</Text>
                                        <Text style={styles.text}>In Last 24 Hours</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={styles.row}>

                                <View style={styles.itemContainer}>
                                    <View style={styles.iconContainer}>
                                        <MaterialIcon name='timeline' size={iconSize} color={white} />
                                    </View>

                                    <View style={styles.itemDetails}>
                                        <Text style={styles.heading}>Consumption</Text>
                                        <Text style={styles.text}>{Math.round(this.state.consumption * 10 ) / 10} Liters Consumed</Text>
                                        <Text style={styles.text}>In Last 24 Hours</Text>
                                    </View>
                                </View>

                                <View style={styles.itemContainer}>
                                    <View style={styles.iconContainer}>
                                        <MaterialIcon name='change-history' size={iconSize} color={white} />
                                    </View>

                                    <View style={styles.itemDetails}>
                                        <Text style={styles.heading}>Model & Rating</Text>
                                        <Text style={styles.text}>DCA - 25 ESK - DA</Text>
                                        <Text style={styles.text}>18.4 KW</Text>
                                    </View>
                                </View>

                            </View>

                        </View>

                    </Collapsible>


                    <TouchableOpacity style={styles.titleHeader}
                        onPress={() => this.setState({ isFuelLevelCollapsible: !this.state.isFuelLevelCollapsible })}
                    >
                        <Text style={styles.title}>Fuel Level Information</Text>
                    </TouchableOpacity>

                    <Collapsible collapsed={this.state.isFuelLevelCollapsible}>

                        <View>

                            <View style={styles.fuelRow}>
                                <View>
                                    <Text style={styles.fuelItemText}>Capacity</Text>
                                </View>

                                <View style={styles.fuelItem}>
                                    <MaterialIcon name='straighten' size={iconSize} style={{ transform: [{ rotate: '90deg' }] }} />
                                    <Text style={styles.fuelItemIconText}>64 Liters</Text>
                                </View>
                            </View>

                            <View style={styles.fuelRow}>
                                <View>
                                    <Text style={styles.fuelItemText}>Current Level</Text>
                                </View>

                                <View style={styles.fuelItem}>
                                    <MaterialIcon name='opacity' size={iconSize} />
                                    <Text style={styles.fuelItemIconText}>{this.state.currentLevel > 64 ? 64 : this.state.currentLevel} Liters</Text>
                                </View>
                            </View>

                            <View style={styles.fuelRow}>
                                <View>
                                    <Text style={styles.fuelItemText}>Last Refuel</Text>
                                </View>

                                <View style={styles.fuelItem}>
                                    <MaterialIcon name='format-color-fill' size={iconSize} />
                                    <Text style={styles.fuelItemIconText}>{moment(this.state.lastRefuelTime).fromNow()}</Text>
                                </View>
                            </View>

                        </View>

                    </Collapsible>


                    <TouchableOpacity style={[styles.titleHeader, { backgroundColor: '#9C1126' }]}
                        onPress={() => this.setState({ isRecentCollapsible: !this.state.isRecentCollapsible })}
                    >
                        <Text style={styles.title}>Recent Alerts</Text>
                    </TouchableOpacity>

                    <Collapsible collapsed={this.state.isRecentCollapsible}>

                        <View style={styles.row}>

                            <View style={styles.itemContainer}>
                                <View style={[styles.iconContainer, { backgroundColor: '#9C1126' }]}>
                                    <MaterialIcon name='notifications-active' size={iconSize} color={white} />
                                </View>

                                <View style={styles.itemDetails}>
                                    <Text style={styles.heading}>Ignition Off</Text>
                                    <Text style={styles.text}>{this.state.lastIgnitionOffTime}</Text>
                                </View>
                            </View>

                            <View style={styles.itemContainer}>
                                <View style={[styles.iconContainer, { backgroundColor: '#9C1126' }]}>
                                    <MaterialIcon name='notifications-active' size={iconSize} color={white} />
                                </View>

                                <View style={styles.itemDetails}>
                                    <Text style={styles.heading}>Ignition On</Text>
                                    <Text style={styles.text}>{this.state.lastIgnitionOnTime}</Text>
                                </View>
                            </View>

                        </View>

                    </Collapsible>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    bannerContainer: {
        paddingVertical: screenHeight * 0.02, elevation: 4, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: screenWidth * 0.04, backgroundColor: '#fff',
    },
    bannerImage: {
        height: 40, width: screenWidth * 0.5,
    },
    titleHeader: {
        backgroundColor: dark, paddingHorizontal: screenHeight * 0.03, paddingVertical: screenHeight * 0.02, width: screenWidth * 0.8,
        borderTopRightRadius: screenHeight * 0.02, borderBottomRightRadius: screenHeight * 0.02, elevation: 4, marginVertical: screenHeight * 0.02
    },
    title: {
        color: white, fontSize: screenHeight * 0.03, fontFamily: appFont,
    },
    iconContainer: {
        backgroundColor: dark, height: screenHeight * 0.08, width: screenHeight * 0.08, borderRadius: screenHeight * 0.04,
        alignItems: 'center', justifyContent: 'center'
    },
    itemContainer: {
        borderBottomWidth: 1, borderColor: '#bbb', marginHorizontal: screenWidth * 0.01, alignItems: 'center', justifyContent: 'center',
        width: screenWidth * 0.47
    },
    itemDetails: {
        alignItems: 'center', justifyContent: 'center', padding: screenHeight * 0.01,
    },
    text: {
        fontFamily: appFont, color: 'gray', fontSize: screenWidth * 0.036
    },
    heading: {
        fontFamily: appFont, fontSize: screenHeight * 0.024
    },
    row: {
        flexDirection: 'row', alignItems: 'center', marginVertical: screenHeight * 0.01, justifyContent: 'space-between'
    },
    fuelItem: {
        flexDirection: 'row', alignItems: 'center', width: screenWidth * 0.4,
    },
    fuelItemText: {
        fontFamily: appFont,
    },
    fuelItemIconText: {
        fontFamily: appFont, marginLeft: screenWidth * 0.05,
    },
    fuelRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: screenWidth * 0.05,
        marginVertical: screenHeight * 0.01, borderBottomWidth: 1, borderColor: '#bbb', paddingVertical: screenHeight * 0.01
    }
});

export default Dashboard;
