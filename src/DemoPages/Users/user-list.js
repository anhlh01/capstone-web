import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
// Users.js
import { fetchData } from '../../Services/user';
import ReactPaginate from 'react-paginate';
import * as Ionicons from "react-icons/io";
import { Link } from 'react-router-dom';
import { formatDateUtils } from "../../utils";


const Users = () => {
    const [paginationProps, setPaginationProps] = useState({
        page: 1, limit: 5
    })

    const [data, setData] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pageCount = Math.ceil(totalResults / paginationProps.limit);
    const IconName = Ionicons["IoIosEye"]

    const handleClick = (params) => {
        setPaginationProps(prev => ({ ...prev, page: params.selected + 1 }))
    };
    const onChangelimit = (e) => {
        setPaginationProps(prev => ({ ...prev, limit: Number(e.target.value) }))
    }
    const divStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '0 1rem',
        alignItems: 'center'
    };

    const divPageSizeStyle = {
        display: 'flex',
        width: '8rem',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImlhdCI6MTcxMTY4NjkwMCwiZXhwIjoxNzExNjg4NzAwLCJ0eXBlIjoiQUNDRVNTIn0.zlxkFbOBz4MSroNrkhMVFJ1dOh3W9tVTA-5asNDwk70';
                const responseData = await fetchData('users', authToken, {
                    sortType: 'asc',
                    limit: paginationProps.limit,
                    page: paginationProps.page
                });
                setData(responseData.results);
                setTotalResults(responseData.totalResults)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataFromAPI();
    }, [paginationProps]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="card" style={{ height: '100%' }} >
            <div className="card-body">
                <div class="card-title">Users</div>
                <Table striped className="mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(result => (
                            <tr key={result.id}>
                                <td>{result.id}</td>
                                <td>{result.email}</td>
                                <td>{result.name}</td>
                                <td>{result.role}</td>

                                <td>{formatDateUtils(result.createdAt)}</td>
                                <td>{formatDateUtils(result.updatedAt)}</td>
                                <td>
                                    <Link to={`/user/${result.id}`} title="See details">
                                        <IconName fontSize="35px" color="#333" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>

            </div>

            <div style={divStyle}>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={handleClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    initialPage={paginationProps.page - 1}
                />
                <div style={divPageSizeStyle}>
                    <label>Page size</label>
                    <select style={{ height: '1.5rem', width: '3rem' }} value={paginationProps.limit} onChange={onChangelimit}>
                        <option value={5}>5</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                    </select>
                </div>

            </div>

        </div>


    );
};

export default Users;


