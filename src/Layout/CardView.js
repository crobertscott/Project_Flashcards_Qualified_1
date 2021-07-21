import React from "react";
import { useParams } from "react-router-dom";
import { listCards } from "../utils/api/index.js";

async function CardView() {
  const deckId = useParams();
  console.log("getCards");
  const cardslist = await listCards(deckId);
  console.log(cardslist);

  const cards = cardslist.map((card) => {
    return (
      <section id="cards">
        <h5 className="card-header">Cards</h5>
        <div className="card-group">
          <div key="card.id">
            <div className="card-body">
              <p className="card-text" key={card.id}>
                {card.front}
              </p>
            </div>
          </div>
          <div className="card-body">
            <p className="card-text" key={card.id}>
              {card.back}
            </p>
          </div>
        </div>
      </section>
    );
  });
  
  return cards;
}
export default CardView;