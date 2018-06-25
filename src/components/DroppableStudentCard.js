/**
 * @prettier
 * @flow
 */

import React from 'react';
import Dropzone from 'react-dropzone';
import {compose, withHandlers} from 'recompose';
import StudentCard from './StudentCard';

type IncomingProps = {
  nickname: string,
  languages: {
    id: number,
    name: string,
  }[],
  avatarUrl: ?string,
};

type NewProps = {
  onDrop: (acceptedFiles: File[], rejectedFiles: File[]) => void,
};

const setHandlers = withHandlers({
  onDrop: () => (acceptedFiles: File[], rejectedFiles: File[]) => {
    console.warn('File dropped');
    console.warn(acceptedFiles[0]);
  },
});

function DroppableStudentCard(props: IncomingProps & NewProps) {
  return (
    <Dropzone style={styles.dropZone} onDrop={props.onDrop}>
      <StudentCard {...props} />
    </Dropzone>
  );
}

const enhance = compose(setHandlers);

const styles = {
  dropZone: {
    width: '100%',
    height: '100%',
  },
};

export default enhance(DroppableStudentCard);
