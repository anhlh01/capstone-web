import React, { Fragment, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
    Col,
    Card,
    CardBody,
    CardTitle,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
} from "reactstrap";

// Applications.js
import { getDetail, changeStatus } from '../../Services/application';
import { formatDateUtils } from '../../utils'

const ApplicationDetail = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [status, setStatus] = useState(["PENDING", "APPROVED", "REJECTED"]);
    const [selectedType, setSelectedType] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const fetchDataFromAPI = async () => {
        // Get the full URL
        const fullUrl = window.location.href;

        // Get the value of the last fragment (or "flash") from the URL
        const fragments = fullUrl.split('/');
        const id = fragments[fragments.length - 1];
        setId(id)
        console.log('status: ', status.length)
        try {
            // Example of passing authentication token and parameters
            const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImlhdCI6MTcxMTY4NjkwMCwiZXhwIjoxNzExNjg4NzAwLCJ0eXBlIjoiQUNDRVNTIn0.zlxkFbOBz4MSroNrkhMVFJ1dOh3W9tVTA-5asNDwk70';
            const responseData = await getDetail('applications', authToken, id);

            responseData.createdAt = formatDate(responseData.createdAt)
            responseData.updatedAt = formatDate(responseData.updatedAt)
            setData(responseData);
            // setData(JSON.parse(data))
            setSelectedStatus(responseData.status)
            setSelectedType(responseData.type)
            if (responseData.status != 'PENDING') {
                setStatus([responseData.status])
                setDisabled(true)
            }

            else
                setDisabled(false)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchDataFromAPI();
    }, []);

    const handleStatusChange = (event) => {
        if (data.status == 'PENDING')
            setSelectedStatus(event.target.value)
        else return
    };

    const handleTypeChange = (event) => {
        setSelectedStatus(event.target.value)
    };

    function formatDate(dateString) {
        return formatDateUtils(dateString)
    }
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    function handleSubmit(e) {
        e.preventDefault();
        const changeApplicationStatus = async () => {

            try {
                // Example of passing authentication token and parameters
                const responseData = await changeStatus('applications', selectedStatus, id);
                setData(responseData);
                setSelectedStatus(responseData.status)
                setSelectedType(responseData.type)
                setDisabled(false)

                console.log('status: ' + selectedStatus)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
                fetchDataFromAPI();
            }
        };

        changeApplicationStatus();
    }
    return (
        <Fragment>
            <TransitionGroup>
                <CSSTransition component="div" classNames="TabsAnimation" appear={true}
                    timeout={0} enter={false} exit={false}>
                    <Container fluid>
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Admin detail # {id}</CardTitle>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>
                                            Approved By Id
                                        </Label>

                                        <Col sm={10}>
                                            <Input disabled type="text" name="approvedById" id="exampleEmail" placeholder="with a placeholder" value={data.approvedById} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="examplePassword" sm={2}>
                                            Created At
                                        </Label>
                                        <Col sm={10}>
                                            <Input disabled type="text" name="createdAt" id="createdat" placeholder="password placeholder" value={data.createdAt} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="examplePassword" sm={2}>
                                            Updated At
                                        </Label>
                                        <Col sm={10}>
                                            <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={data.updatedAt} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="status" sm={2}>
                                            Status
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                                type="select"
                                                name="select"
                                                id={data.status}
                                                value={selectedStatus}
                                                onChange={handleStatusChange}
                                            >
                                                {status.map((statusValue, index) => (
                                                    <option key={index} value={statusValue}>
                                                        {statusValue}
                                                    </option>
                                                ))}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleText" sm={2}>
                                            Type
                                        </Label>
                                        <Col sm={10}>
                                            <Input disabled type="text" name="select" id={data.type} value={selectedType} onChange={handleTypeChange} >

                                                <option key={selectedType} value={selectedType}>
                                                    {selectedType}
                                                </option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleText" sm={2}>
                                            Description
                                        </Label>
                                        <Col sm={10}>
                                            <Input disabled type="textarea" name="description" id="exampleText" value={data.description} />
                                        </Col>
                                    </FormGroup>
                                    {!disabled ? (
                                        <FormGroup check row>
                                            <Col sm={{ size: 10, offset: 2 }}>
                                                <Button>Update</Button>
                                            </Col>
                                        </FormGroup>
                                    ) : (
                                        <div></div>
                                    )}
                                </Form>
                            </CardBody>
                        </Card>
                    </Container>
                </CSSTransition>
            </TransitionGroup>
        </Fragment>
    );
};

export default ApplicationDetail;
