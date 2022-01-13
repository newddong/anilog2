import React, {Component} from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image} from 'react-native';

import {lnb, lo, sctn, txt} from './style_moviehome';

import DP from 'Screens/dp';

import MovieItem from './subcomponent/movieItem';
import HealthLnb from './subcomponent/healthlnb';
import dummydata from './moviedata.json';

export default MovieHome = props => {
	return (
		<View style={lo.wrp_main}>
			<ScrollView>
				{dummydata.movies.map((e, i) => {
					if (i === 0) {
						return (
							<View key={i}>
								<MovieItem data={e} key={i} />
								<HealthLnb style={lo.lnb} key={123456789} />
							</View>
						);
					}

					return <MovieItem data={e} key={i} />;
				})}
			</ScrollView>
		</View>
	);
};
