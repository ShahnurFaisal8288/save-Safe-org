
import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Alert,
} from "react-bootstrap";
import { Camera, CheckCircle } from "lucide-react";
import axios from "axios";



function InsuranceForm() {
    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isEligible, setIsEligible] = useState(true);
    const [validated, setValidated] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");





   
    

    


    const handleImageChange = (e, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleHealthStatusChange = (status) => {
        setValidated(false);
        if (status === "1") {
            setShowForm(true);
            setIsEligible(true);
        } else if (status === "2") {
            setShowForm(false);
            setIsEligible(false);
        }
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Container className="py-5">
            <Card className="shadow-lg">
                <Card.Header className="bg-primary text-white">
                    <h2 className="mb-0">Insurance Application Form</h2>
                </Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated}
                        // onSubmit={handleSubmitForm}
                    >
                        {/* extra field Start */}
                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Control
                                        type="hidden"
                                        name="ApiKey"
                                        value="api-key"
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    name="CoNo"
                                    value="CO12000"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    name="OrgNo"
                                    value="ORG123456"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    name="OrgMemNo"
                                    value="ORG_MEM123"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    name="EnrollId"
                                    value="ENROL123456"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    name="ErpMemId"
                                    value="ERP123"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    name="ProjectCode"
                                    value="PROJ001"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        {/* end extra Data */}

                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Member Name</Form.Label>
                                    <Form.Control
                                        list="user_name_options"
                                        name="Member_name"
                                        placeholder="Select or type user name"
                                    />
                                    <datalist id="user_name_options">
                                       
                                    </datalist>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>
                                        Are you suffering from serious health complications?
                                    </Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            name="AnyDisese"
                                            id="inline-radio-1"
                                            onChange={() => handleHealthStatusChange("1")}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            name="AnyDisese"
                                            id="inline-radio-2"
                                            onChange={() => handleHealthStatusChange("2")}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        {!isEligible && (
                            <Alert variant="danger" className="text-center">
                                You are not eligible for this insurance
                            </Alert>
                        )}

                        {showForm && (
                            <>
                                <Row className="mb-4">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Insurance Policy Name</Form.Label>
                                            <Form.Control as="select" name="PolicyName">
                                                <option value="">Select Insurance Policy Name</option>
                                                
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Insurance Type</Form.Label>
                                            <Form.Control as="select" name="InsuranceType">
                                                <option value="">Select Insurance Type</option>
                                                <option value="1">Subscribe</option>
                                                <option value="2">Re-New</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="Category"
                                                value={selectedCategory}
                                                // onChange={handleCategoryChange}
                                            >
                                                <option value="">Select Category</option>
                                                
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Premium Amount</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="PremiumAmount"
                                                // value={premiumAmount}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Duration</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="policy_tenure"
                                                // value={policy_tenure}
                                                readOnly />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Phone Number</Form.Label>

                                            <Form.Control
                                                type="tel"
                                                name="Phone"
                                                pattern="[0-9]{10}"
                                            // required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a valid 10-digit phone number
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Card className="mb-4">
                                    <Card.Header className="bg-light">
                                        <h4>Nominee Information</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="NomineeName"
                                                    // required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Phone Number</Form.Label>

                                                    <Form.Control
                                                        type="tel"
                                                        name="NomineePhone"
                                                        pattern="[0-9]{10}"
                                                    // required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please enter a valid 10-digit phone number
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Date Of Birth</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="NomineeDOB"
                                                    // required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>ID Type</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="NomineeIDType"
                                                        // value={nomineeIDType}
                                                        // onChange={handleNomineeIDTypeChange}
                                                    // required
                                                    >
                                                        {/* <option value="">Select ID Type</option>
                            <option value="specificIDType">
                              Specific ID Type
                            </option>
                            <option value="anotherIDType">
                              Another ID Type
                            </option> */}
                                                        
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        

                                        <Row className="mb-3">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Main ID Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="NomineeIDNumber"
                                                    // required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Relation</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="NomineeRelation"
                                                    // required
                                                    >
                                                        <option value="">Select Relation</option>
                                                       
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Nominee ID Front Picture *</Form.Label>
                                                    <div className="border-dashed p-3 text-center">
                                                        {frontPreview ? (
                                                            <img
                                                                src={frontPreview}
                                                                alt="Front ID"
                                                                className="img-fluid rounded"
                                                            />
                                                        ) : (
                                                            <div className="text-muted">
                                                                <Camera size={48} className="mx-auto mb-2" />
                                                                <p>Upload Front Side</p>
                                                            </div>
                                                        )}
                                                        <Form.Control
                                                            type="file"
                                                            name="nomineeImageFront"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                handleImageChange(e, setFrontPreview)
                                                            }
                                                            className="mt-2"
                                                        // required
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Nominee ID Back Picture *</Form.Label>
                                                    <div className="border-dashed p-3 text-center">
                                                        {backPreview ? (
                                                            <img
                                                                src={backPreview}
                                                                alt="Back ID"
                                                                className="img-fluid rounded"
                                                            />
                                                        ) : (
                                                            <div className="text-muted">
                                                                <Camera size={48} className="mx-auto mb-2" />
                                                                <p>Upload Back Side</p>
                                                            </div>
                                                        )}
                                                        <Form.Control
                                                            type="file"
                                                            name="nomineeImageBack"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                handleImageChange(e, setBackPreview)
                                                            }
                                                            className="mt-2"
                                                        // required
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <div className="text-center">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        size="lg"
                                        className="px-5"
                                    >
                                        <CheckCircle className="me-2" /> Submit Application
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default InsuranceForm;
