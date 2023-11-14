import '../../styles/home-style/home.css'
import data from '../../data.json'
import CardHome from '../../components/CardHome/cardhome'
import chat from '../../images/icon-chat.webp'
import money from '../../images/icon-money.webp'
import security from '../../images/icon-security.webp'
function App() {

  return (
    <div className="App">
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <div className='cardHomeContainer'>
      <CardHome src={chat} head1={data[0].h1} para={data[0].p} />
      <CardHome src={money} head1={data[1].h1} para={data[1].p} />
      <CardHome src={security} head1={data[2].h1} para={data[2].p} />
        {/* {data.map((e) => {
          <CardHome src={e.src} head1={e.h1} para={e.p} />
        })} */}
      </div>
    </div>
  );
}
export default App;