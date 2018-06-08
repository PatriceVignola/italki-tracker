/**
 * @prettier
 * @flow
 */

import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';

import type {Student} from '../actions/types';

type Props = {
  student: Student,
};

function StudentCard(props: Props) {
  return (
    <Paper>
      <Card style={styles.card}>
        <CardMedia
          style={styles.cardMedia}
          image={
            props.student.photoUrl ||
            'http://getdrawings.com/img/male-silhouette-images-2.jpg'
          }
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.student.name}
          </Typography>
          <Typography component="p">
            <LocationOnIcon />
            {props.student.location}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Cancel
          </Button>
          <Button size="small" color="primary">
            OK
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}

const styles = {
  cover: {
    height: '100%',
    resizeMode: 'cover',
  },
  card: {
    height: 450,
    width: 300,
  },
  cardMedia: {
    height: 300,
  },
};

export default StudentCard;
