import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import 'minireset.css'
import './App.css';

import Form from './components/Form';
import Grid from './components/Grid';
import ThankYou from './components/ThankYou';
import { cards } from './assets/cards'

function App() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [formData, setFormData] = useState({
    toEmail: '',
    toName: '',
    ccEmail: '',
    ccName: '',
  });
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [cardSelection, setCardSelection] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsDisabled(Object.keys(formData).some(key => !formData[key]))
  }, [formData]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0
      };
    }
  };

  function generateVideo(e) {
    e.preventDefault();

    setIsLoading(true)

    const url = process.env.REACT_APP_MAKE_URL;

    const headers = {
      'Content-Type': 'application/json',
      'X-MAKE-API-KEY': process.env.REACT_APP_MAKE_KEY,
    }

    const selectedCard = cards.find(card => {
      return card.theme === cardSelection
    })

    const data = {
      customSize: {
        width: 1080,
        height: 1080,
        unit: 'px',
      },
      'format': 'webm',
      'data': {
        ...formData,
        lines: selectedCard.lines,
        theme: selectedCard.theme,
      },
      "lengthInSeconds": selectedCard.length,
      "webhookUrl": "https://hooks.zapier.com/hooks/catch/3131725/oj71265/",
    }

    axios.post(url, data, {
      headers: headers
    })
      .then((response) => {
        setIsLoading(false)
        paginate(1)
      }, (error) => {
        setIsLoading(false)
        paginate(1)
        setError(error)
      });
  }

  return (
    <div className="App">
      <h1>Backhanded<br />Birthday Cards</h1>
      <div className="container">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="inner"
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <div style={{
              opacity: page === 0 ? '1' : '0',
              transform: page === 0 ? 'translateX(0px)' : 'translateX(-1000px)'
            }}>
              <Form
                formData={formData}
                setFormData={setFormData}
              />
              <button disabled={isDisabled} onClick={() => paginate(1)}>Next ➡️</button>
            </div>
            <div style={{
              opacity: page === 1 ? '1' : '0',
              transform: page === 1 ? 'translateX(0px)' : 'translateX(-1000px)'
            }}>
              <Grid cards={cards} cardSelection={cardSelection} setCardSelection={setCardSelection} />
              <button onClick={() => paginate(-1)}>⬅️ Back</button>
              <button className="primary" onClick={generateVideo}>
                {isLoading ? 'Sending 🔄' : 'Send 🎁'}

              </button>
            </div>
            <div style={{
              opacity: page === 2 ? '1' : '0',
              transform: page === 2 ? 'translateX(0px)' : 'translateX(-1000px)'
            }}>
              <ThankYou error={error} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
