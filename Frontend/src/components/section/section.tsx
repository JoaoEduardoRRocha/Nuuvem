import './section.scss';

function Section() {
  return (
    <section className="section-container">
      <h1 className="section-container__title">Todos os Jogos</h1>
      <div className="section-container__game-grid">
        <div className="section-container__game-card-container">
          <img
            className="section-container__game-card-container__img"
            src="https://media.istockphoto.com/id/2149366762/pt/foto/contemplative-graceful-profile-with-quiet-confidence.jpg?s=2048x2048&w=is&k=20&c=nFwPp3GLmB1s2OAv62TXNgZXurHgNj3nfVder3m9RRQ="
            alt=""
          />
          <p className="section-container__game-name">Nome</p>
          <p className="section-container__game-price">R$ 49,99</p>
          <p className="section-container__game-description">
            Descrição teste para ver o tamanho que fica dentro card
          </p>
          <div className="section-container__btn-card">
            <button>Comprar</button>
            <button>Carrinho</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section;
