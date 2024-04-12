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
import {
    useParams
} from "react-router-dom";

// Applications.js
import { getDetail } from '../../Services/user';
import { formatDateUtils } from '../../utils';
import defaultImageUrl from '../../assets/images/faces/default-avatar.jpeg';

const UserDetail = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [status, setStatus] = useState(["PENDING", "APPROVED", "REJECTED"]);
    const [selectedType, setSelectedType] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const id = useParams();
    console.log('id: ' + JSON.stringify(id.id))

    const fetchDataFromAPI = async () => {
        console.log('status: ', status.length)
        try {
            // Example of passing authentication token and parameters
            const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImlhdCI6MTcxMTY4NjkwMCwiZXhwIjoxNzExNjg4NzAwLCJ0eXBlIjoiQUNDRVNTIn0.zlxkFbOBz4MSroNrkhMVFJ1dOh3W9tVTA-5asNDwk70';
            const responseData = await getDetail('users', authToken, id.id);

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

    // Date time format
    function formatDate(dateString) {
        return formatDateUtils(dateString)
    }

    function handleSubmit(e) {
        e.preventDefault();
        const changeApplicationStatus = async () => {

            try {
                // Example of passing authentication token and parameters
                // const responseData = await changeStatus('applications', selectedStatus, id);
                // setData(responseData);
                // setSelectedStatus(responseData.status)
                // setSelectedType(responseData.type)
                setDisabled(false)

                console.log('status: ' + selectedStatus)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
                // fetchDataFromAPI();
            }
        };

        changeApplicationStatus();
    }

    var imageExists = true;

    const checkImage = () => {
        const img = new Image();
        img.src = data.avatar;
        if (/\.(jpeg|jpg|gif|png)$/.test(img.src)) {
            imageExists = true;
        } else {
            imageExists = false;
        }

        img.onload = () => {
            if (/\.(jpeg|jpg|gif|png)$/.test(img.src)) {
                imageExists = true;
            } else {
                console.log(2);
                imageExists = false;
            }
        };
        img.onerror = () => {
            imageExists = false;
        };
    };

    checkImage();

    return (<Fragment>
        <TransitionGroup>
            <CSSTransition component="div" classNames="TabsAnimation" appear={true}
                timeout={0} enter={false} exit={false}>
                <Container fluid>
                    <Card className="main-card mb-3">
                        <CardBody>
                            <CardTitle>User detail # {data.id}</CardTitle>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        Avatar
                                    </Label>
                                    <Col sm={10}>
                                        {data.avatar && imageExists ? (
                                            <img src={data.avatar} alt={"User Avatar"} style={{ width: 100, height: 100, borderRadius: '50%' }} />
                                        ) : (
                                            <img src={defaultImageUrl} alt={"User Avatar"} style={{ width: 100, height: 100, borderRadius: '50%' }} />
                                        )}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="id" sm={2}>
                                        Id
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="approvedById" id="id" placeholder="with a placeholder" value={data.id} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        Email
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="createdAt" id="createdat" placeholder="password placeholder" value={data.email} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        Name
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={data.name} />
                                    </Col>
                                </FormGroup>

                                {/* ROLE */}
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        ROLE
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={data.role} />
                                    </Col>
                                </FormGroup>
                                {/* GENDER */}
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        GENDER
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={data.gender} />
                                    </Col>
                                </FormGroup>
                                {/* ACCOUNT TYPE */}
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        ACCOUNT TYPE
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={data.accountType} />
                                    </Col>
                                </FormGroup>
                                {/* HEIGHT */}
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        HEIGHT
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={data.height} />
                                    </Col>
                                </FormGroup>
                                {/* DATE OF BIRTH */}
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        BIRTHDATE
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={formatDate(data.dob)} />
                                    </Col>
                                </FormGroup>
                                {/* START FREE TIME */}
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        START FREE TIME
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={formatDate(data.startFreeTime)} />
                                    </Col>
                                </FormGroup>
                                {/* END FREE TIME */}
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        END FREE TIME
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={formatDate(data.endFreeTime)} />
                                    </Col>
                                </FormGroup>
                                {/* CREATE AT */}
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        CREATED AT
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={data.createdAt} />
                                    </Col>
                                </FormGroup>
                                {/* UPDATE AT */}
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>
                                        UPDATED AT
                                    </Label>
                                    <Col sm={10}>
                                        <Input disabled type="text" name="updatedAt" id="updatedat" placeholder="password placeholder" value={data.updatedAt} />
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup row>
                                    <Label for="status" sm={2}>
                                        Status
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="select"
                                            name="select"
                                            id={data.status}
                                            value={selectedStatus}
                                        // onChange={handleStatusChange}
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
                                        <Input disabled type="text" name="select" id={data.type} value={selectedType} >

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
                                )} */}
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </CSSTransition>
        </TransitionGroup>
    </Fragment>)


    // < div > {id.id }</div >


    function formatDate(dateString) {
        return formatDateUtils(dateString)
    }

};

export default UserDetail;
