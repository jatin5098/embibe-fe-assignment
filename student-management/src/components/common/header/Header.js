import React, { Component } from 'react';
import { connect } from 'react-redux';

// Register Actions
import { filterAction } from '../../../redux/actions/DashboardAction';

class Header extends Component {

    onSearch = () => {
        const searchParam = this.refs.search.value;
        const filterList = this.props.dashboardReducer.studentList.filter(list => list.name.toLowerCase().includes(searchParam));
        this.props.filterList(filterList);
    }
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0">
                            <input
                                className="form-control mr-sm-2"
                                type="search" placeholder="Search"
                                aria-label="Search"
                                ref="search"
                                onKeyUp={() => this.onSearch()} />
                        </form>
                    </div>
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);