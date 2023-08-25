import './Pagination.css'
 
const Pagination = ({ currentPage, pokemonsPerPage, setCurrentPage, pokemonsTotal }) => {
    
    const pageNumber = []
    for(let i = 1; i <= Math.ceil(pokemonsTotal / pokemonsPerPage); i++){
        pageNumber.push(i)
    }

    const onPreviousPage = () => {
        setCurrentPage( currentPage - 1)
    }

    const onNextPage = () => {
        setCurrentPage( currentPage + 1)
    }

    const onSpecificPage = (num) => {
        setCurrentPage(num)
    }

    return (
        <nav className='Pagination'>
            <button className='ButtonPrevious' disabled={currentPage === 1} onClick={onPreviousPage}>Previous</button>
          <ul>
            {pageNumber.map(page => (
                <li key={page.id}> 
                    <button className={`pagination-link ${page === currentPage ? 'is-current' : ''}`}
                    onClick={() => onSpecificPage(page)}>{page}</button>
                </li>
            ))}
          </ul>
            <button className='ButtonNext' disabled={currentPage >= pageNumber.length} onClick={onNextPage}>Next</button>
        </nav>
    );

}
 
export default Pagination;