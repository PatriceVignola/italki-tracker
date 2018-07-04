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
import {createFragmentContainer, graphql} from 'react-relay';

type Props = {
  student: {
    __id: string,
    italkiProfile: {
      nickname: string,
      languages: {
        id: number,
        name: string,
      }[],
      avatarUrl: ?string,
    },
  },
};

const StudentCard = ({student}: Props) => (
  <Paper style={styles.container}>
    <Card style={styles.container}>
      <CardMedia
        style={styles.cardMedia}
        image={
          student.italkiProfile.avatarUrl ||
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
          {student.italkiProfile.nickname}
        </Typography>
        <Typography component="p" style={styles.text}>
          <SchoolIcon style={styles.schoolIcon} />
          <span>Learning: </span>
          {student.italkiProfile.languages.map((language, index) => {
            if (index < student.italkiProfile.languages.length - 1) {
              return <span key={language.id}>{language.name}, </span>;
            }

            return <span key={language.id}>{language.name}</span>;
          })}
        </Typography>
      </CardContent>
    </Card>
  </Paper>
);

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

export default createFragmentContainer(
  StudentCard,
  graphql`
    fragment StudentCard_student on Student {
      id
      italkiProfile {
        languages(learning: true) {
          id
          name
        }
        nickname
        avatarUrl
      }
    }
  `,
);
