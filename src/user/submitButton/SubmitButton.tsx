import ClipLoader from 'react-spinners/ClipLoader';
import './SubmitButton.css';

import React from 'react';

type Props = {
  loading: boolean;
  content: string;
  title: string;
  disabled: boolean;
  color?: string;
}

const SubmitButton: React.FC<Props> = ({ loading, content, title, disabled, color }) => {
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
            style={{ "backgroundColor": color }}
          >
            {content}
          </button>
      }
    </>
  );
};

SubmitButton.defaultProps = {
  color: "#0e0",
};

export default SubmitButton;
