import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div className={styles.modal} data-cy-testid='modal'>
        <div className={styles.header}>
          {title.includes('#') ? (
            <h3 className={`${styles.title} text text_type_digits-default`}>
              {title}
            </h3>
          ) : (
            <h3 className={`${styles.title} text text_type_main-large`}>
              {title}
            </h3>
          )}
          <button
            className={styles.button}
            type='button'
            data-cy-testid='modal-close-button'
          >
            <CloseIcon type='primary' onClick={onClose} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
