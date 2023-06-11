import {Image, Placeholder} from 'react-bootstrap'

const COVER_SIZES = {
    "micro": "t_micro",
    "thumb": "t_thumb",
    "small": "t_cover_small",
    "medium": "t_logo_med",
    "big": "t_cover_big"
}

const IGDB_API_URL = process.env.REACT_APP_IGDB_IMAGE_URL

function Cover({image, size, style}) {
    const image_id = image
    const image_size = COVER_SIZES[size]
    const screenshotUrl = IGDB_API_URL + image_size + '/'

    if (!image) {
        return <Placeholder bg="primary"/>
    }
    
    return <Image id="game_cover" style={style} src={screenshotUrl+image_id+'.jpg'} alt={'cover_'+image_id} />
}

export default Cover