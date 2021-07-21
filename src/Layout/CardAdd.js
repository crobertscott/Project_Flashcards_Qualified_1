import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index.js";
import Error from "./Error";

function CardAdd({ deck, setDeck, error, setError, setCards }) {
  const history = useHistory();
  const { deckId } = useParams();
  console.log("deckId = ", deckId);
  console.log("number of deck = ", deckId);

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
  async function handleSave() {
    const front = document.getElementById("cardFront").value;
    const back = document.getElementById("cardBack").value;
    const card = {
      front: front,
      back: back,
      deckId: Number(deckId),
    };
    const respNewCard = await createCard(deckId, card);
    setCards(respNewCard);
    history.push(`/decks/${deckId}`);
  }
  if (deck && Object.keys(deck).length > 0) {
    return (
      <main>
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
        <section key="addCard">
          <h2 className="card-title">
            {deck.name}: <span>Add Card</span>
          </h2>
          <form key={deck.id} className="form-group" onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="cardFront">Front</label>
              <textarea
                className="form-control"
                id="cardFront"
                rows="3"
                placeholder={"Front side of card"}
              ></textarea>
              <label htmlFor="cardBack">Back</label>
              <textarea
                className="form-control"
                id="cardBack"
                rows="3"
                placeholder={"Back side of card"}
              ></textarea>
            </div>

            <button
              className="btn btn-secondary"
              type="button"
              value="Reset"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              Done
            </button>
            <button className="btn btn-primary" type="submit" value="Submit">
              Save
            </button>
          </form>
        </section>
      </main>
    );
  } else {
    return null;
  }
}
export default CardAdd;