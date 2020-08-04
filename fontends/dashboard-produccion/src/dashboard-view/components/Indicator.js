import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Avatar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardIndicator: {
        width: 275,
        height: 120,
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    indicatorTitle: {
        fontSize: '14pt',
        marginLeft: theme.spacing(2),
        maxWidth: 180
    },
    avatar: {
        height: 47,
        width: 47
    },
    cardIndicatorContent: {
        fontWeight: 500,
        marginLeft: theme.spacing(3)
    }
}));

function Indicator(props) {
    const classes = useStyles();
    const idIndicator = props.idIndicator;
    const setIndicator = props.setIndicator;
    const title = props.title;
    const content = props.content;
    const avatarBackground = props.avatarBackground;
    const icon = props.icon;

    return (
        <Card className={classes.cardIndicator}>
            <CardActionArea onClick={() => setIndicator(idIndicator)}>
                <CardContent>
                    <Grid
                        container
                        alignItems='center'
                        justify='space-between'
                    >
                        <Grid item>
                            <Typography className={classes.indicatorTitle} gutterBottom variant='h5' component='h2'>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar className={classes.avatar} style={{ backgroundColor: avatarBackground }}>
                                {icon}
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Typography className={classes.cardIndicatorContent} gutterBottom variant='h5' component='h2'>
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Indicator;