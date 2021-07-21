import React, { useEffect } from "react";
import Error from "./Error";
import { useParams, Link, withRouter } from "react-router-dom";
import { readDeck, deleteCard, updateDeck } from "../utils/api/index.js";

// One deck

function DeckView({ decks, setDecks, deck, setDeck, handleDelete, error, setError, }) {
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    deckId &&
      readDeck(deckId, abortController.signal)
        .then((deck) => {
          return setDeck(deck);
        })
        .catch((error) => setError(error));

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <Error error={error} />;
  }

  console.log(deck.name);
  deck.cards ? console.log("Current deck: ", deck) : console.log("No deck found");
  const cards = deck.cards;
  console.log(cards);

  if (!cards) {
    return null;
  }

  // Delete a card
  
  async function handleDeleteCard(cardId) {
    if (
      window.confirm("Delete this card?")
    ) {
      console.log(cardId);
      await deleteCard(cardId);
    }
  }

  const cardsListElements = cards.map((card) => {
    let cardId = card.id;

    return (
      <div className="row" key={card.id}>
        <div className="col-md-4">
          <div className="card border-secondary mb-3 ml-2">
            <div className="card-body">
              <div className="card">
                <div className="card-block">
                  <p className="card-text">{card.front}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-secondary mb-3 ml-2">
            <div className="card-body">
              <div className="card">
                <div className="card-block">
                  <p className="card-text">{card.back}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <Link
            to={`/decks/${deckId}/cards/${cardId}/edit`}
            className="btn btn-secondary"
          >
            Edit
          </Link>
          
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteCard(cardId)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <section>
      <nav aria-label="breadcrumb">
        {" "}
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <p>{deck.name}</p>
          </li>
        </ol>
      </nav>
      
      <div key={deckId} className="card">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>
          
          <Link
            to={`/decks/${deck.id}/edit`}
            className="btn btn-secondary mr-2"
          >
            Edit
          </Link>
          
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
            Study
          </Link>
          
          <Link
            to={`/decks/${deck.id}/cards/new`}
            className="btn btn-primary mr-2"
          >
            Add Cards
          </Link>
          
          <button
            className="btn btn-danger"
            onClick={() => handleDelete({ deck })}
          >
            Delete
          </button>
        </div>
      </div>
      <h5 className="card-header">Cards</h5>
      <div>{cardsListElements}</div>
    </section>
  );
}
export default withRouter(DeckView);