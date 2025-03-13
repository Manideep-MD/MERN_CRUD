import { StyleSheet } from "react-native";


const createStyle = (colors: any) => {
    return StyleSheet.create({
   nodataContainer:{
   width:'100%',
   justifyContent:'center',
   alignItems:'center',
   gap:10,
   height:'50%'
  },
  iconContainer:{
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 102,
  },
  nodataText:{
    color: colors.blackColor, 
    fontSize: 17,
  },
  lottieStyle:{
    width: 200,
    height: 120,
  },
  nodataTextLanguage:{
    color: colors.blackColor, 
    fontSize: 13,
  },
  })
}
export default createStyle