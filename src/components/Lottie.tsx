import React from 'react';
import LottieView, {LottieViewProps} from 'lottie-react-native';

const Lottie: React.FC<LottieViewProps> = (props) =>  {
	return (
		<LottieView {...props}/>
	);
}

export default Lottie;
