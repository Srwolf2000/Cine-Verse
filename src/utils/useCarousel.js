export function next(index, itemsPerPage, movies) {

    if (index + itemsPerPage <= movies.length) {
        return movies.slice(index, index + itemsPerPage);
    } else {
        const endSlice = (index + itemsPerPage) % movies.length;
        return [...movies.slice(index), ...movies.slice(0, endSlice)];
    }

}

export function back(index, itemsPerPage, movies) {
    let newStart = index - itemsPerPage;
    return movies.slice(newStart, newStart + itemsPerPage);

}