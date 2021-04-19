class StringUtils {

    static generateRandomBinaryString(length){
        let binaryString = '';
        
        while(length > 0) {
            const random = Math.random();

            if(random > 0.5){
                binaryString = binaryString + "1"
            }else{
                binaryString = binaryString + "0"
            }

            length = length - 1;
        }

        return binaryString
    }
}

export default StringUtils;