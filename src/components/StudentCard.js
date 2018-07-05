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
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SchoolIcon from '@material-ui/icons/School';
import {createFragmentContainer, graphql} from 'react-relay';
import {withState, withHandlers, mapProps, compose} from 'recompose';

import deleteStudent from '../relay/mutations/DeleteStudent';

type ClickEvent = {
  currentTarget: any,
};

type Student = {
  id: string,
  italkiProfile: {
    nickname: string,
    languages: {
      id: number,
      name: string,
    }[],
    avatarUrl: ?string,
  },
};

type InputProps = {
  student: Student,
};

type WithState = {
  hover: boolean,
  menuAnchor: any,
  setHover: (hover: boolean) => void,
  setMenuAnchor: (anchor: any) => void,
} & InputProps;

type WithHandlers = {
  handleMouseOver: () => void,
  handleMenuOpen: () => void,
  handleMenuClose: () => void,
  handleMouseOut: () => void,
  handleDelete: () => void,
} & WithState;

type Props = {
  student: Student,
  hover: boolean,
  menuAnchor: any,
  handleMouseOver: () => void,
  handleMouseOut: () => void,
  handleMenuOpen: () => void,
  handleMenuClose: () => void,
  handleDelete: () => void,
};

const StudentCard = (props: Props) => (
  <Paper
    style={styles.container}
    onMouseEnter={props.handleMouseOver}
    onMouseLeave={props.handleMouseOut}
  >
    <Card style={styles.container}>
      <CardMedia
        style={styles.cardMedia}
        image={
          props.student.italkiProfile.avatarUrl ||
          'https://www.italki.com/static/images/no_pic150.jpg'
        }
      />
      <CardContent style={styles.cardContent}>
        {props.hover && (
          <div>
            <IconButton
              style={styles.moreButton}
              onClick={props.handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={props.menuAnchor}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              open={props.menuAnchor !== null}
              onClose={props.handleMenuClose}
            >
              <MenuItem onClick={props.handleDelete}>Delete</MenuItem>
            </Menu>
          </div>
        )}
        <Typography
          style={styles.text}
          gutterBottom
          variant="headline"
          component="h2"
        >
          {props.student.italkiProfile.nickname}
        </Typography>
        <Typography component="p" style={styles.text}>
          <SchoolIcon style={styles.schoolIcon} />
          <span>Learning: </span>
          {props.student.italkiProfile.languages.map((language, index) => {
            if (index < props.student.italkiProfile.languages.length - 1) {
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
  cardContent: {
    position: 'relative',
  },
  moreButton: {
    position: 'absolute',
    top: 0,
    right: 0,
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

const enhance = compose(
  withState('hover', 'setHover', false),
  withState('menuAnchor', 'setMenuAnchor', null),
  withHandlers({
    handleMouseOver: ({setHover}: WithState) => () => {
      setHover(true);
    },
    handleMouseOut: ({setHover}: WithState) => () => {
      setHover(false);
    },
    handleMenuOpen: ({setMenuAnchor}: WithState) => (event: ClickEvent) => {
      setMenuAnchor(event.currentTarget);
    },
    handleMenuClose: ({setMenuAnchor}: WithState) => () => {
      setMenuAnchor(null);
    },
    handleDelete: ({setMenuAnchor, student}: WithState) => async () => {
      const configs = [
        {
          type: 'RANGE_DELETE',
          parentID: '5b3d83631303384493d624bf',
          connectionKeys: [
            {
              key: 'StudentCard_students',
            },
          ],
          pathToConnection: ['user', 'students'],
          deletedIDFieldName: 'deletedStudentId',
        },
        {
          type: 'NODE_DELETE',
          deletedIDFieldName: 'deletedStudentId',
        },
      ];

      await deleteStudent({id: student.id}, configs);
      setMenuAnchor(null);
    },
  }),
  mapProps((props: WithHandlers) => ({
    student: props.student,
    hover: props.hover,
    handleMouseOver: props.handleMouseOver,
    handleMouseOut: props.handleMouseOut,
    menuAnchor: props.menuAnchor,
    handleMenuClose: props.handleMenuClose,
    handleDelete: props.handleDelete,
    handleMenuOpen: props.handleMenuOpen,
  })),
);

export default createFragmentContainer(
  enhance(StudentCard),
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
