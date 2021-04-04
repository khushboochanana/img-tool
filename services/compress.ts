import axios from 'axios'
export const compressImage = async ({ image, height, width }) => {
    console.log(">>>>>>>>>>>>>>>>>",image, height, width)
    try {
        return await axios.post('https://resizeit.herokuapp.com/compress', { image, height, width })

    } catch (err) {
        console.log(err);
        return err
    }


}