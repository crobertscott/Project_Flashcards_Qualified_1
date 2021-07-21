import React, { useEffect } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index.js";
import Error from "./Error";

function DeckEdit({ deck, setDeck, error, setError }) {
  const history = useHistory();
  console.log("edit deck screen", deck);

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

  async function handleEditDeck(e) {
    const name = document.getElementById("deckName").value;
    const description = document.getElementById("deckDescr").value;
    const editedDeck = {
      id: deck.id,
      name: name,
      description: description,
      cards: deck.cards,
    };
    
    setDeck(editedDeck);
    let respEditedDeck = await updateDeck(editedDeck);
    console.log("this is the updated Deck!", respEditedDeck);
    history.push("/");
  }

  if (deck) {
    return (
      <main>
        <nav aria-label="breadcrumb">
          {" "}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deck.id}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item">
              <p>Edit Deck</p>
            </li>
          </ol>
        </nav>
        
        <section key="deck">
          <h1 className="card-title">Edit Deck</h1>
          
          <form key={deck.id} className="form-group">
            <div className="form-group">
              
              <label htmlFor="deckName">Name</label>
              <input
                className="form-control"
                id="deckName"
                rows="1"
                placeholder={`${deck.name}`}
                value={deck.name}
              />
              
              <label htmlFor="deckDescr">Description</label>
              <textarea
                className="form-control"
                id="deckDescr"
                rows="3"
                placeholder={`${deck.description}`}
                value={deck.description}
              ></textarea>
            </div>

            <button
              className="btn btn-secondary"
              type="reset"
              value="Reset"
              onClick={() => history.push("/")}
            >
              Cancel
            </button>
            
            <button
              className="btn btn-primary"
              type="button"
              value="Submit"
              onClick={(e) => {
                e.preventDefault();
                handleEditDeck();
              }}
            >
              Submit
            </button>
          </form>
        </section>
      </main>
    );
  } else {
    return null;
  }
}
export default withRouter(DeckEdit);