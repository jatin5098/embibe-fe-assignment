import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../common/header/Header';

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        name: 'Page A', mark: 22, total: 100,
    }
];

class Details extends Component {
    state = {
        details: null,
        data: []
    }
    componentWillMount() {
        const id = this.props.history.location.pathname.substr(1);
        let details;
        if(this.props.dashboardReducer.studentList.length > 0) {
            details = this.props.dashboardReducer.studentList.find((e) => e.rollNo == id);
        } else {
            details = JSON.parse(localStorage.getItem('details'));
        }
        this.setState({ details });
    }

    componentDidMount() {
        console.log(this.state.details);
        let mapdata = [];
        for(let data in this.state.details.marks) {
            const obj = {
                name: data,
                mark: this.state.details.marks[data],
                total: 100
            }
            mapdata.push(obj);
        }
        this.setState({ data: mapdata });
        localStorage.setItem('details', JSON.stringify(this.state.details));
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="row">
                    <div
                        key={'card_0'}
                        className="col-sm-6">
                        <div className="card text-center box-shadow">
                            <div className="card-body">
                                <h5 className="card-title text-uppercase text-black-50">{this.state.details.name}</h5>
                                <h6 className="card-title border-top border-success border-bottom">
                                    {this.state.details.rollNo}
                                </h6>
                                <div className="mark">
                                    <table className="table table-bordered table-sm table-striped table-hover">
                                        <thead>
                                            <tr>
                                                {Object.keys(this.state.details.marks).map((mark, i) => {
                                                    return <th key={'head_' + i}>{mark}</th>
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {Object.keys(this.state.details.marks).map((mark, i) => {
                                                    return <td key={'col_' + i}>{this.state.details.marks[mark]} </td>
                                                })}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <BarChart
                            width={500}
                            height={230}
                            data={this.state.data}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="mark" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dashboardReducer: state.dashboardReducer
    }
};
export default connect(mapStateToProps, null)(Details);
