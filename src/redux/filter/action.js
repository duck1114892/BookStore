export const filter = (data) => {
    return {
        type: 'FILTER',
        payload: data
    }
}
export const isFilter = (data) => {
    return {
        type: 'IS_FILTER',
        payload: data
    }
}
export const isRange = (data) => {

    return {
        type: 'RANGE',
        payload: data
    }
}
export const setDefault = () => {
    return {
        type: 'DEFAULT',
    }
}