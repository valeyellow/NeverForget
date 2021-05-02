import React, { useCallback, useRef } from "react";
import styles from "./BB.module.css";
import { useState, useEffect } from "react";
import ActionModal from "../ActionModal/ActionModal";
import bagSvg from "../../assets/bag.svg";

const BB = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [numOfBags, setNumOfBags] = useState(Array.from({ length: 480 }));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // the below method adds more entries into the numOfBags array
  const updateNumOfBags = useCallback(() => {
    setLoading(true);
    setNumOfBags(numOfBags.concat(Array.from({ length: 480 })));
    setHasMore(numOfBags.length < 200640);
    setLoading(false);
  }, [numOfBags]);

  const observer = useRef();
  const lastBagElementRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          updateNumOfBags();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, updateNumOfBags]
  );

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.parentContainer}>
      {numOfBags.map((bag, index) => {
        if (numOfBags.length === index + 1) {
          return (
            <div
              className={styles.bagContainer}
              key={index}
              ref={lastBagElementRef}
            >
              <img className={styles.bagSvg} src={bagSvg} alt="body bag" />
            </div>
          );
        } else {
          return (
            <div className={styles.bagContainer} key={index}>
              <img className={styles.bagSvg} src={bagSvg} alt="body bag" />
            </div>
          );
        }
      })}
      <ActionModal
        scrollPosition={scrollPosition}
        scrollToTop={handleScrollToTop}
      />
      {loading && (
        <div className={styles.loadingContainer}>
          <h3>Loading...</h3>
        </div>
      )}
    </div>
  );
};

export default BB;
