import React from 'react'

interface paginationProps {
    setCurrentPage: (newPage: number) => void,
    currentPage: number,
    totalItems: number,
    itemsPerPage: number,
    close: () => void
}

const paginate = ({totalItems, currentPage, setCurrentPage, itemsPerPage, close}: paginationProps) => {
    
    const totalPages = Math.ceil(totalItems / itemsPerPage); 

    if (totalPages <= 1)
        return(
            <div className="pagination">
                <div>
                    <p className="allResults">Všechny položky zobrazeny ({totalItems})</p>
                </div>
            </div>
        );
    
    const Buttons = () => {
        let ret: ('...' | number)[] = [];
       
        if (totalPages < 7)
        {
            for (let i = 1; (i < 7 && i <= totalPages) ; i++) 
                ret.push(i);    
        }
        switch (currentPage) {
            case 1:
            case 2:
            case 3:
            case 4:
                ret = [1,2,3,4,5, '...', totalPages];
                break;
            case totalPages:
            case totalPages - 1:
            case totalPages - 2:
            case totalPages - 3:
                ret = [ 1 ,'...' ,totalPages - 4,totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                break; 
            default:
                ret = [currentPage - 1, currentPage, currentPage +1];
                if (currentPage > 2)
                    ret = [1 ,"..." , ...ret];
                if ((totalPages - currentPage) > 2)
                    ret = [...ret, "...", totalPages];
                break;
        }

        const buttonsToDisplay = ret.map(item => {
            const handleClick = () => {
                if (item !== '...')
                    setCurrentPage(Number(item));
            }
            
            return item !== '...' ? (
                <button 
                    className={item === currentPage ? 'active num' : 'num'}
                    onClick={handleClick}
                    key={item}
                >
                {item}
                </button>
            ):(
                <button className="dots" key={Math.random()} disabled>...</button>
            )
        });

        return(
            <>
                {buttonsToDisplay}
            </>
        )
    }

    return(
        <div className="pagination">
            <div>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1 ? true : false} className="arrow left">&lsaquo;</button>
                <Buttons />
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages  ? true : false} className="arrow right">&rsaquo;</button>
                <button onClick={close}>Close</button>
            </div>
        </div>
    )
  
}


export default paginate;