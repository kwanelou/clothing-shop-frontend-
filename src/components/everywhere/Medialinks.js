import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="d-flex gap-3 fs-4">

      <a href="https://facebook.com" target="_blank" rel="noreferrer">
        <FaFacebook />
      </a>

      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        <FaInstagram />
      </a>

      <a href="https://twitter.com" target="_blank" rel="noreferrer">
        <FaTwitter />
      </a>

      <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer">
        <FaWhatsapp />
      </a>

    </div>
  );
};

export default SocialLinks;