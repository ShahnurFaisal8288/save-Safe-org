import React, { useEffect, useState } from "react";
import { Container, Row, Form, Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/axiosInstance";
import { use } from "react";

const DomainPage = () => {
  const [domainData, setDomainData] = useState([]);
  const [domain, setDomain] = useState([]);
  const [projectId, setProjectId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDomainData = localStorage.getItem("acting_domain");
    // Parse the JSON string from localStorage
    if (getDomainData) {
      try {
        const parsedData = JSON.parse(getDomainData);
        setDomainData(parsedData);
      } catch (error) {
        console.error("Error parsing domain data:", error);
        setDomainData([]);
      }
    }
  }, []);

  useEffect(() => {
    const getProjectId = localStorage.getItem("project_id");
    setProjectId(getProjectId);
 },[]);  
 
 useEffect(() => {
  const fetchApi = async () => {
    if (!projectId || !selectedDomain || selectedDomain === "") {
      console.log('Skipping API call - invalid values:', { projectId, selectedDomain });
      return;
    }

    try {
      // Log the exact URL being called
      const url = `acting_domain?program_id=${projectId}&area_id=${selectedDomain}`;
      console.log('API Request URL:', url);
      console.log('Parameters:', { projectId, selectedDomain });

      const response = await axiosInstance.get(url);
      
      if (response.data && response.data.length === 0) {
        console.log("No data found for: ", {
          program_id: projectId,
          region_id: selectedDomain
        });
      } else {
        console.log("Domain Data:", response.data);
      }
      
      setDomain(response.data);
    } catch (error) {
      console.error("Error fetching domain data:", error);
    }
  };

  fetchApi();
}, [selectedDomain, projectId]);

  const handleDomainSelection = (e) => {
    setSelectedDomain(e.target.value);
  };


  return (
    <div>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8} md={10} sm={12}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white py-3">
                <h3 className="mb-0 fw-bold">Domain Selection</h3>
              </Card.Header>
              <Card.Body className="p-4">
                <Form>
                  <Form.Group className="mb-4" controlId="formBasicDomain">
                    <Form.Label className="fw-semibold">
                      Select Your Domain
                    </Form.Label>
                    <Form.Select
                      className="form-select-lg py-2"
                      aria-label="Select Domain Name"
                      onChange={handleDomainSelection}
                    >
                      <option className="text-muted">
                        Please select a domain...
                      </option>
                      {domainData.length > 0 ? (
                        domainData.map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            {domain.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No domains available</option>
                      )}
                    </Form.Select>
                    <Form.Text className="text-muted mt-2">
                      Your selected domain will be used for all related
                      operations
                    </Form.Text>
                  </Form.Group>
                  <div className="d-grid gap-2 mt-4">
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="py-2"
                      onClick={() => navigate("/dashboard")}
                    >
                      Confirm Selection
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer className="bg-light text-center py-3">
                <small className="text-muted">
                  Contact administrator if your domain is not listed
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DomainPage;
