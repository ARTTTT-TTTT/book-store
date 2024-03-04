function Footer() {
    return (
        <footer>
            <div className="footer-about-grid">
                <div className="footer-col">
                    <h5>Cloud Project</h5>
                    <a>Web Demo for Cloud Project</a>
                    <ul>
                        <li>
                            <a
                                className="fa fa-github footer-col-icon"
                                href="https://github.com/ARTTTT-TTTT"
                            >
                                {" "}
                            </a>
                            <a
                                className="fa fa-gitlab footer-col-icon"
                                href="https://gitlab.psu.ac.th/psu6510110192"
                            >
                                {" "}
                            </a>
                            <a
                                className="fa fa-facebook-official footer-col-icon"
                                href="https://www.facebook.com/thanaphat.panmas/"
                            >
                                {" "}
                            </a>
                            <a
                                className="fa fa-instagram footer-col-icon"
                                href="https://www.instagram.com/artttt_tttt/"
                            >
                                {" "}
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col-1">
                    <h6>Cloud Project</h6>
                    <ul>
                        <li>
                            <a href="/">About</a>
                        </li>
                        <li>
                            <a href="/">Careers</a>
                        </li>
                        <li>
                            <a href="/">Advertise with us</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col-2">
                    <h6>Support</h6>
                    <ul>
                        <li>
                            <a href="/">Product help</a>
                        </li>
                        <li>
                            <a href="/">Report an issue</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col-3">
                    <h6>Our communities</h6>
                    <ul>
                        <li>
                            <a href="/">Community</a>
                        </li>
                        <li>
                            <a href="/">Forum</a>
                        </li>
                        <li>
                            <a href="/">Chat</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col-4">
                    <h6>Developers</h6>
                    <ul>
                        <li>
                            <a href="/">Web Technologies</a>
                        </li>
                        <li>
                            <a href="/">Learn Web Development</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="footer-logo">
                    <h5>Cloud Project</h5>
                </div>
                <ul className="footer-link">
                    <li>
                        <a href="#">Website Privacy Notice</a>
                    </li>
                    <li>
                        <a href="#">Cookies</a>
                    </li>
                    <li>
                        <a href="#">Legal</a>
                    </li>
                    <li>
                        <a href="#">Community Participation Guidelines</a>
                    </li>
                </ul>
                <div className="footer-legal-text">
                    <a href="#">
                        Copyright{" "}
                        <i className="fa fa-copyright" aria-hidden="true"></i>{" "}
                        Web Demo for Cloud Project 2024
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
