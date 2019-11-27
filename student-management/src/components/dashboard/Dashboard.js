import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getStudentDetails } from '../../services/StudentService';
import Header from '../common/header/Header';

// Register Actions
import { studentListAction } from '../../redux/actions/DashboardAction';

class Dashboard extends Component {

    componentDidMount() {
        getStudentDetails().then(res => {
            const list = [];
            for (let data in res.data) {
                list.push(res.data[data]);
            }
            // Update store with list
            this.props.studentList(list);
        });
    }

    render() {
        return (
            <React.Fragment>
                 <Header />
                {
                    this.props.dashboardReducer.filterStudentList.length ?
                        <div className="row">
                            {this.props.dashboardReducer.filterStudentList.map((e, i) => {
                                let total = 0;
                                return (
                                    <div
                                        key={'card_' + i}
                                        className="col-sm-6 col-md-4 m-y-10">
                                        <div className="card text-center">
                                            <div className="card-body">
                                                <h5 className="card-title text-uppercase text-black-50">{e.name}</h5>
                                                <h6 className="card-title border-top border-success border-bottom">{e.rollNo}</h6>
                                                <div className="mark">
                                                    <table className="table table-bordered table-sm table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                {Object.keys(e.marks).map((mark, i) => {
                                                                    return <th key={'head_' + i}>{mark}</th>
                                                                })}
                                                                <th>Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                {Object.keys(e.marks).map((mark, i) => {
                                                                    total = total + e.marks[mark];
                                                                    return <td key={'col_' + i}>{e.marks[mark]} </td>
                                                                })}
                                                                <td>{total}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    : 'Loading....'
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dashboardReducer: state.dashboardReducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        studentList: (list) => {
            dispatch(studentListAction(list));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);