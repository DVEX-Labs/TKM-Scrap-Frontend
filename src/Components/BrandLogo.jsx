import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ecoscrap-logo.png";

function BrandLogo({
  className = "",
  imageClassName = "h-8 w-auto",
  linkTo = "/",
  showLink = true,
  enableAdminShortcut = false,
}) {
  const navigate = useNavigate();

  const image = (
    <img
      src={logo}
      alt="Eco Scrap"
      className={`object-contain ${imageClassName}`}
      onDoubleClick={
        enableAdminShortcut
          ? (e) => {
              e.preventDefault();
              navigate("/admin");
            }
          : undefined
      }
    />
  );

  if (!showLink) {
    return <div className={className}>{image}</div>;
  }

  return (
    <Link to={linkTo} className={`inline-flex items-center ${className}`} aria-label="Go to home">
      {image}
    </Link>
  );
}

export default BrandLogo;
