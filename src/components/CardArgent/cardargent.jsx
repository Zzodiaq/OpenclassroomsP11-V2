import '../../styles/card-argent-style/card-argent-style.css';

function CardArgent ({id ,title, money, subtitle}) {

    return (
        <div className='cardArgentBody'>
            <div className='cardArgentLeft'>
                <p className='account-title'>{title}</p>
                <p className='account-amount'>${money}</p>
                <p className='account-amount-description'>{subtitle}</p>
            </div>
            <div className='cardArgentRight'>
                <button className='transaction-button'>View transactions</button>
            </div>
        </div>
    ) 
}

export default CardArgent