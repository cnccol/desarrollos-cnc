import React from 'react';
import Indicator from './Indicator';
import {
    Grid,
} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import CheckIcon from '@material-ui/icons/Check';

function IndicatorsGrid(props) {
    const indicators = props.indicators;

    return (
        <Grid
            container
            direction='column'
        >
            <Grid item>
                <Grid
                    container
                    direction='row'
                >
                    <Grid item>
                        <Indicator
                            idIndicator={0}
                            setIndicator={props.setIndicator}
                            title={indicators[0].title}
                            content={indicators[0].content}
                            avatarBackground='#1976D2'
                            icon={
                                <CallIcon style={{
                                    height: 32,
                                    width: 32,
                                    fill: 'white'
                                }} />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Indicator
                            idIndicator={1}
                            setIndicator={props.setIndicator}
                            title={indicators[1].title}
                            content={indicators[1].content}
                            avatarBackground='#388E3C'
                            icon={
                                <CheckIcon style={{
                                    height: 42,
                                    width: 42,
                                    fill: 'white'
                                }} />
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction='row'
                >
                    <Grid item>
                        <Indicator
                            idIndicator={2}
                            setIndicator={props.setIndicator}
                            title={indicators[2].title}
                            content={indicators[2].content}
                            avatarBackground='#1976D2'
                            icon={
                                <CallIcon style={{
                                    height: 32,
                                    width: 32,
                                    fill: 'white'
                                }} />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Indicator
                            idIndicator={3}
                            setIndicator={props.setIndicator}
                            title={indicators[3].title}
                            content={indicators[3].content}
                            avatarBackground='#1976D2'
                            icon={
                                <CallIcon style={{
                                    height: 32,
                                    width: 32,
                                    fill: 'white'
                                }} />
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction='row'
                >
                    <Grid item>
                        <Indicator
                            idIndicator={4}
                            setIndicator={props.setIndicator}
                            title={indicators[4].title}
                            content={indicators[4].content}
                            avatarBackground='#1976D2'
                            icon={
                                <CallIcon style={{
                                    height: 32,
                                    width: 32,
                                    fill: 'white'
                                }} />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Indicator
                            idIndicator={5}
                            setIndicator={props.setIndicator}
                            title={indicators[5].title}
                            content={indicators[5].content}
                            avatarBackground='#1976D2'
                            icon={
                                <CallIcon style={{
                                    height: 32,
                                    width: 32,
                                    fill: 'white'
                                }} />
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default IndicatorsGrid;