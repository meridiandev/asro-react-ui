import React from 'react';
import apiClient from '../services/api';

const Reports = (props) => {
    const [reports, setReports] = React.userState([]);

    React.useEffect(() => {
        if (props.loggedIn) {
            apiClient.get('api/reports').then(response => {
                setReports(response.data)
            })
            .catch(error => console.error(error));
        }
    }, []);

    const reportList = reports.map((report) =>
    <div key = {report.id } className = "list-group-item">
        <h5>{ report.user_id}</h5>
        <small>{ report.event_form }</small>
    </div>
    );
    if (props.loggedIn) {
        return (
            <div className = "list-group">{ reportList }</div>
        );
    }
    return (
        <div className = "alert alert-warning">Вы не вошли в систему!</div>
    );
};

export default Reports;