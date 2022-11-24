import React, { useState, useEffect } from "react";

export default function MemeGenerator() {
  const [topText, setTopText] = useState(""); // to set the top tect in the meme
  const [bottomText, setBottomText] = useState(""); // to set the bottom text in the meme
  const [meme, setMeme] = useState([]); // Array to store the meme data fetched from the api call
  const [randomMemeUrl, setRandomMemeUrl] = useState(""); // to store the Url of teh random meme generated

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((result) => {
        setMeme(result.data.memes);
        console.log(result);
        console.log("the meme array is:", meme);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomUrl = meme[Math.floor(Math.random() * meme.length)].url;
    setRandomMemeUrl(randomUrl);
  };

  return (
    <>
      <section className="memeContainer">
        <form onSubmit={handleSubmit} className="memeForm">
          <input
            placeholder="Enter the top text"
            className="topTextInput"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
          <input
            placeholder="Enter the Bottom text"
            className="bottomTextInput"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
          <button className="btn">Generate meme</button>
        </form>
        <div className="meme">
            {randomMemeUrl && <img className="memeImage" src={randomMemeUrl} alt="memeHere"/>}
            {randomMemeUrl && <h2 className="topText">{topText}</h2>}
            {randomMemeUrl && <h2 className="bottomText">{bottomText}</h2>}
        </div>
      </section>
    </>
  );
}
