import '../css/footer.css';
const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-left col-md-4 col-sm-6">
        <p class="about">
          <span> About the platform</span>A platform independent web portal where customer can search restaurant, get
          authentic detailed review and finally reserve restaurant table and restaurants can create and publish
          their profile where they can give firsthand information about them.
        </p>
      </div>
      <div class="footer-center col-md-4 col-sm-6">
        <div>
          <i class="fa fa-map-marker"></i>
          <p><span> Address </span> BoardBazar, Gazipur</p>
        </div>
        <div>
          <i class="fa fa-phone"></i>
          <p> +880 2 9291254-59</p>
        </div>
        <div>
          <i class="fa fa-envelope"></i>
          <p><a href="#"> dinospace@gmail.com</a></p>
        </div>
      </div>
      <div class="footer-right col-md-4 col-sm-6">
        <h2> DinoSpace</h2>
        <p class="menu">
          <a href="#"> Home</a> |
          <a href="#"> About</a> |
          <a href="#"> Services</a> |
          <a href="#"> Portfolio</a> |
          <a href="#"> News</a> |
          <a href="#"> Contact</a>
        </p>
        <p class="name"> DinoSpace &copy; 2021</p>
      </div>
    </footer>
  );
}

export default Footer;
