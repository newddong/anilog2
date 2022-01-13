import React from 'react';
import { Text, View,} from 'react-native';
import ProfileImageSelect from 'Molecules/select/ProfileImageSelect';
import {ScrollView} from 'react-native';
import ProfileImageLarge160 from 'Molecules/image/ProfileImageLarge160';
import ProfileImageLarge194 from 'Molecules/image/ProfileImageLarge194';
import ProfileImageMedium120 from 'Molecules/image/ProfileImageMedium120';
import ProfileImageMedium140 from 'Molecules/image/ProfileImageMedium140';
import ProfileImageSmall from 'Molecules/image/ProfileImageSmall';
import PetImageLabel from 'Molecules/label/PetImageLabel';
import { BLUE20, WHITE } from 'Root/config/color';
export default ProfileImageSelectTest = props => {
	return (
		<ScrollView>
			{/* Profile Image */}
			<Text style={{backgroundColor: BLUE20, color: WHITE}}> ProfileImage - img uri 有 </Text>

			<ProfileImageSelect
				selectedImageUri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
			/>
			<Text style={{backgroundColor: 'blue', color: 'white'}}> ProfileImage - img uri null </Text>
			<ProfileImageSelect
			/>

			{/* Profile Image Label Large 160 */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> ProfileImage Label Large 160 </Text>
			<ProfileImageLarge160
				img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
				userType={'user'}
			/>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageLarge160
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
				/>
				<ProfileImageLarge160
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'normal'}
				/>
				<ProfileImageLarge160
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'protected'}
				/>
				<ProfileImageLarge160
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'adopted'}
				/>
			</View>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageLarge160
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'public'}
				/>
				<ProfileImageLarge160
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'private'}
				/>
			</View>
			{/* Profile Image Label Large 194 */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> ProfileImage Label Large 194 </Text>
			<ProfileImageLarge194
				img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
				userType={'user'}
			/>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageLarge194
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
				/>
				<ProfileImageLarge194
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'normal'}
				/>
				<ProfileImageLarge194
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'protected'}
				/>
				<ProfileImageLarge194
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'adopted'}
				/>
			</View>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageLarge194
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'public'}
				/>
				<ProfileImageLarge194
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'private'}
				/>
			</View>

			{/*Profile Image Medium 120 */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> ProfileImageMedium120 </Text>
			<ProfileImageMedium120/>
			<ProfileImageMedium140/>
			<ProfileImageMedium120
				img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
				userType={'user'}
			/>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageMedium120
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
				/>
				<ProfileImageMedium120
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'normal'}
				/>
				<ProfileImageMedium120
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'protected'}
				/>
				<ProfileImageMedium120
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'adopted'}
				/>
			</View>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageMedium120
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'public'}
				/>
				<ProfileImageMedium120
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'private'}
				/>
			</View>

			{/*Profile Image Medium 140 */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> ProfileImageMedium140 </Text>
			<ProfileImageMedium140
				img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
				userType={'user'}
			/>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageMedium140
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
				/>
				<ProfileImageMedium140
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'normal'}
				/>
				<ProfileImageMedium140
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'protected'}
				/>
				<ProfileImageMedium140
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'adopted'}
				/>
			</View>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageMedium140
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'public'}
				/>
				<ProfileImageMedium140
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'private'}
				/>
			</View>

            {/*Profile Image Small  */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> ProfileImageSmall 94 </Text>
			<ProfileImageSmall
				img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
				userType={'user'}
                size={94}
			/>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
                    size={94}

				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'normal'}
                    size={94}
				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'protected'}
                    size={94}
				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'adopted'}
                    size={94}
				/>
			</View>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'public'}
                    size={94}
				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'private'}
                    size={94}
				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
                    size={94}
                    userType={'hash'}
				/>
			</View>

            {/*Profile Image Small  */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> ProfileImageSmall 46 </Text>
			<ProfileImageSmall
				img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
				userType={'user'}
                size={46}
			/>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
                    size={46}

				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'normal'}
                    size={46}
				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'protected'}
                    size={46}
				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'pet'}
					petStatus={'adopted'}
                    size={46}
				/>
			</View>
			<View style={{flexDirection: 'row'}}>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'public'}
                    size={46}
				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					userType={'shelter'}
					shelterType={'private'}
                    size={46}
				/>
				<ProfileImageSmall
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
                    size={46}
                    userType={'hash'}   

				/>
			</View>


            {/* Pet Image Label  */}
			<Text style={{backgroundColor: 'blue', color: 'white'}}> Pet Image Label </Text>
			<View style={{flexDirection: 'row'}}>
				<PetImageLabel
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					petNickname={"달리"}
				/>
				<PetImageLabel
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					petStatus={'protected'}
				/>
				<PetImageLabel
					img_uri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxxkWTv71fEvE9HvXaCLjexYJhc_Ij_w7JA&usqp=CAU'}
					petStatus={'adopted'}
				/>
			</View>


			
		</ScrollView>
	);
};
