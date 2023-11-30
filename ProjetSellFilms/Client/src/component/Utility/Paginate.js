import React from "react";
import ReactPaginate from "react-paginate";



const Paginate = ({onPageChange}) => {
    const handlePageClick = (selectedPage) => {
        // Notify the parent component about the selected page
        onPageChange(selectedPage.selected + 1);
    };
    return (

        <ReactPaginate
            breakLabel="..."
            nextLabel={"Next →"}
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            pageCount={10}
            previousLabel={"← Previous"}
            containerClassName={"pagination justify-content-center p-3"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item bg-info"}
            previousLinkClassName={"page-link bg-dark text-light "}
            nextLinkClassName={"page-link bg-dark text-light"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            nextLink='/hello'
        />
    );
};

export default Paginate;