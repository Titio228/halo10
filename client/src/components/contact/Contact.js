import "./Contact.css";
export default function Contact() {
  return (
    <div className="contact">
      <div className="title-contact">
        <h3>Contact</h3>
      </div>
      <div className="phone">
        <h4>Phone</h4>
        <p>
          <span>BE</span> (+32) 472/585858
        </p>
        <p>
          <span>FR</span> (+33) 472/585858
        </p>
        <p>
          <span>NL</span> (+31) 472/585858
        </p>
      </div>
      <div className="email">
        <h4>Email</h4>
        <p>halo@gmail.com</p>
      </div>
      <div className="planning">
        <h4>Planning</h4>
        <p>Monday : 9h - 18h</p>
        <p>Tuesday : 9h - 18h</p>
        <p>Wednesday : 9h - 18h</p>
        <p>Thursday : 9h - 18h</p>
        <p>Friday : 9h - 18h</p>
      </div>
    </div>
  );
}
