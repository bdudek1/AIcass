import './SavedImage.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const SavedImageView = (props) => {
    
    return (
        <div>
            <Card className="SavedImage">
                <CardActionArea key={props.savedImage.name}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="180"
                        src={props.savedImage.image.currentSrc}
                        title={props.savedImage.name}/>
                    <CardContent>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <Grid container spacing={0}>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            Name: {props.savedImage.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
                </CardActions>
            </Card>
        </div>
    )
}

export default SavedImageView;