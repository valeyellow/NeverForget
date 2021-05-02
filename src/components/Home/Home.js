import axios from "axios";
import React from "react";
import styles from "./Home.module.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 218569,
    };
    this.startPolling = null;
  }

  async componentDidMount() {
    try {
      this.startPolling = setInterval(async () => {
        let updatedCount = 0;
        const covidData = await axios({
          method: "GET",
          url: "https://api.covid19india.org/data.json",
        });

        updatedCount = parseInt(covidData.data.statewise[0].deaths);
        if (updatedCount === this.state.count) {
          return;
        }
        this.setState({ count: updatedCount });
      }, 10000);
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.startPolling);
  }

  render() {
    const { count } = this.state;
    return (
      <div className={styles.homeWrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.headerText}>#NeverForget</div>
          <div className={styles.subText}>
            <div className={styles.subTextLine}>People in India are dying.</div>
            <div className={styles.subTextLine}>
              Members from our species are dying.
            </div>
            <div className={styles.subTextLine}>Hope is dying.</div>
          </div>
        </div>
        <div className={styles.countContainer}>
          <div className={styles.countText}>{count.toLocaleString()}</div>
          <div className={styles.countSubText}>deaths till now</div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsText}>
            Below is an art work demonstrating the indian people who have died
            in this pandemic.
          </div>
          <div className={styles.detailsText}>It is updated real-time.</div>
          <div className={styles.detailsText}>
            The reason to do this is to not forget these deaths, rather use it
            as fuel to raise money so that more people are not added to this art
            work.
          </div>
          <div className={styles.detailsText}>
            History is watching us. We will never forget.
          </div>
        </div>
        <a
          href="https://makersplace.com/mitrai/warriors-of-hope-1-of-1-65851/"
          target="_blank"
          className={styles.callToActionBtn}
        >
          BID FOR THIS NFT TO DONATE TO THIS CAUSE
        </a>
        <div className={styles.footerText}>INDIANS IN BODY BAGS</div>
      </div>
    );
  }
}

export default Home;
