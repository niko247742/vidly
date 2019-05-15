import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';


const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    //console.log(currentPage);
        return (
            <nav className = 'container'>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link">Previous</a></li>

                    {pages.map( (page) => 
                        <li 
                            key = { page } 
                            className= {page === currentPage ? 'page-item active' : 'page-item'}>
                            
                            <a onClick = {() => onPageChange(page)} className="page-link" style = {{cursor: 'pointer'}}>{ page }</a>
                        </li>)}
                    
                    <li className="page-item"><a className="page-link">Next</a></li>
                </ul>
            </nav>
        )
}
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}
export default Pagination;