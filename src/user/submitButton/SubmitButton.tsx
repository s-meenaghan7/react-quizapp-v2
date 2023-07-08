import ClipLoader from 'react-spinners/ClipLoader';
import './SubmitButton.css';

import React from 'react';

type Props = {
  loading: boolean;
  content: string;
  title: string;
  disabled?: boolean;
  color?: string;
  onClick?: () => void;
}

const SubmitButton: React.FC<Props> = ({ loading, content, title, disabled, color, onClick }) => {
  return (
    <>
      {
        loading
          ?
          <div className='loader-container'>
            <ClipLoader
              color={color}
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
            onClick={onClick}
          >
            {content}
          </button>
      }
    </>
  );
};

SubmitButton.defaultProps = {
  color: "#0e0",
  disabled: false,
  onClick: undefined,
};

export default SubmitButton;
