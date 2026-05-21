import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '../../assets/studynook-logo.png';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#0f0f1a', borderTop: '1px solid #2a2a4e' }}>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-16">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                        <img 
                         src={logo} 
                         alt="StudyNook" 
                         className="h-10 w-auto"
                          />
                         <span style={{ color: '#10b981' }} className="text-xl font-bold">Study   
                         </span>
                         <span style={{ color: '#ffffff' }} className="text-xl font-bold">Nook</span>
                         </Link>
                        <p style={{ color: '#9ca3af' }} className="text-sm leading-relaxed">
                            Browse and book quiet, private study rooms in your library. 
                            List your own room and earn.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className='justify-self-center'>
                        <h3 style={{ color: '#10b981' }} className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 ">
                            <li><Link to="/" style={{ color: '#9ca3af' }} className="hover:text-emerald-400 transition-colors text-sm">Home</Link></li>
                            <li><Link to="/rooms" style={{ color: '#9ca3af' }} className="hover:text-emerald-400 transition-colors text-sm">All Rooms</Link></li>
                            <li><Link to="/about" style={{ color: '#9ca3af' }} className="hover:text-emerald-400 transition-colors text-sm">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className='justify-self-end px-4'>
                        <h3 style={{ color: '#10b981' }} className="font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li style={{ color: '#9ca3af' }} className="text-sm">📧 support@studynook.com</li>
                            <li style={{ color: '#9ca3af' }} className="text-sm">📞 +880 175 898 7068</li>
                        </ul>
                        {/* Social Icons */}
                            <div className="flex gap-4 mt-4 pl-1">
                            <a href="#" style={{ color: '#9ca3af' }} className="hover:text-emerald-400 transition-colors text-xl">
                                <FaFacebook />
                            </a>
                            <a href="#" style={{ color: '#9ca3af' }} className="hover:text-emerald-400 transition-colors text-xl">
                                <FaXTwitter />
                            </a>
                            <a href="#" style={{ color: '#9ca3af' }} className="hover:text-emerald-400 transition-colors text-xl">
                                <FaLinkedin />
                            </a>
                            <a href="#" style={{ color: '#9ca3af' }} className="hover:text-emerald-400 transition-colors text-xl">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid #2a2a4e' }} className="mt-8 pt-6 text-center">
                    <p style={{ color: '#6b7280' }} className="text-sm">
                         &copy;2026 StudyNook. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;