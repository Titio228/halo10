import "./Footer.css";
export default function Footer() {
  const dateNow = new Date();
  const dd = dateNow.getDate();
  const mm = dateNow.getMonth() + 1;
  const yyyy = dateNow.getFullYear();
  const formatDate = dd + " - " + mm + " - " + yyyy;
  return (
    <div className="footer">
      <div className="left">{formatDate}</div>
      <div className="center">Version 8.0</div>
      <div className="right">@Created by Scudy</div>
    </div>
  );
}
