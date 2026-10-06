import Text from "../components/Text";
import styles from "./About.module.css";
import HeroImage from "../assets/hero-img.jpg";
import TrackItImage from "../assets/about-img.jpg";

const AboutPage = () => {
  return (
    <>
      <div className={styles.hero_cont}>
        <div className={styles.hero}>
          <div className={styles["hero-top"]}>
            <Text variant="h1">Keep your applications in one place</Text>
            <ul className={styles.points}>
              <li>
                <Text variant="p">Easy Access</Text>
              </li>
              <li className={styles.special_point}>
                <Text variant="p">Fully Private</Text>
              </li>
              <li>
                <Text variant="p">No Fees</Text>
              </li>
            </ul>

            <button className={styles["cta-btn"]}>
              <Text variant="p">Register Now</Text>
            </button>
          </div>
          <div className={styles["hero-bottom"]}>
            <img
              src={HeroImage}
              alt="A snapshot of the application tracking user interface"
            />
          </div>
        </div>
      </div>

      <div className={styles.section_cont}>
        <div className={styles.about_section}>
          <div className={styles["about-left"]}>
            <Text variant="heading">Ease of use</Text>
            <Text variant="p">
              The Track-It web application is easy to use.
            </Text>
            <Text variant="p">
              We pride ourselves on having a system you can use from anywhere,
              at any time, securely.
            </Text>
            <ul className={styles.ease_points}>
              <li>
                <Text variant="p">
                  Track-it is easy to use and your records are always available.
                </Text>
              </li>

              <li>
                <Text variant="p">
                  The interface is designed to be easy to use regardless of your
                  level of computer literacy.
                </Text>
              </li>

              <li>
                <Text variant="p">
                  You only need a device that is connected to the internet to
                  begin recording your applications.
                </Text>
              </li>

              <li>
                <Text variant="p">
                  The design uses popular icons to allow intuitive actions
                  without the need for documentations.
                </Text>
              </li>
            </ul>
          </div>
          <div className={styles["about-right"]}>
            <img src={TrackItImage} alt="an image of Track-it" />
          </div>
        </div>
      </div>

      <div className={styles.cia_cont}>
        <div className={styles.cia_content}>
          <Text variant="heading">Private and Secure</Text>
          <Text variant="p">
            With our authentication, your application records are private and
            accessible to you alone
          </Text>
          <div className={`${styles.card_cont}`}>
            <div className={`${styles.card}`}>
              <div>
                <Text variant="subHeading">Confidentiality</Text>
              </div>
              <div className={styles.tinted}>
                <Text variant={"p"}>
                  Your records are private and your password is required for
                  access
                </Text>
              </div>
            </div>
            <div className={`${styles.card}`}>
              <div>
                <Text variant="subHeading">Integrity</Text>
              </div>
              <div className={styles.tinted}>
                <Text variant={"p"}>
                  Your records are safe from outside interference and cannot be
                  changed but anyone else
                </Text>
              </div>
            </div>
            <div className={`${styles.card}`}>
              <div>
                <Text variant="subHeading">Availability</Text>
              </div>
              <div className={styles.tinted}>
                <Text variant={"p"}>
                  Your records are available to you, when you need them. No
                  waiting time, not down time.
                </Text>
              </div>
            </div>
          </div>
          <div>
            <button className={`${styles.cia_btn}`}>
              <Text variant="p">Get Started</Text>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.costs_cont}>
        <div className={styles.costs_content}>
          <div className={styles.costs_left}>
            <ul className={styles.costs_list}>
              <li>
                <Text variant="p">0 Maintenance Fees</Text>
              </li>
              <li
                className={`${styles.special_points} ${styles.first_special_point}`}
              >
                <Text variant="p">0 Subscription Fees</Text>
              </li>
              <li className={styles.special_points}>
                <Text variant="p">0 Hidden Fees</Text>
              </li>
              <li>
                <Text variant="p">0 Future Payments</Text>
              </li>
            </ul>
          </div>
          <div className={styles.costs_right}>
            <Text variant="heading">Free, Forever!</Text>
            <div className={styles.costs_right_text}>
              <Text variant="p">
                The system comes without taking funds out of your pockets, not
                even in the future.
              </Text>

              <Text variant="p">
                Bring clear structure into your search for a job with our job
                application tracking system.
              </Text>

              <Text variant="p">No cost to you, that is our guarantee!</Text>
            </div>

            <button className={styles.reg_btn}>
              <Text variant="p">Register Now</Text>
            </button>
          </div>
        </div>
      </div>

      <footer>
        <div className={styles.footer_content}>
          <div>
            <Text variant="h1">Track-It</Text>
            <Text variant="p">Never Lose It!</Text>
          </div>

          <ul>
            <li>
              <Text variant="p">About</Text>
            </li>
            <li>
              <Text variant="p">Product</Text>
            </li>
            <li>
              <Text variant="p">FAQ</Text>
            </li>
            <li>
              <Text variant="p">Support</Text>
            </li>
          </ul>

          <div>
            <div className={styles.contact}>
              <Text variant="p">Contact</Text>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutPage;
