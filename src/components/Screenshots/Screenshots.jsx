import { Carousel } from "react-bootstrap"

function Screenshots({screenshots}) {
    const screenshotsList = screenshots
    const screenshotUrl = process.env.REACT_APP_IGDB_IMAGE_URL + process.env.REACT_APP_IMAGE_SCREENSHOT_BIG
    
    return (
        <Carousel>
            {screenshotsList && screenshotsList.map((screenshot) => {
                return (
                    <Carousel.Item key={screenshot.id}>
                        <img src={screenshotUrl+'/'+screenshot.image_id+'.jpg'} className="d-block w-100" alt={`screenshot_${screenshot.id}`} />
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}

export default Screenshots