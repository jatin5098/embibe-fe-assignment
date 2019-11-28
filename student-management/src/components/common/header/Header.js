import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, browserHistory  } from 'react-router-dom';

// Register Actions
import { filterAction } from '../../../redux/actions/DashboardAction';

class Header extends Component {
    state = {
       searchName: 'asc',
       searchMark: 'desc',
       auth: {}
    }

    componentWillMount() {
        const auth = JSON.parse(localStorage.getItem('auth'));
        this.setState({auth});
    }

    onSearch = () => {
        const searchParam = this.refs.search.value;
        const filterList = this.props.dashboardReducer.studentList.filter(list => list.name.toLowerCase().includes(searchParam));
        this.props.filterList(filterList);
    }

    sortByName = () => {
        const sortedList = this.props.dashboardReducer.studentList.sort((a, b) => {
            if(a.name.toLowerCase() < b.name.toLowerCase())
                return this.state.searchName === 'asc' ? -1 : 1;
            if(a.name.toLowerCase() > b.name.toLowerCase())
            return this.state.searchName === 'asc' ? 1 : -1;
            if(a.name.toLowerCase() === b.name.toLowerCase())
                return 0;
        });
        const searchName = this.state.searchName === 'asc' ? 'desc' : 'asc';
        this.setState({searchName});
        this.props.sortByName(sortedList);
    }

    sortByMark = () => {
        const sortedList = this.props.dashboardReducer.studentList.sort((a, b) => {
            let totalOne = 0,
                totalSecond = 0;
            for(let mark in a.marks) {
                totalOne += a.marks[mark]
            }
            for(let mark in b.marks) {
                totalSecond += b.marks[mark]
            }
            const searchMark = this.state.searchMark === 'asc' ? 'desc' : 'asc';
            this.setState({searchMark});
            return this.state.searchMark === 'asc' ? totalOne - totalSecond : totalSecond - totalOne;
        });
        this.props.sortByMark(sortedList);
    }

    onLogout = () => {
        localStorage.removeItem('auth');
        this.setState({auth: null});
    }

    render() {
        if(this.state.auth == null)
            return <Redirect to='/login' />
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <div><h3 className="h3 text-black-50">Dashboard</h3></div>
                    <div className="collapse navbar-collapse flex-row-reverse mx-5" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0">
                            <input
                                className="form-control mr-sm-2"
                                type="search" placeholder="Search"
                                aria-label="Search"
                                ref="search"
                                onKeyUp={() => this.onSearch()} />
                        </form>
                    </div>
                    <button
                        className="btn btn-outline-success my-2 mr-sm-2"
                        type="button"
                        onClick={() => this.sortByName()}>Sort by name</button>
                    <button
                        className="btn btn-outline-success my-2 mr-sm-2"
                        type="button"
                        onClick={() => this.sortByMark()}>Sort by mark</button>
                        <span className="pull-right dropdown dropdown-container ml-4">
                            <img
                                className="img-thumbnail rounded-circle"
                                src={this.state.auth.user.photoURL} height="40" width="40" />
                            <div className="dropdown-menu">
                                <h6 className="dropdown-header">Welcome, <strong>{this.state.auth.user.displayName}</strong></h6> 
                                <h6 className="dropdown-header"><strong>{this.state.auth.user.email}</strong></h6>
                                <div className="dropdown-divider"></div>
                                <button
                                    className="dropdown-item text-center btn btn-danger"
                                    type="button"
                                    onClick={() => this.onLogout()}>Logout</button>
                            </div>
                        </span>
                </nav>
            </header>
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
        filterList: (filterList) => {
            dispatch(filterAction(filterList));
        },
        sortByName: (sortedList) => {
            dispatch({type: 'SORT_BY_NAME', payload: {sortedList}})
        },
        sortByMark: (sortedList) => {
            dispatch({type: 'SORT_BY_MARK', payload: {sortedList}})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);