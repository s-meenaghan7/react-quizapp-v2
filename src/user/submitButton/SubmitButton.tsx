import ClipLoader from 'react-spinners/ClipLoader';
import './SubmitButton.css';

import React from 'react';

type Props = {
  loading: boolean;
  content: string;
  title: string;
  disabled: boolean;
}

const SubmitButton: React.FC<Props> = ({ loading, content, title, disabled }) => {
  return (
    <>
      {
        loading
          ?
          <div className='loader-container'>
            <ClipLoader
              color={'#0f0'}
              loading={loading}
              cssOverride={{}}
              size={30}
            />
          </div>
          :
          <button
            className='submitBtn'
            title={title}
            disabled={disabled}
          >
            {content}
          </button>
      }
    </>
  );
};

export default SubmitButton;
