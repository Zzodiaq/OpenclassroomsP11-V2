import '../../styles/card-home-style/card-home.css';

function CardHome ({src, head1, para}) {

    return (
        <div className='bod'>
            <div className='rond'>
                <img src={src} alt="error" />
            </div>
            <h1>{head1}</h1>
            <p>{para}</p>
        </div>
    ) 
}

export default CardHome