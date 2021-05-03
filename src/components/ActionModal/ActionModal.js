import classNames from "classnames";
import React from "react";
import styles from "./ActionModal.module.css";
import upArrowIcon from "../../assets/up-arrow.svg";

const ActionModal = ({ scrollPosition, scrollToTop }) => {
  return (
    <div className={styles.actionModalWrapper}>
      <div
        className={classNames(styles.actionModalContainer, {
          [styles.actionModalContainerVisible]: scrollPosition > 2000,
        })}
      >
        <div className={styles.titleScrollContainer}>
          <div className={styles.titleContainer}>
            <span>These people were members of someone’s family.</span>
            <br />
            <span className={styles.redText}>They are no more.</span>
          </div>
          <div
            className={styles.scrollToTopContainer}
            onClick={() => scrollToTop()}
          >
            <img
              src={upArrowIcon}
              className={styles.scrollToTopBtn}
              alt="scroll to top icon"
            />
          </div>
        </div>
        <div className={styles.subTextContainer}>
          <span>
            Bid for this NFT, to help raise the largest donation ever for this
            cause.
          </span>
          <br />
          <span>And help avoid more body-bags added to this artwork.</span>
        </div>
        <div className={styles.bidForNftBtnContainer}>
          <a
            href="https://makersplace.com/mitrai/warriors-of-hope-1-of-1-65851/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bidForNftBtn}
          >
            BID FOR THIS NFT
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
