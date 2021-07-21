import React from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";

function DeckCreate() {
  const history = useHistory();

  async function handleNewDeck(e) {
    console.log("handle new deck");
    const newDeck = {
      name: "",
      description: "",
      cards: [],
    };
    
    newDeck.name = document.getElementById("deckName").value;
    newDeck.description = document.getElementById("deckDescr").value;
    console.log(newDeck);
    
    let respNewDeck = await createDeck(newDeck);
    console.log("New deck: ", respNewDeck);
    history.push(`/decks/${respNewDeck.id}`);
  }

  function handleReset() {
    history.push("/");
  }

  return (
    <main>
      <nav aria-label="breadcrumb">
        {" "}
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <p>Create Deck</p>
          </li>
        </ol>
      </nav>

      <section key="new-deck">
        <h2 className="card-title">Create Deck</h2>
        <form key={"newDeck"} className="form-group">
          <div className="form-group">
            
            <label htmlFor="deckName">Name</label>
            <input
              className="form-control"
              id="deckName"
              rows="1"
              placeholder={"Deck Name"}
            />
            
            <label htmlFor="deckDescr">Description</label>
            <textarea
              className="form-control"
              id="deckDescr"
              rows="3"
              placeholder={"Brief description of the deck"}
            ></textarea>
          </div>

          <button
            className="btn btn-secondary"
            type="reset"
            value="Reset"
            onClick={() => handleReset()}
          >
            Cancel
          </button>
          
          <button
            className="btn btn-primary"
            type="button"
            value="Submit"
            onClick={(e) => handleNewDeck()}
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
export default DeckCreate;