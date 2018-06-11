/**
 * @prettier
 * @flow
 */

import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';

import relayEnvironment from '../relay/relayEnvironment';

type Props = {
  userId: ?number,
};

type QueryResult = {
  error: ?Error,
  props: ?{
    user: ?{
      avatarUrl: ?string,
    },
  },
};

const styles = {
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

const placeholderAvatarUrl =
  'https://tse4.mm.bing.net/th?id=OGC.c80cb134e19434e32cb714914bbe5ec7&pid=1.7&rurl=https%3a%2f%2fd13yacurqjgara.cloudfront.net%2fusers%2f48081%2fscreenshots%2f2817006%2ffacescan.gif';

function UserAvatar(props: Props) {
  if (props.userId) {
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query NewStudentFormQuery($userId: ID!) {
            user(id: $userId) {
              avatarUrl
            }
          }
        `}
        variables={{userId: props.userId}}
        render={(result: QueryResult) => {
          console.warn(result);
          if (!result.error && result.props && result.props.user) {
            if (result.props.user.avatarUrl) {
              return (
                <img
                  style={styles.avatarImage}
                  src={result.props.user.avatarUrl}
                  alt="User avatar"
                />
              );
            }

            return (
              <img
                style={styles.avatarImage}
                src="https://www.italki.com/static/images/no_pic150.jpg"
                alt="User avatar"
              />
            );
          }

          return (
            <img
              style={styles.avatarImage}
              src={placeholderAvatarUrl}
              alt="User avatar"
            />
          );
        }}
      />
    );
  }

  return (
    <img
      style={styles.avatarImage}
      src={placeholderAvatarUrl}
      alt="User avatar"
    />
  );
}

export default UserAvatar;
