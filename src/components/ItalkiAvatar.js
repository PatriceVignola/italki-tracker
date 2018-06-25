/**
 * @prettier
 * @flow
 */

import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';

import relayEnvironment from '../relay/relayEnvironment';
import scanImageUrl from '../img/italki-scan.gif';

type Props = {
  italkiProfileId: ?number,
};

type QueryResult = {
  error: ?Error,
  props: ?{
    italkiProfile: ?{
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

function ItalkiAvatar(props: Props) {
  if (props.italkiProfileId) {
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query ItalkiAvatarQuery($italkiProfileId: ID!) {
            italkiProfile(id: $italkiProfileId) {
              avatarUrl
            }
          }
        `}
        variables={{italkiProfileId: props.italkiProfileId}}
        render={(result: QueryResult) => {
          if (!result.error && result.props && result.props.italkiProfile) {
            if (result.props.italkiProfile.avatarUrl) {
              return (
                <img
                  style={styles.avatarImage}
                  src={result.props.italkiProfile.avatarUrl}
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
              src={scanImageUrl}
              alt="User avatar"
            />
          );
        }}
      />
    );
  }

  return (
    <img style={styles.avatarImage} src={scanImageUrl} alt="User avatar" />
  );
}

export default ItalkiAvatar;
