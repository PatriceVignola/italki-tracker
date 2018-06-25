/**
 * @prettier
 * @flow
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '@material-ui/core';

import SchoolIcon from '@material-ui/icons/School';

type Props = {
  nickname: string,
  languages: {
    id: number,
    name: string,
  }[],
  avatarUrl: ?string,
};

function StudentCard(props: Props) {
  return (
    <Paper style={styles.container}>
      <Card style={styles.container}>
        <CardMedia
          style={styles.cardMedia}
          image={
            props.avatarUrl ||
            'https://www.italki.com/static/images/no_pic150.jpg'
          }
        />
        <CardContent>
          <Typography
            style={styles.text}
            gutterBottom
            variant="headline"
            component="h2"
          >
            {props.nickname}
          </Typography>
          <Typography component="p" style={styles.text}>
            <SchoolIcon style={styles.schoolIcon} />
            <span>Learning: </span>
            {props.languages.map((language, index) => {
              if (index < props.languages.length - 1) {
                return <span key={language.id}>{language.name}, </span>;
              }

              return <span key={language.id}>{language.name}</span>;
            })}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  cardMedia: {
    height: 250,
  },
  schoolIcon: {
    marginRight: 10,
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export default StudentCard;
