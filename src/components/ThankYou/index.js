import './styles.css'

const ThankYou = ({ error }) => (
  <div className="ThankYou">
    {!error && (
      <>
        <h2>Youโre a good friend! Check your emails in about a minute.</h2>
        <p>A little birthday cheer will be waiting ๐</p>
      </>
    )}
    {error && (
      <>
        <h2>Something went wrong... ๐</h2>
        <p>Refresh your browser and try again.</p>
      </>
    )}
  </div>
)

export default ThankYou;
