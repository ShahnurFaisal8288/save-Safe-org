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
  const [place, setPlace] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Get both domain data with proper defaults
      const actingDomainJSON = localStorage.getItem("acting_domain");
      const primaryDomainJSON = localStorage.getItem("primary_domain");
      const place = localStorage.getItem("place");
      
      // Try acting_domain first
      if (actingDomainJSON && actingDomainJSON !== "null") {
        const actingDomains = JSON.parse(actingDomainJSON);
        if (Array.isArray(actingDomains) && actingDomains.length > 0) {
          setDomainData(actingDomains);
          return; // Exit early if we have valid data
        }
      }
      
      // Fall back to primary_domain if acting_domain failed
      if (primaryDomainJSON && primaryDomainJSON !== "null") {
        const primaryDomain = JSON.parse(primaryDomainJSON);
        if (primaryDomain && primaryDomain.id) {
          // Valid primary domain found, set it as acting domain too
          const domainArray = [primaryDomain];
          localStorage.setItem("acting_domain", JSON.stringify(domainArray));
          setDomainData(domainArray);
          return; // Exit early
        }
      }
      
      // If we get here, neither domain was valid
      console.log("No valid domain data found");
      setDomainData([]);
      
    } catch (error) {
      console.error("Error parsing domain data:", error);
      setDomainData([]);
    }
  }, []);
  useEffect(() => {
    const getProjectId = localStorage.getItem("project_id");
    setProjectId(getProjectId);
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      // Early return if required values are missing
      if (!projectId || !selectedDomain || selectedDomain === "") {
        console.log("Skipping API call - invalid values:", {
          projectId,
          selectedDomain,
        });
        return;
      }

      try {
        // Get the place from localStorage
        const place = localStorage.getItem("place");
        
        // Initialize all parameters with null
        let areaId = '';
        let divisionId = '';
        let regionId = '';
        let branchId = '';
        
        // Set the appropriate parameter based on place value
        switch(place?.toLowerCase()) {
          case 'area':
            areaId = selectedDomain;
            break;
          case 'division':
            divisionId = selectedDomain;
            break;
          case 'region':
            regionId = selectedDomain;
            break;
          case 'branch':
            branchId = selectedDomain;
            break;
          default:
            console.warn('Unknown place type:', place);
            return;
        }
        
        // Construct URL with all parameters
        const url = `acting_domain?program_id=${projectId}&area_id=${areaId}&branch_id=${branchId}&region_id=${regionId}&division_id=${divisionId}`;
        
        // Log request details
        console.log("API Request URL:", url);
        console.log("Parameters:", {
          program_id: projectId,
          area_id: areaId,
          branch_id: branchId,
          region_id: regionId,
          division_id: divisionId
        });

        const response = await axiosInstance.get(url);

        if (response.data && response.data.length === 0) {
          console.log("No data found for selected domain");
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

  console.log("selectedDomain:", selectedDomain);
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
