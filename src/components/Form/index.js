import './styles.css'

const Form = ({ formData, setFormData }) => {
  function handleChange(evt) {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value
    });
  }

  return (
    <div className="Form">
      <h2>Card Details</h2>
      <form>
        <div>
          <label htmlFor="toName">To</label>
          <input
            type="text"
            id="to-name"
            name="toName"
            placeholder={formData.toName === '' && 'Name Surname'}
            value={formData.toName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="toEmail">Email</label>
          <input
            type="email"
            id="to-email"
            name="toEmail"
            placeholder={formData.toEmail === '' && 'name.surname@gmail.com'}
            value={formData.toEmail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ccName">From</label>
          <input
            type="text"
            id="cc-name"
            name="ccName"
            placeholder={formData.ccName === '' && 'Your Bestest Friend'}
            value={formData.ccName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ccEmail">Your Email</label>
          <input
            type="email"
            id="cc-email"
            name="ccEmail"
            placeholder={formData.ccEmail === '' && 'name.surname@gmail.com'}
            value={formData.ccEmail}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  )
}

export default Form;
