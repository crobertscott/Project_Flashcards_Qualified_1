import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Deck from "./Deck";
import DeckView from "./DeckView";
import NotFound from "./NotFound";
import { deleteDeck, listDecks } from "../utils/api/index.js";
import DeckEdit from "./DeckEdit";
import DeckCreate from "./DeckCreate";
import Study from "./Study";
import CardAdd from "./CardAdd";
import CardEdit from "./CardEdit";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [error, setError] = useState(null);
  const history = useHistory();

  // All decks

  useEffect(() => {
    const abortController = new AbortController();
    
    listDecks(abortController.signal)
      .then((_decks) => {
        return setDecks(_decks);
      })
      .catch((error) => {
        setError(error);
      });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    console.log("When a deck is updated, this should change", decks);
  }, [decks]);

  async function handleDelete({ deck }) {
    const toRemove = deck.id;
    console.log(toRemove);
    
    if (window.confirm("Delete deck?")) {
      await deleteDeck(toRemove);
      history.push("/");
    }
  }

  return (
    <section>
      <Header />
      <div className="container">
        
        <Switch>
          <Route exact path="/">
            <Deck decks={decks} handleDelete={handleDelete} />
          </Route>
          
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          
          <Route path="/decks/:deckId/edit">
            <DeckEdit
              deck={deck}
              setDeck={setDeck}
              error={error}
              setError={setError}
            />
          </Route>
          
          <Route path="/decks/:deckId/study">
            <Study
              decks={decks}
              setDecks={setDecks}
              deck={deck}
              setDeck={setDeck}
              cards={cards}
              setCards={setCards}
              error={error}
              setError={setError}
            />
          </Route>
          
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit
              deck={deck}
              setDeck={setDeck}
              card={card}
              setCard={setCard}
              error={error}
              setError={setError}
            />
          </Route>
          
          <Route path="/decks/:deckId/cards/new">
            <CardAdd
              deck={deck}
              setDeck={setDeck}
              cards={cards}
              setCards={setCards}
              card={card}
              setCard={setCard}
            />
          </Route>

          <Route path="/decks/:deckId">
            <DeckView
              decks={decks}
              deck={deck}
              setDeck={setDeck}
              handleDelete={handleDelete}
              error={error}
              setError={setError}
            />
          </Route>
          
          <Route path="/decks">
          </Route>
          
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </section>
  );
}

export default Layout;