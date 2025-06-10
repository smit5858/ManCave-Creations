import { useEffect, useState } from 'react';
import './Testimonials.css';
import testimoniasService from '../../services/testimoniasService';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2); // Default to 2 items per page
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Fetch testimonials
        testimoniasService.getTestimonials()
            .then(fetchedTestimonials => {
                console.log('Testimonials fetched:', fetchedTestimonials);
                if (fetchedTestimonials.length > 0) {
                    setTestimonials(fetchedTestimonials);
                }
            })
            .catch(error => {
                console.error('Error fetching testimonials:', error);
            });
        
        // Adjust items per page based on window width
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Set items per page to 1 if the screen width is less than or equal to 768px (mobile)
        if (windowWidth <= 768) {
            setItemsPerPage(1);
        } else {
            setItemsPerPage(2); // Default for desktop
        }
    }, [windowWidth]); // Re-run when windowWidth changes

    const nextPage = () => {
        if (currentPage < Math.floor(testimonials.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const paginatedTestimonials = testimonials.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="testimonials">
            <div className="testi">
                <h1>What Our Customers Say</h1>
            </div>
            <div className="testi-container">
                <div className="testi-grid">
                    {paginatedTestimonials.map((item, index) => (
                        <div key={index} className="testimonial-item">
                            <div className="testi-name">{item.name}</div>
                            <div className="testi-rating">{item.star}</div>
                            <div className="testi-title">{item.msg_title}</div>
                            <div className="testi-msg">{item.msg}</div>
                        </div>
                    ))}
                </div>
                <div className="testi-btn">
                    <div
                        className={`testi-previous ${currentPage === 0 ? 'disabled' : ''}`}
                        onClick={previousPage}
                    >
                        PREVIOUS
                    </div>
                    <div
                        className={`testi-next ${currentPage === Math.floor(testimonials.length / itemsPerPage) ? 'disabled' : ''}`}
                        onClick={nextPage}
                    >
                        NEXT
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
