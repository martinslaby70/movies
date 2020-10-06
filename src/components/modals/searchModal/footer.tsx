import React from 'react'
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

interface props {
    page: number,
    setPage: (newPage: number) => void,
    totalResults: number,
    close: () => void
}
const Footer = ({page,setPage,totalResults, close}: props) => {

    const pages = Math.ceil(totalResults / 10);
    
    const activeNums = paginate({currentPage:page, totalItems:pages}).map(number => {
        return(
            <Button onClick={() => setPage(number)} variant='secondary' className={number === page ? 'num active' : 'num'} >{number}</Button>
        );
    });
    
    return(
        <div className='pages'>
            <Button className="tool" onClick={() => setPage(1)}>First</Button>
            <Button className={'tool arrow ' + (page === 1 ? 'disabled' : '')} onClick={() => page !== 1 ? setPage(page - 1) : {}}><FontAwesomeIcon icon={faAngleLeft} /></Button>
                {activeNums}
            <Button className={'tool arrow ' + (page === pages ? 'disabled' : '')} onClick={() => page !== pages ? setPage(page + 1) : {}}><FontAwesomeIcon icon={faAngleRight} /></Button>
            <Button className="tool" onClick={() => setPage(pages)}>Last</Button>
            <Button onClick={close}>close</Button>
        </div>
    )
}


interface paginationProps {
    currentPage: number,
    totalItems: number
}
const paginate = ({totalItems, currentPage}: paginationProps) :number[] => {
    let ret: number[] = [];
    switch (currentPage)   
    {
        //first 3
        case 1:
        case 2:
        case 3: {
            ret = [1,2,3,4,5,6,7];
            break;
        }
        //last 3
        case totalItems:
        case totalItems -1:
        case totalItems -2: {
            ret = [totalItems - 6,totalItems - 5,totalItems - 4,totalItems - 3,totalItems - 2,totalItems - 1,totalItems]
            break;
        }
        default: {
            ret = [currentPage - 3, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, currentPage + 3,];
            break;
        }
    }

    return ret;
}



export default Footer;