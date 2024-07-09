import React, { useEffect, useState } from "react";
import {
    MDBCarousel,
    MDBCarouselItem,
    MDBCol,
    MDBIcon,
    MDBTypography,
    MDBContainer,
    MDBRow,
} from "mdb-react-ui-kit";
import CommonLayout from "../../../layouts/CommonLayout";
import { allAPiServicesCall } from "../../../services/apiServices";
import { getAuthConfig } from "../../../services/apiUtils";
import { Button } from "react-bootstrap";
import { ROUTE_CONSTANT } from "../../../routes/constant";
import { useNavigate } from "react-router-dom";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const testimonialList = async () => {
        try {
            const response = await allAPiServicesCall.getTestimonialList({}, getAuthConfig());
            setTestimonials(response.data.testimonials);
        } catch (error) {
            console.error("There was an error fetching the testimonials!", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        testimonialList();
    }, []);

    const handleOnDelete = async (testimonialId) => {
        setLoading(true)
        try {
            await allAPiServicesCall.deleteTestimonial({ testimonialId }, getAuthConfig());
            testimonialList();
        } catch (error) {
            console.error("There was an error deleting the testimonial!", error);
        } finally {
            setLoading(false);
        }
    };

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const chunkedTestimonials = chunkArray(testimonials, 3);

    return (
        <CommonLayout>
            <div className="d-flex justify-content-center mt-3 border-box">
                <Button variant="success" onClick={() => navigate(ROUTE_CONSTANT.COMMON.ADD_TESTIMONIAL)}>Add Testimonial</Button>
            </div>
            <MDBContainer className="py-5 mt-2 mb-5">
                {loading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    testimonials && testimonials.length === 0 ? (
                        <div className="text-center">
                            <h1>No testimonials found</h1>
                        </div>
                    ) : testimonials.length <= 3 ? (
                        <MDBRow className="text-center">
                            {testimonials.map((testimonial) => (
                                <MDBCol lg="4" className="mb-5 mb-md-0" key={testimonial._id}>
                                    <div className="d-flex justify-content-center mb-4">
                                        <img
                                            src={testimonial.avatar}
                                            className="rounded-circle shadow-1-strong"
                                            width="150"
                                            height="150"
                                            alt={testimonial.fullName}
                                        />
                                    </div>
                                    <h5 className="mb-3">{testimonial.fullName}</h5>
                                    <h6 className="text-primary mb-3">Rating: {testimonial.rating}</h6>
                                    <p className="px-xl-3">
                                        <MDBIcon fas icon="quote-left" className="pe-2" />
                                        {testimonial.description}
                                    </p>
                                    <MDBTypography
                                        listUnStyled
                                        className="d-flex justify-content-center mb-0"
                                    >
                                        {[...Array(5)].map((_, starIndex) => (
                                            <li key={starIndex}>
                                                <MDBIcon
                                                    fas
                                                    icon={starIndex < testimonial.rating ? "star" : "star-half-alt"}
                                                    size="sm"
                                                    className="text-warning"
                                                />
                                            </li>
                                        ))}
                                    </MDBTypography>
                                    <Button variant="danger" className="mt-4" onClick={() => handleOnDelete(testimonial._id)}>Delete</Button>
                                </MDBCol>
                            ))}
                        </MDBRow>
                    ) : (
                        <MDBCarousel showControls showIndicators dark>
                            {chunkedTestimonials.map((testimonialGroup, index) => (
                                <MDBCarouselItem key={index} className={index === 0 ? "active" : ""}>
                                    <MDBContainer>
                                        <MDBRow className="text-center">
                                            {testimonialGroup.map((testimonial) => (
                                                <MDBCol lg="4" className="mb-5 mb-md-0" key={testimonial._id}>
                                                    <div className="d-flex justify-content-center mb-4">
                                                        <img
                                                            src={testimonial.avatar}
                                                            className="rounded-circle shadow-1-strong"
                                                            width="150"
                                                            height="150"
                                                            alt={testimonial.fullName}
                                                        />
                                                    </div>
                                                    <h5 className="mb-3">{testimonial.fullName}</h5>
                                                    <h6 className="text-primary mb-3">Rating: {testimonial.rating}</h6>
                                                    <p className="px-xl-3">
                                                        <MDBIcon fas icon="quote-left" className="pe-2" />
                                                        {testimonial.description}
                                                    </p>
                                                    <MDBTypography
                                                        listUnStyled
                                                        className="d-flex justify-content-center mb-0"
                                                    >
                                                        {[...Array(5)].map((_, starIndex) => (
                                                            <li key={starIndex}>
                                                                <MDBIcon
                                                                    fas
                                                                    icon={starIndex < testimonial.rating ? "star" : "star-half-alt"}
                                                                    size="sm"
                                                                    className="text-warning"
                                                                />
                                                            </li>
                                                        ))}
                                                    </MDBTypography>
                                                    <Button variant="danger" className="mt-4" onClick={() => handleOnDelete(testimonial._id)}>Delete</Button>
                                                </MDBCol>
                                            ))}
                                        </MDBRow>
                                    </MDBContainer>
                                </MDBCarouselItem>
                            ))}
                        </MDBCarousel>
                    )
                )}
            </MDBContainer>
        </CommonLayout>
    );
}

export default Testimonials;
