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
} from 'material-ui';

import type {Student} from '../actions/types';

type Props = {
  student: Student,
};

function StudentCard(props: Props) {
  return (
    <Paper>
      <Card style={styles.card}>
        <CardMedia style={styles.cardMedia} image={props.student.photoUrl} />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {`${props.student.firstName} ${props.student.lastName}`}
          </Typography>
          <Typography component="p">
            Description here (e.g. level, number of classes, etc.)
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
    height: 500,
  },
  cardMedia: {
    height: 300,
  },
};

export default StudentCard;
