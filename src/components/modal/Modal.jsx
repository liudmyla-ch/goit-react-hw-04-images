import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = props => {
  useEffect(() => {
    const clickToEsc = evt => {
      if (evt.code === 'Escape') {
        props.onClose();
      }
    };
    window.addEventListener('keydown', clickToEsc);

    return () => {
      window.removeEventListener('keydown', clickToEsc);
    };
  }, [props]);

  const clickToOverlay = evt => {
    const { type } = evt.target.dataset;

    if (type === 'overlay' && type !== 'modal') {
      props.onClose();
    }
  };

  const { largeImg, alt } = props;
  return (
    <div className={css.overlay} data-type="overlay" onClick={clickToOverlay}>
      <div className={css.modal} data-type="modal">
        <img src={largeImg} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
