export const filterAction = (filterList) => {
    return {
        type: 'FILTER_LIST',
        payload: {
            filterList: filterList
        }
    }
}

export const studentListAction = (list) => {
    return {
        type: "STUDENT_LIST",
        payload: { list: list }
    }
}