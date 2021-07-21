import React from "react";
import { Link } from "react-router-dom";

function Deck({ decks, handleDelete }) {
  function renderDecks() {
    if (decks.length > 0) {
      const allDecks = decks.map((deck) => {
        return (
          <div key={deck.id} className="card">
            <div className="card-body" key={deck.id}>
              <h5 className="card-title">{deck.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {deck.cards.length} cards
              </h6>
              
              <p className="card-text">{deck.description}</p>
              
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                View
              </Link>
              
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                Study
              </Link>
              
              <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
                Edit
              </Link>
              
              <button
                className="btn btn-danger"
                onClick={() => handleDelete({ deck })}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });

      return allDecks;
    } else {
      return null;
    }
  }

  return (
    <section className="row">
      <Link to="/decks/new" className="btn btn-secondary">
        Create Deck
      </Link>
      {renderDecks()}
    </section>
  );
}
export default Deck;