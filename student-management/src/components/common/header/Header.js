import React, { Component } from 'react';
import { connect } from 'react-redux';

// Register Actions
import { filterAction } from '../../../redux/actions/DashboardAction';

class Header extends Component {
    state = {
       searchName: 'asc',
       searchMark: 'desc'
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

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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