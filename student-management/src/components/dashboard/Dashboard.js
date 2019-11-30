import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStudentDetails } from '../../services/StudentService';
import Header from '../common/header/Header';
import { Spinner } from '../common/loader/Loader';
import ReactInfiniteLoading from 'react-infinite-loading';
import PropTypes from 'prop-types';

// Register Actions
import { studentListAction } from '../../redux/actions/DashboardAction';

class Dashboard extends Component {
    state = {
        list: [],
        loading: false
    }

    componentDidMount() {
        this.refs.infanite.element.classList = [];
        getStudentDetails().then(res => {
            const list = [];
            for (let data in res.data) {
                list.push(res.data[data]);
            }
            // Update store with list
            this.props.studentList(list);
            this.setState({ list });
        });
    }

    handleLoading = () => {
        this.setState({ loading: true });
        let list = this.props.dashboardReducer.studentList;
        list = list.concat(this.state.list);
        this.props.studentList(list);        
        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
    }

    render() {

        return (
            <React.Fragment>
                <Header />
                <ReactInfiniteLoading
                    ref="infanite"
                    handleLoading={() => this.handleLoading()}
                    loading={this.state.loading}>
                    {
                        this.props.dashboardReducer.studentList.length ?
                            <div className="row">
                                {
                                    this.props.dashboardReducer.filterStudentList.length === 0 ?
                                        <section className="center"><h2 className="text-danger">No result found!</h2></section>
                                        :
                                        this.props.dashboardReducer.filterStudentList.map((e, i) => {
                                            let total = 0;
                                            return (
                                                <div
                                                    key={'card_' + i}
                                                    className="col-sm-6 col-md-4 m-y-10">
                                                    <div className="card text-center box-shadow">
                                                        <div className="card-body">
                                                            <h5 className="card-title text-uppercase text-black-50">{e.name}</h5>
                                                            <h6 className="card-title border-top border-success border-bottom">
                                                                <Link to={'/' + e.rollNo}>{e.rollNo}</Link>
                                                            </h6>
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
                                            )
                                        })
                                }
                            </div>
                            : <Spinner />
                    }
                </ReactInfiniteLoading>
            </React.Fragment>
        );
    }
}

ReactInfiniteLoading.propTypes = {
    // control the current status. loading = true the animation is displayed and no longer triggers handleLoading event
    loading: PropTypes.bool,
    // whether to display the loading animation
    isLoading: PropTypes.bool,
    // load animation components
    asLoading: PropTypes.node,
    // if true, scroll range as a current component on the contrary scroll range as a window
    elementScroll: PropTypes.bool,
    // set the height of the scroll container, scrollHeight={300} or scrollHeight="calc(100% - 100px)"
    scrollHeight: PropTypes.any.isRequired,
    // trigger handleLoading event threshold
    scrollThreshold: PropTypes.any,
    // scroll to the bottom event
    handleLoading: PropTypes.func,
    // sisplayed content
    children: PropTypes.node
};

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